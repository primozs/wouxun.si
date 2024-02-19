import { component$ } from '@builder.io/qwik';
import { ShoppingBagIcon2 } from '~/ui/icons/shopping-bag-icon2';
import { CartDialog } from './CartDialog';
import { CartList } from './CartList';
import { useCartLoader } from '~/routes/plugin@store';

export interface CartButtonProps {}

export const CartButton = component$<CartButtonProps>(() => {
  const cart = useCartLoader();

  return (
    <>
      <CartDialog>
        <CartList cart={cart} />
        <button
          q:slot="button"
          type="button"
          aria-label="Odpri voziček"
          class="btn btn-square btn-sm btn-secondary"
        >
          <ShoppingBagIcon2 isEmpty={!cart.value?.items?.length} />
        </button>
      </CartDialog>
    </>
  );
});
