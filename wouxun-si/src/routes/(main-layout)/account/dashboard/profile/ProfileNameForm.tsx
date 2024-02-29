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

type ProfileNameFormData = v.Input<typeof ProfileNameSchema>;

const ProfileNameSchema = v.object({
  first_name: v.string([v.minLength(1, $localize`Enter name`)]),
  last_name: v.string([v.minLength(1, $localize`Enter surname`)]),
});

type ResponseType = any;

export const useFormAction = formAction$<ProfileNameFormData, ResponseType>(
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
      throw new FormError<ProfileNameFormData>(
        $localize`Submit was not successfull`,
      );
    }
  },
  valiForm$(ProfileNameSchema),
);

export type ProfileNameFormProps = {
  customer:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Customer, 'password_hash'>>>;
};

const setInitialSignal = (
  customer: Omit<Customer, 'password_hash'> | null,
): InitialValues<ProfileNameFormData> => {
  const empty = {
    first_name: '',
    last_name: '',
  };
  if (!customer) return empty;
  return {
    first_name: customer.first_name,
    last_name: customer.last_name,
  };
};
export const ProfileNameForm = component$<ProfileNameFormProps>((props) => {
  const initialData = useSignal<InitialValues<ProfileNameFormData>>(
    setInitialSignal(props.customer.value),
  );

  const [form, { Form, Field }] = useForm<ProfileNameFormData>({
    loader: initialData,
    validate: valiForm$(ProfileNameSchema),
    action: useFormAction(),
  });

  return (
    <>
      <AddressInfo>
        <UiNote
          q:slot="info"
          class="uppercase text-sm"
        >{$localize`Name`}</UiNote>
        <UiTitle q:slot="info" class="text-sm">
          {props.customer.value?.first_name} {props.customer.value?.last_name}
        </UiTitle>

        <div q:slot="content">
          <Form id="profile-name-form" class="space-y-2">
            <div class="grid grid-cols-2 gap-x-2">
              <Field name="first_name">
                {(field, props) => (
                  <TextInput
                    {...props}
                    type="text"
                    label={$localize`Name`}
                    placeholder={$localize`Enter name`}
                    auto-complete="given-name"
                    required
                    value={field.value}
                    error={field.error}
                  />
                )}
              </Field>

              <Field name="last_name">
                {(field, props) => (
                  <TextInput
                    {...props}
                    type="text"
                    label={$localize`Surname`}
                    placeholder={$localize`Enter surname`}
                    auto-complete="family-name"
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
                form="profile-name-form"
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
