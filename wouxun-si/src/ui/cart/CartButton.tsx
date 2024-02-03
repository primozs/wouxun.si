import { component$ } from '@builder.io/qwik';
import { Button } from '../button';
import { ShoppingBagIcon2 } from '../icons/shopping-bag-icon2';
import { CartDialog } from './CartDialog';
import { CartList } from './CartList';
import { useCart } from './cartState';

export interface CartButtonProps {}

export const CartButton = component$<CartButtonProps>(() => {
  const { cart } = useCart();

  return (
    <>
      <CartDialog>
        <CartList cart={cart} />

        <Button
          q:slot="button"
          intent="icon"
          type="button"
          aria-label="Odpri voziček"
        >
          <ShoppingBagIcon2 isEmpty={!cart.value?.items?.length} />
        </Button>
      </CartDialog>
    </>
  );
});
