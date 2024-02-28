import { type Signal, component$, useSignal } from '@builder.io/qwik';
import type { Customer } from '@medusajs/medusa';
import {
  FormError,
  type InitialValues,
  formAction$,
  useForm,
  valiForm$,
} from '@modular-forms/qwik';
import * as v from 'valibot';
import { handleError } from '~/modules/logger';
import { getMedusaClient, getSrvSessionHeaders } from '~/modules/medusa';
import { UiItem } from '~/ui/UiItem';
import { UiNote } from '~/ui/UiNote';
import { UiTitle } from '~/ui/UiTitle';
import { Button } from '~/ui/button';
import { Response } from '~/ui/input/Response';
import { AddressInfo } from './AddressInfo';
import { InputPhone } from '~/ui/input/InputPhone';
import { config } from '~/config';

type ProfilePhoneFormData = v.Input<typeof ProfilePhoneSchema>;

const ProfilePhoneSchema = v.object({
  phone: v.optional(v.string()),
});

type ResponseType = any;

export const useFormAction = formAction$<ProfilePhoneFormData, ResponseType>(
  async (data, event) => {
    try {
      const client = getMedusaClient();

      const res = await client.customers.update(
        data,
        getSrvSessionHeaders(event),
      );

      return {
        status: 'success',
        message: $localize`Submitted successfully`,
        data: res.customer,
      };
    } catch (error: any) {
      handleError(error);
      throw new FormError<ProfilePhoneFormData>(
        $localize`Submit was not successfull`,
      );
    }
  },
  valiForm$(ProfilePhoneSchema),
);

export type ProfilePhoneFormProps = {
  customer:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Customer, 'password_hash'>>>;
};

const setInitialSignal = (
  customer: Omit<Customer, 'password_hash'> | null,
): InitialValues<ProfilePhoneFormData> => {
  const empty = {
    phone: '',
  };
  if (!customer) return empty;
  return {
    phone: customer.phone,
  };
};
export const ProfilePhoneForm = component$<ProfilePhoneFormProps>((props) => {
  const initialData = useSignal<InitialValues<ProfilePhoneFormData>>(
    setInitialSignal(props.customer.value),
  );

  const [form, { Form, Field }] = useForm<ProfilePhoneFormData>({
    loader: initialData,
    validate: valiForm$(ProfilePhoneSchema),
    action: useFormAction(),
  });

  return (
    <>
      <AddressInfo>
        <UiNote q:slot="info" class="uppercase">{$localize`Phone`}</UiNote>
        <UiTitle q:slot="info">{props.customer.value?.phone}</UiTitle>

        <div q:slot="content">
          <Form class="space-y-2">
            <Field name="phone">
              {(field, props) => (
                <InputPhone
                  {...props}
                  of={form}
                  label={$localize`Phone`}
                  placeholder={$localize`Enter phone`}
                  auto-complete="phone"
                  value={field.value}
                  error={field.error}
                  country={config.DEFAULT_COUNTRY}
                />
              )}
            </Field>

            <div>
              <Response of={form} />
            </div>

            <UiItem lines="full" pad={false} class="pb-4">
              <Button
                q:slot="end"
                color="primary"
                type="submit"
                loading={form.submitting}
              >
                {$localize`Save changes`}
              </Button>
            </UiItem>
          </Form>
        </div>
      </AddressInfo>
    </>
  );
});
