import {
  $,
  type Signal,
  component$,
  useComputed$,
  useSignal,
} from '@builder.io/qwik';
import type { Cart, PaymentSession } from '@medusajs/client-types';
import type { OnApproveActions, OnApproveData } from '@paypal/paypal-js';
import { InputHelper } from '~/ui/input/InputHelper';
import { PayPalButtons } from './PayPalButtons';
import { usePaypalProvider } from './PayPalProvider';
import { FormError, formAction$, valiForm$ } from '@modular-forms/qwik';
import * as v from 'valibot';
import { getMedusaClient, getSrvSessionHeaders } from '../../medusa';
import { handleError } from '../../logger';

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

export interface PaymentPaypalBtnProps {
  notReady: boolean;
  cart:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'>>>;
}

export const PaymentPaypalBtn = component$<PaymentPaypalBtnProps>(
  ({ notReady, cart }) => {
    const submitting = useSignal(false);
    const error = useSignal<string | null>(null);
    const action = useFormAction();
    usePaypalProvider(cart, error);

    const paymentSession = useComputed$(() => {
      const session = cart.value?.payment_session as PaymentSession;
      return session;
    });

    const handlePayment = $(
      async (_data: OnApproveData, actions: OnApproveActions) => {
        const authorization = await actions?.order?.authorize().catch(() => {
          error.value = $localize`An unknown error occurred, please try again.`;
          submitting.value = false;
        });

        if (!authorization || authorization.status !== 'COMPLETED') {
          error.value = $localize`An error occurred, status: ${authorization?.status}`;
          return;
        }

        const result = await action.submit({});
        if (result.value.response.status === 'error') {
          error.value = result.value.response.message ?? null;
        }
      },
    );

    return (
      <div>
        <PayPalButtons
          style={{ layout: 'horizontal' }}
          orderId={paymentSession.value.data.id}
          onApprove$={handlePayment}
          disabled={notReady || submitting.value}
        />

        <InputHelper error={!!error.value} intent="error">
          {error.value}
        </InputHelper>
      </div>
    );
  },
);
