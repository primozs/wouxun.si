import {
  type Signal,
  component$,
  useComputed$,
  useSignal,
} from '@builder.io/qwik';
import { DisplayAddress } from './DisplayAddress';
import { useLocation } from '@builder.io/qwik-city';
import { UiItem } from '~/ui/UiItem';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';
import { IoCheckmarkCircle } from '@qwikest/icons/ionicons';
import { UiIcon } from '~/ui/UiIcon';
import { CheckoutAddressesForm } from './CheckoutAddressesForm';
import type { Cart, Customer } from '@medusajs/client-types';
import compareAddresses from '../common/utils/compareAddresses';

export interface CheckoutAddressesProps {
  cart:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'>>>;
  customer:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Customer, 'password_hash'>>>;
}

export const CheckoutAddresses = component$<CheckoutAddressesProps>(
  ({ cart, customer }) => {
    const location = useLocation();

    const isOpen = useComputed$(() => {
      return location.url.searchParams.get('step') === 'address';
    });

    const sameAsBilling = useSignal(
      cart.value?.shipping_address && cart.value.billing_address
        ? compareAddresses(
            cart.value?.shipping_address,
            cart.value?.billing_address,
          )
        : true,
    );

    return (
      <>
        <UiItem pad={false} lines="none">
          <UiTitle as="h1" size="2xl" class="flex items-center gap-x-2">
            {$localize`Shipping address`}

            {!isOpen.value && (
              <UiIcon color="primary">
                <IoCheckmarkCircle />
              </UiIcon>
            )}
          </UiTitle>

          {!isOpen.value && (
            <NavLink
              q:slot="end"
              color="secondary"
              intent="button"
              href={location.url.pathname + '?step=address'}
            >
              {$localize`Edit`}
            </NavLink>
          )}
        </UiItem>

        {isOpen.value ? (
          <CheckoutAddressesForm
            sameAsBilling={sameAsBilling}
            cart={cart}
            customer={customer}
          />
        ) : (
          <DisplayAddress sameAsBilling={sameAsBilling} />
        )}
      </>
    );
  },
);
