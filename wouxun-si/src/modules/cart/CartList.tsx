import { type Signal, component$ } from '@builder.io/qwik';
import { EmptyCartMessage } from './EmptyCartMessage';
import type { Cart } from '@medusajs/client-types';
import { ListCartItemsTable } from './ListCartItemsTable';
import { SignInPrompt } from './SignInPrompt';
import { useIsAuthenticatedLoader } from '~/routes/plugin@auth';
import { CartTotals } from './CartTotals';
import { DiscountCode } from './DiscountCode';

export interface CartListProps {
  cart: Signal<Cart | null>;
}

export const CartList = component$<CartListProps>(({ cart }) => {
  const authenticated = useIsAuthenticatedLoader();
  return (
    <>
      {cart.value && (cart.value?.items?.length ?? 0) > 0 ? (
        <>
          {!authenticated.value && <SignInPrompt />}

          <div class="px-4">
            <ListCartItemsTable
              items={cart.value?.items}
              region={cart.value?.region}
            />
          </div>

          <div class="p-4">
            <DiscountCode cart={cart} />

            <div class="h-px w-full border-b border-base-300 my-4" />

            <CartTotals data={cart.value} />
          </div>
        </>
      ) : (
        <EmptyCartMessage />
      )}
    </>
  );
});
