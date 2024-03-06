import {
  type Signal,
  component$,
  useSignal,
  useComputed$,
} from '@builder.io/qwik';
import { getMedusaClient, getSrvSessionHeaders } from '../medusa';
import { handleError } from '../logger';
import {
  FormError,
  type InitialValues,
  formAction$,
  useForm,
  valiForm$,
  setValue,
  setValues,
} from '@modular-forms/qwik';
import { TextInput } from '~/ui/input/TextInput';
import { InputPhone } from '~/ui/input/InputPhone';
import { Select } from '~/ui/input/Select';
import { config } from '~/config';
import { useGetRegionLoader } from '~/routes/plugin@store';
import { Checkbox } from '~/ui/input/Checkbox';
import { Response } from '~/ui/input/Response';
import { FormFooter } from '~/ui/input/FormFooter';
import { UiTitle } from '~/ui/UiTitle';
import type { Cart, Customer } from '@medusajs/client-types';
import { UiText } from '~/ui/UiText';
import { AddressSelect } from './AddressSelect';
import * as v from 'valibot';
import type { StorePostCartsCartReq } from '@medusajs/medusa';
import { useLocation } from '@builder.io/qwik-city';

export type FormData = v.Input<typeof FormSchema>;

export const FormSchema = v.object({
  shipping_address: v.object({
    first_name: v.string([v.minLength(1, $localize`Enter name`)]),
    last_name: v.string([v.minLength(1, $localize`Enter surname`)]),
    company: v.string(),
    address_1: v.string([v.minLength(1, $localize`Enter address`)]),
    address_2: v.string(),
    postal_code: v.string([v.minLength(1, $localize`Enter postal code`)]),
    city: v.string([v.minLength(1, $localize`Enter city`)]),
    province: v.string(),
    country_code: v.string([v.minLength(1, $localize`Enter country`)]),
    email: v.string([
      v.minLength(5, $localize`Enter email`),
      v.email($localize`Email not valid`),
    ]),
    phone: v.string(),
    same_as_billing: v.boolean(),
  }),
  billing_address: v.optional(
    v.object({
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
    }),
  ),
});

type ResponseType = any;

export const useFormAction = formAction$<FormData, ResponseType>(
  async (data, event) => {
    const cartId = event.cookie.get('cartid');

    if (!cartId) {
      throw new FormError<FormData>($localize`No cartId cookie found`);
    }
    const {
      shipping_address: { email, same_as_billing, ...shippingAddress },
      billing_address,
    } = data;

    const updateData = {
      shipping_address: {
        ...shippingAddress,
      },
      email,
    } as StorePostCartsCartReq;

    if (same_as_billing)
      updateData.billing_address = updateData.shipping_address;

    if (!same_as_billing)
      updateData.billing_address = {
        ...billing_address,
      } as StorePostCartsCartReq;

    const client = getMedusaClient();

    await client.carts
      .update(cartId.value, updateData, getSrvSessionHeaders(event))
      .catch((error) => {
        handleError(error);
        throw new FormError<FormData>($localize`Submit was not successfull`);
      });

    // does not work
    // const redirectUrl = event.url.pathname + '?step=delivery';
    // event.url.searchParams.set('step', 'delivery');
    // return event.redirect(302, redirectUrl);

    return {
      status: 'success',
      message: $localize`Submitted successfully`,
    };
  },
  valiForm$(FormSchema),
);

const setInitialSignal = (
  cart: Cart | null,
  sameAsBilling: boolean,
): InitialValues<FormData> => {
  const data: InitialValues<FormData> = {
    shipping_address: {
      first_name: cart?.shipping_address?.first_name ?? '',
      last_name: cart?.shipping_address?.last_name ?? '',
      company: cart?.shipping_address?.company ?? '',
      address_1: cart?.shipping_address?.address_1 ?? '',
      address_2: cart?.shipping_address?.address_2 ?? '',
      postal_code: cart?.shipping_address?.postal_code ?? '',
      city: cart?.shipping_address?.city ?? '',
      province: cart?.shipping_address?.province ?? '',
      country_code: cart?.shipping_address?.country_code ?? '',
      phone: cart?.shipping_address?.phone ?? '',
      email: cart?.email ?? '',
      same_as_billing: sameAsBilling,
    },
    billing_address: {
      first_name: cart?.billing_address?.first_name ?? '',
      last_name: cart?.billing_address?.last_name ?? '',
      company: cart?.billing_address?.company ?? '',
      address_1: cart?.billing_address?.address_1 ?? '',
      address_2: cart?.billing_address?.address_2 ?? '',
      postal_code: cart?.billing_address?.postal_code ?? '',
      city: cart?.billing_address?.city ?? '',
      province: cart?.billing_address?.province ?? '',
      country_code: cart?.billing_address?.country_code ?? '',
      phone: cart?.billing_address?.phone ?? '',
    },
  };

  return data;
};

export interface AddressesFormProps {
  sameAsBilling: Signal<boolean>;
  cart:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'>>>;
  customer:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Customer, 'password_hash'>>>;
}

export const AddressesForm = component$<AddressesFormProps>(
  ({ sameAsBilling, cart, customer }) => {
    const location = useLocation();
    const region = useGetRegionLoader();
    const initialData = useSignal<InitialValues<FormData>>(
      setInitialSignal(cart.value, sameAsBilling.value),
    );

    const [form, { Form, Field }] = useForm<FormData>({
      loader: initialData,
      validate: valiForm$(FormSchema),
      action: useFormAction(),
    });

    const countriesInRegion = useComputed$(() =>
      cart.value?.region?.countries?.map((c) => c.iso_2),
    );

    const addressesInRegion = useComputed$(() => {
      const addresses = customer.value?.shipping_addresses?.filter(
        (a) =>
          a.country_code && countriesInRegion.value?.includes(a.country_code),
      );
      return addresses;
    });

    const deliverUrl = location.url.pathname + '?step=delivery';

    return (
      <div class="space-y-4">
        {customer.value && (addressesInRegion.value?.length || 0) > 0 && (
          <>
            <UiText>
              {$localize`Hi ${customer.value.first_name}, do you want to use one of your saved addresses?`}
            </UiText>

            <AddressSelect
              addresses={customer.value?.shipping_addresses ?? []}
              cart={cart}
              onChange$={(address) => {
                setValues(form, {
                  shipping_address: {
                    first_name: address?.first_name ?? '',
                    last_name: address?.last_name ?? '',
                    company: address?.company ?? '',
                    address_1: address?.address_1 ?? '',
                    address_2: address?.address_2 ?? '',
                    postal_code: address?.postal_code ?? '',
                    city: address?.city ?? '',
                    province: address?.province ?? '',
                    country_code: address?.country_code ?? '',
                    phone: address?.phone ?? '',
                  },
                });
              }}
            />
          </>
        )}
        <Form id="checkout-address-form" class="space-y-4">
          <div class="grid grid-cols-2 gap-x-2">
            <Field name="shipping_address.first_name">
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

            <Field name="shipping_address.last_name">
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

          <div class="grid grid-cols-2 gap-x-2">
            <Field name="shipping_address.address_1">
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

            <Field name="shipping_address.company">
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
          </div>

          <div class="grid grid-cols-[1fr_1fr_1fr] gap-x-2">
            <Field name="shipping_address.address_2">
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

            <Field name="shipping_address.postal_code">
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
            <Field name="shipping_address.city">
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

          <div class="grid grid-cols-2 gap-x-2">
            <Field name="shipping_address.country_code">
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
            <Field name="shipping_address.province">
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
          </div>

          <Field name="shipping_address.same_as_billing" type="boolean">
            {(field, props) => (
              <Checkbox
                {...props}
                // checked={field.value}
                checked={sameAsBilling.value}
                error={field.error}
                label={$localize`Same as billing address`}
                onChange$={(e) => {
                  const el = e.target as HTMLInputElement;
                  sameAsBilling.value = el.checked;
                  setValue(
                    form,
                    'shipping_address.same_as_billing',
                    el.checked,
                  );
                }}
              />
            )}
          </Field>

          <div class="grid grid-cols-2 gap-x-2">
            <Field name="shipping_address.email">
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

            <Field name="shipping_address.phone">
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
          </div>

          {
            // getValue(form, 'shipping_address.same_as_billing') !== true
            sameAsBilling.value === false && (
              <>
                <UiTitle as="h1" size="2xl" class="flex items-center gap-x-2">
                  {$localize`Billing address`}
                </UiTitle>

                <div class="grid grid-cols-2 gap-x-2">
                  <Field name="billing_address.first_name">
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

                  <Field name="billing_address.last_name">
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

                <div class="grid grid-cols-2 gap-x-2">
                  <Field name="billing_address.address_1">
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

                  <Field name="billing_address.company">
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
                </div>

                <div class="grid grid-cols-[1fr_1fr_1fr] gap-x-2">
                  <Field name="billing_address.address_2">
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

                  <Field name="billing_address.postal_code">
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
                  <Field name="billing_address.city">
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

                <div class="grid grid-cols-2 gap-x-2">
                  <Field name="billing_address.country_code">
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
                  <Field name="billing_address.province">
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
                </div>

                <div class="grid grid-cols-2 gap-x-2">
                  <Field name="billing_address.phone">
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
                </div>
              </>
            )
          }

          <div>
            <Response of={form} redirectUrl={deliverUrl} />
          </div>

          <FormFooter
            of={form}
            form="checkout-address-form"
            withoutCancel
            submitLabel={$localize`Continue to delivery`}
          />
        </Form>
      </div>
    );
  },
);
