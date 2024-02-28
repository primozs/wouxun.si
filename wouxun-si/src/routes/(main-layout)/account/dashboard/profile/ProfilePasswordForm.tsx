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
import { TextInput } from '~/ui/input/TextInput';

type ProfilePasswordFormData = v.Input<typeof ProfilePasswordSchema>;

const ProfilePasswordSchema = v.object({
  email: v.string([
    v.minLength(5, $localize`Enter email`),
    v.email($localize`Email not valid`),
  ]),
  old_password: v.string([
    v.minLength(1, $localize`Enter password`),
    v.minLength(8, $localize`Password must have 8 characters or more`),
  ]),
  new_password: v.string([
    v.minLength(1, $localize`Enter password`),
    v.minLength(8, $localize`Password must have 8 characters or more`),
  ]),
  confirm_password: v.string([
    v.minLength(1, $localize`Enter password`),
    v.minLength(8, $localize`Password must have 8 characters or more`),
  ]),
});

type ResponseType = any;

export const useFormAction = formAction$<ProfilePasswordFormData, ResponseType>(
  async (data, event) => {
    const client = getMedusaClient();

    if (!data.email) {
      throw new FormError<ProfilePasswordFormData>($localize`No email`);
    }

    if (data.new_password !== data.confirm_password) {
      throw new FormError<ProfilePasswordFormData>({
        new_password: $localize`Passwords do not match`,
        confirm_password: $localize`Passwords do not match`,
      });
    }

    const isValid = await client.auth
      .authenticate(
        { email: data.email, password: data.old_password },
        getSrvSessionHeaders(event),
      )
      .then(({ customer }) => !!customer)
      .catch(() => false);

    if (!isValid) {
      throw new FormError<ProfilePasswordFormData>({
        old_password: $localize`Old password is incorrect`,
      });
    }
    try {
      const res = await client.customers.update(
        { password: data.new_password },
        getSrvSessionHeaders(event),
      );

      return {
        status: 'success',
        message: $localize`Submitted successfully`,
        data: res.customer,
      };
    } catch (error: any) {
      handleError(error);
      throw new FormError<ProfilePasswordFormData>(
        $localize`Submit was not successfull`,
      );
    }
  },
  valiForm$(ProfilePasswordSchema),
);

export type ProfilePasswordFormProps = {
  customer:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Customer, 'password_hash'>>>;
};

const setInitialSignal = (
  customer: Omit<Customer, 'password_hash'> | null,
): InitialValues<ProfilePasswordFormData> => {
  return {
    email: customer?.email ?? '',
    old_password: '',
    new_password: '',
    confirm_password: '',
  };
};
export const ProfilePasswordForm = component$<ProfilePasswordFormProps>(
  (props) => {
    const initialData = useSignal<InitialValues<ProfilePasswordFormData>>(
      setInitialSignal(props.customer.value),
    );

    const [form, { Form, Field }] = useForm<ProfilePasswordFormData>({
      loader: initialData,
      validate: valiForm$(ProfilePasswordSchema),
      action: useFormAction(),
    });

    return (
      <>
        <AddressInfo>
          <UiNote q:slot="info" class="uppercase">{$localize`Password`}</UiNote>
          <UiTitle q:slot="info">{$localize`Password is not shown`}</UiTitle>

          <div q:slot="content">
            <Form class="space-y-2">
              <Field name="email">
                {(field, props) => (
                  <input {...props} type="hidden" value={field.value} />
                )}
              </Field>

              <div class="grid grid-cols-2 gap-x-2">
                <Field name="old_password">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      type="password"
                      label={$localize`Old password`}
                      placeholder={$localize`Enter password`}
                      value={field.value}
                      error={field.error}
                      required
                    />
                  )}
                </Field>

                <Field name="new_password">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      type="password"
                      label={$localize`New password`}
                      placeholder={$localize`Enter password`}
                      value={field.value}
                      error={field.error}
                      required
                    />
                  )}
                </Field>

                <Field name="confirm_password">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      type="password"
                      label={$localize`Confirm password`}
                      placeholder={$localize`Enter password`}
                      value={field.value}
                      error={field.error}
                      required
                    />
                  )}
                </Field>
              </div>

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
  },
);
