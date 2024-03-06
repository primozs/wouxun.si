import {
  type Signal,
  component$,
  useSignal,
  type PropFunction,
} from '@builder.io/qwik';
import type { Address, Cart } from '@medusajs/client-types';
import { UiSelect, UiSelectOption } from '~/ui/UiSelect';
import compareAddresses from '../common/utils/compareAddresses';
import { UiTitle } from '~/ui/UiTitle';
import { UiText } from '~/ui/UiText';

export interface AddressSelectProps {
  addresses: Address[];
  cart: Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'> | null>;
  onChange$: PropFunction<(a: Address | undefined) => void>;
}

export const AddressSelect = component$<AddressSelectProps>(
  ({ addresses, cart, onChange$ }) => {
    const selectedAddress = useSignal(
      addresses.find((a) => compareAddresses(a, cart.value?.shipping_address)),
    );
    return (
      <UiSelect
        value={selectedAddress.value?.id}
        label={$localize`Select address`}
      >
        {selectedAddress.value && (
          <span q:slot="selected">
            {selectedAddress.value.first_name} {selectedAddress.value.last_name}{' '}
            {selectedAddress.value.address_1}{' '}
            {selectedAddress.value.country_code?.toUpperCase()}
          </span>
        )}

        {addresses.map((address) => {
          return (
            <UiSelectOption
              key={address.id}
              onClick$={() => {
                selectedAddress.value = address;
                onChange$ && onChange$(address);
              }}
            >
              <div class="flex gap-x-4 items-start p-2">
                <input
                  type="radio"
                  name="radio-1"
                  class="radio radio-primary radio-sm"
                  checked={selectedAddress.value?.id === address.id}
                />
                <div class="flex flex-col">
                  <UiTitle class="text-left">
                    {address.first_name} {address.last_name}
                  </UiTitle>
                  {address.company && <UiText>{address.company}</UiText>}
                  <div class="flex flex-col text-left mt-2">
                    <UiText>
                      {address.address_1}
                      {address.address_2 && <span>, {address.address_2}</span>}
                    </UiText>
                    <UiText>
                      {address.postal_code}, {address.city}
                    </UiText>
                    <UiText>
                      {address.province && `${address.province}, `}
                      {address.country_code?.toUpperCase()}
                    </UiText>
                  </div>
                </div>
              </div>
            </UiSelectOption>
          );
        })}
      </UiSelect>
    );
  },
);
