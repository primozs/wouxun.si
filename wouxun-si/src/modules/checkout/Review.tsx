import { type Signal, component$, useComputed$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import type { Cart } from '@medusajs/client-types';
import { UiItem } from '~/ui/UiItem';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';
import { PaymentBtn } from './PaymentBtn';
import { UiText } from '~/ui/UiText';

export interface ReviewProps {
  cart:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'>>>;
}

export const Review = component$<ReviewProps>(({ cart }) => {
  const location = useLocation();

  const isOpen = useComputed$(() => {
    return location.url.searchParams.get('step') === 'review';
  });

  const previousStepsCompleted = useComputed$(() => {
    return (
      cart.value?.shipping_address &&
      (cart.value?.shipping_methods?.length ?? 0) > 0 &&
      cart.value?.payment_session
    );
  });

  return (
    <>
      <UiItem pad={false} lines="none">
        <UiTitle as="h1" size="2xl" class="flex items-center gap-x-2">
          {$localize`Review`}
        </UiTitle>

        {!isOpen.value && previousStepsCompleted.value && (
          <NavLink
            q:slot="end"
            color="secondary"
            intent="button"
            href={location.url.pathname + '?step=review'}
          >
            {$localize`Edit`}
          </NavLink>
        )}
      </UiItem>

      {isOpen.value && previousStepsCompleted.value && (
        <div class="space-y-8 mb-8">
          <UiText>{$localize`Review checkout information and place the order.`}</UiText>
          <PaymentBtn cart={cart} />
        </div>
      )}
    </>
  );
});
