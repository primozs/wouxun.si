import { type Signal, component$ } from '@builder.io/qwik';
import { useCartLoader } from '~/routes/plugin@store';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';

export interface DisplayAddressProps {
  sameAsBilling: Readonly<Signal<boolean>>;
}

export const DisplayAddress = component$<DisplayAddressProps>(
  ({ sameAsBilling }) => {
    const cart = useCartLoader();
    return (
      <>
        {cart.value && cart.value.shipping_address && (
          <div class="flex items-start gap-x-8">
            <div class="flex flex-col w-1/3">
              <UiTitle>{$localize`Shipping address`}</UiTitle>
              <UiText>
                {cart.value.shipping_address?.first_name}{' '}
                {cart.value.shipping_address?.last_name}
              </UiText>
              <UiText>
                {cart.value.shipping_address?.address_1}{' '}
                {cart.value.shipping_address?.address_2}
              </UiText>
              <UiText>
                {cart.value.shipping_address?.postal_code},{' '}
                {cart.value.shipping_address?.city}
              </UiText>
              <UiText>
                {cart.value.shipping_address?.country_code?.toUpperCase()}
              </UiText>
            </div>

            <div class="flex flex-col w-1/3 ">
              <UiTitle>{$localize`Contact`}</UiTitle>
              <UiText>{cart.value.shipping_address.phone}</UiText>
              <UiText>{cart.value.email}</UiText>
            </div>

            <div class="flex flex-col w-1/3">
              <UiTitle>{$localize`Billing Address`}</UiTitle>
              {sameAsBilling.value ? (
                <UiText>
                  {$localize`Billing and delivery address are the same.`}
                </UiText>
              ) : (
                <>
                  <UiText>
                    {cart.value.billing_address?.first_name}{' '}
                    {cart.value.billing_address?.last_name}
                  </UiText>
                  <UiText>
                    {cart.value.billing_address?.address_1}{' '}
                    {cart.value.billing_address?.address_2}
                  </UiText>
                  <UiText>
                    {cart.value.billing_address?.postal_code},{' '}
                    {cart.value.billing_address?.city}
                  </UiText>
                  <UiText>
                    {cart.value.billing_address?.country_code?.toUpperCase()}
                  </UiText>
                </>
              )}
            </div>
          </div>
        )}
      </>
    );
  },
);
