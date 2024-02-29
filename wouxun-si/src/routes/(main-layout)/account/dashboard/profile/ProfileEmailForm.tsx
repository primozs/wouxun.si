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
import { TextInput } from '~/ui/input/TextInput';
import { AddressInfo } from './AddressInfo';

type ProfileEmailFormData = v.Input<typeof ProfileEmailSchema>;

const ProfileEmailSchema = v.object({
  email: v.string([
    v.minLength(5, $localize`Enter email`),
    v.email($localize`Email not valid`),
  ]),
});

type ResponseType = any;

export const useFormAction = formAction$<ProfileEmailFormData, ResponseType>(
  async (data, event) => {
    const client = getMedusaClient();

    const existRes = await client.auth.exists(data.email);
    if (existRes.exists) {
      throw new FormError<ProfileEmailFormData>({
        email: $localize`User with this email already exists.`,
      });
    }

    try {
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
      throw new FormError<ProfileEmailFormData>(
        $localize`Submit was not successfull`,
      );
    }
  },
  valiForm$(ProfileEmailSchema),
);

export type ProfileEmailFormProps = {
  customer:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Customer, 'password_hash'>>>;
};

const setInitialSignal = (
  customer: Omit<Customer, 'password_hash'> | null,
): InitialValues<ProfileEmailFormData> => {
  const empty = {
    email: '',
  };
  if (!customer) return empty;
  return {
    email: customer.email,
  };
};
export const ProfileEmailForm = component$<ProfileEmailFormProps>((props) => {
  const initialData = useSignal<InitialValues<ProfileEmailFormData>>(
    setInitialSignal(props.customer.value),
  );

  const [form, { Form, Field }] = useForm<ProfileEmailFormData>({
    loader: initialData,
    validate: valiForm$(ProfileEmailSchema),
    action: useFormAction(),
  });

  return (
    <>
      <AddressInfo>
        <UiNote
          q:slot="info"
          class="uppercase text-sm"
        >{$localize`Email`}</UiNote>
        <UiTitle q:slot="info" class="text-sm">
          {props.customer.value?.email}
        </UiTitle>

        <div q:slot="content">
          <Form id="profile-email-form" class="space-y-2">
            <Field name="email">
              {(field, props) => (
                <TextInput
                  {...props}
                  type="email"
                  label={$localize`Email`}
                  placeholder={$localize`Enter email`}
                  auto-complete="email"
                  value={field.value}
                  error={field.error}
                  required
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
                form="profile-email-form"
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
