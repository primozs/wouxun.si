import { component$ } from '@builder.io/qwik';
import * as v from 'valibot';
import {
  FormError,
  formAction$,
  useForm,
  valiForm$,
} from '@modular-forms/qwik';
import { getMedusaClient, getSrvSessionHeaders } from '../medusa';
import { handleError } from '../logger';
import { Response } from '~/ui/input/Response';
import { FormFooter } from '~/ui/input/FormFooter';

export type FormData = v.Input<typeof FormSchema>;

export const FormSchema = v.object({});

type ResponseType = any;

export const useFormAction = formAction$<FormData, ResponseType>(
  async (_, event) => {
    const client = getMedusaClient();
    const cartId = event.cookie.get('cartid');

    if (!cartId) {
      throw new FormError<FormData>($localize`No cartId cookie found`);
    }

    const cart = await client.carts
      .complete(cartId.value, getSrvSessionHeaders(event))
      .then((res) => res)
      .catch((error) => {
        handleError(error);
        throw new FormError<FormData>($localize`Submit was not successfull`);
      });

    if (cart?.type === 'order') {
      event.cookie.set('cartid', '', {
        maxAge: -1,
      });
      return event.redirect(302, `/checkout/order/confirmed/${cart?.data.id}`);
    }

    return {
      status: 'success',
      message: $localize`Submitted successfully`,
    };
  },
  valiForm$(FormSchema),
);
export interface PaymentStripeBtnProps {
  notReady: boolean;
}

export const PaymentStripeBtn = component$<PaymentStripeBtnProps>(
  ({ notReady }) => {
    const [form, { Form }] = useForm<FormData>({
      loader: { value: {} },
      validate: valiForm$(FormSchema),
      action: useFormAction(),
    });
    return (
      <Form>
        <div>
          <Response of={form} />
        </div>

        <FormFooter
          of={form}
          withoutCancel
          submitLabel={$localize`Place order`}
          disabled={notReady}
        />
      </Form>
    );
  },
);
