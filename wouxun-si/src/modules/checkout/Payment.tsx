import { type Signal, component$, useComputed$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import type { Cart } from '@medusajs/client-types';
import { IoCheckmarkCircle } from '@qwikest/icons/ionicons';
import { UiIcon } from '~/ui/UiIcon';
import { UiItem } from '~/ui/UiItem';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';

export interface PaymentProps {
  cart:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'>>>;
}

export const Payment = component$<PaymentProps>(({ cart }) => {
  const location = useLocation();

  const isOpen = useComputed$(() => {
    return location.url.searchParams.get('step') === 'payment';
  });

  const paymentReady = useComputed$(() => {
    return (
      cart.value?.payment_session &&
      (cart.value?.shipping_methods?.length ?? 0) > 0
    );
  });

  return (
    <>
      <UiItem pad={false} lines="none">
        <UiTitle as="h1" size="2xl" class="flex items-center gap-x-2">
          {$localize`Payment`}

          {!isOpen.value && paymentReady.value && (
            <UiIcon color="primary">
              <IoCheckmarkCircle />
            </UiIcon>
          )}
        </UiTitle>

        {!isOpen.value && paymentReady.value && (
          <NavLink
            q:slot="end"
            color="secondary"
            intent="button"
            href={location.url.pathname + '?step=payment'}
          >
            {$localize`Edit`}
          </NavLink>
        )}
      </UiItem>

      {isOpen.value ? <>form</> : <>display payment</>}
    </>
  );
});
