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
import { useGetRegionLoader } from '~/routes/plugin@store';
import { TextInput } from '~/ui/input/TextInput';
import { Select } from '~/ui/input/Select';
import { UiText } from '~/ui/UiText';

type ProfileBillingFormData = v.Input<typeof ProfileBillingSchema>;

const ProfileBillingSchema = v.object({
  first_name: v.string([v.minLength(1, $localize`Enter name`)]),
  last_name: v.string([v.minLength(1, $localize`Enter surname`)]),
  company: v.string(),
  address_1: v.string([v.minLength(1, $localize`Enter address`)]),
  address_2: v.string(),
  postal_code: v.string([v.minLength(1, $localize`Enter postal code`)]),
  city: v.string([v.minLength(1, $localize`Enter city`)]),
  province: v.string(),
  country_code: v.string([v.minLength(1, $localize`Enter country`)]),
  phone: v.string(),
});

type ResponseType = any;

export const useFormAction = formAction$<ProfileBillingFormData, ResponseType>(
  async (data, event) => {
    try {
      const client = getMedusaClient();

      const res = await client.customers.update(
        {
          billing_address: {
            ...data,
          },
        },
        getSrvSessionHeaders(event),
      );

      return {
        status: 'success',
        message: $localize`Submitted successfully`,
        data: res.customer,
      };
    } catch (error: any) {
      handleError(error);
      throw new FormError<ProfileBillingFormData>(
        $localize`Submit was not successfull`,
      );
    }
  },
  valiForm$(ProfileBillingSchema),
);

export type ProfileBillingFormProps = {
  customer:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Customer, 'password_hash'>>>;
};

const setInitialSignal = (
  customer: Omit<Customer, 'password_hash'> | null,
): InitialValues<ProfileBillingFormData> => {
  const empty = {
    first_name: '',
    last_name: '',
    company: '',
    address_1: '',
    address_2: '',
    postal_code: '',
    city: '',
    province: '',
    country_code: '',
    phone: '',
  };
  if (!customer?.billing_address) return empty;

  return {
    first_name: customer.billing_address.first_name ?? '',
    last_name: customer.billing_address.last_name ?? '',
    company: customer.billing_address.company ?? '',
    address_1: customer.billing_address.address_1 ?? '',
    address_2: customer.billing_address.address_2 ?? '',
    postal_code: customer.billing_address.postal_code ?? '',
    city: customer.billing_address.city ?? '',
    province: customer.billing_address.province ?? '',
    country_code: customer.billing_address.country_code ?? '',
    phone: customer.billing_address.phone ?? '',
  };
};
export const ProfileBillingForm = component$<ProfileBillingFormProps>(
  (props) => {
    const region = useGetRegionLoader();
    const initialData = useSignal<InitialValues<ProfileBillingFormData>>(
      setInitialSignal(props.customer.value),
    );

    const [form, { Form, Field }] = useForm<ProfileBillingFormData>({
      loader: initialData,
      validate: valiForm$(ProfileBillingSchema),
      action: useFormAction(),
    });

    const country =
      region.value?.countries?.find(
        (country) =>
          country.iso_2 === props.customer.value?.billing_address.country_code,
      )?.name ||
      props.customer.value?.billing_address.country_code?.toUpperCase();
    return (
      <>
        <AddressInfo>
          <UiNote
            q:slot="info"
            class="uppercase text-sm"
          >{$localize`Billing address`}</UiNote>

          {!props.customer.value?.billing_address && (
            <UiTitle q:slot="info">{$localize`No billing address`}</UiTitle>
          )}

          {props.customer.value?.billing_address && (
            <div q:slot="info" class="flex flex-col mb-4 text-sm">
              <UiTitle>
                {props.customer.value.billing_address.first_name}{' '}
                {props.customer.value.billing_address.last_name}
              </UiTitle>
              <UiText>{props.customer.value.billing_address.company}</UiText>
              <UiText>
                {props.customer.value.billing_address.address_1}
                {props.customer.value.billing_address.address_2
                  ? `, ${props.customer.value.billing_address.address_2}`
                  : ''}
              </UiText>
              <UiText>
                {props.customer.value.billing_address.postal_code},{' '}
                {props.customer.value.billing_address.city}
              </UiText>
              <UiText>{country}</UiText>
            </div>
          )}

          <div q:slot="content" class="overflow-hidden">
            <Form class="space-y-2">
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

              <Field name="company">
                {(field, props) => (
                  <TextInput
                    {...props}
                    type="text"
                    label={$localize`Company`}
                    placeholder={$localize`Enter company`}
                    auto-complete="organization"
                    value={field.value}
                    error={field.error}
                  />
                )}
              </Field>

              <Field name="address_1">
                {(field, props) => (
                  <TextInput
                    {...props}
                    type="text"
                    label={$localize`Address`}
                    placeholder={$localize`Enter address`}
                    auto-complete="address-line1"
                    required
                    value={field.value}
                    error={field.error}
                  />
                )}
              </Field>

              <Field name="address_2">
                {(field, props) => (
                  <TextInput
                    {...props}
                    type="text"
                    label={$localize`Apartment, suite, etc.`}
                    placeholder={$localize`Enter apartment`}
                    auto-complete="address-line2"
                    value={field.value}
                    error={field.error}
                  />
                )}
              </Field>

              <div class="grid grid-cols-[144px_1fr] gap-x-2">
                <Field name="postal_code">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      type="text"
                      label={$localize`Postal code`}
                      placeholder={$localize`Enter postal code`}
                      auto-complete="postal-code"
                      required
                      value={field.value}
                      error={field.error}
                    />
                  )}
                </Field>
                <Field name="city">
                  {(field, props) => (
                    <TextInput
                      {...props}
                      type="text"
                      label={$localize`City`}
                      placeholder={$localize`Enter city`}
                      auto-complete="locality"
                      required
                      value={field.value}
                      error={field.error}
                    />
                  )}
                </Field>
              </div>

              <Field name="province">
                {(field, props) => (
                  <TextInput
                    {...props}
                    type="text"
                    label={$localize`Province / State`}
                    placeholder={$localize`Enter province or state`}
                    auto-complete="address-level1"
                    value={field.value}
                    error={field.error}
                  />
                )}
              </Field>

              <Field name="country_code">
                {(field, props) => (
                  <Select
                    {...props}
                    label={$localize`Country`}
                    placeholder={$localize`Enter country`}
                    auto-complete="country"
                    required
                    value={field.value}
                    error={field.error}
                    options={
                      region.value?.countries?.map((item) => {
                        return {
                          label: item.name,
                          value: item.iso_2,
                        };
                      }) ?? []
                    }
                  />
                )}
              </Field>

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
  },
);
