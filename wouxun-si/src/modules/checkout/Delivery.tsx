import { type Signal, component$, useComputed$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import type { Cart } from '@medusajs/client-types';
import { IoCheckmarkCircle } from '@qwikest/icons/ionicons';
import { UiIcon } from '~/ui/UiIcon';
import { UiItem } from '~/ui/UiItem';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';

export interface DeliveryProps {
  cart:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'>>>;
}

export const Delivery = component$<DeliveryProps>(({ cart }) => {
  const location = useLocation();

  const isOpen = useComputed$(() => {
    return location.url.searchParams.get('step') === 'delivery';
  });

  return (
    <>
      <UiItem pad={false} lines="none">
        <UiTitle as="h1" size="2xl" class="flex items-center gap-x-2">
          {$localize`Delivery`}

          {!isOpen.value && (cart.value?.shipping_methods?.length ?? 0) > 0 && (
            <UiIcon color="primary">
              <IoCheckmarkCircle />
            </UiIcon>
          )}
        </UiTitle>

        {!isOpen.value &&
          cart.value?.shipping_address &&
          cart.value?.billing_address &&
          cart.value?.email && (
            <NavLink
              q:slot="end"
              color="secondary"
              intent="button"
              href={location.url.pathname + '?step=delivery'}
            >
              {$localize`Edit`}
            </NavLink>
          )}
      </UiItem>

      {isOpen.value ? <>form</> : <>display delivery</>}
    </>
  );
});
