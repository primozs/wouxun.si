import { component$ } from '@builder.io/qwik';
import { ShoppingBagIcon2 } from '~/ui/icons/shopping-bag-icon2';
import { CartDialog } from './CartDialog';
import { CartList } from './CartList';
import { useCartLoader } from '~/routes/plugin@store';
import { Button } from '~/ui/button';

export interface CartButtonProps {}

export const CartButton = component$<CartButtonProps>(() => {
  const cart = useCartLoader();

  return (
    <>
      <CartDialog>
        <CartList cart={cart} />
        <Button
          q:slot="button"
          type="button"
          aria-label="Odpri voziček"
          color="primary"
          fill="outline"
          intent="square"
        >
          <ShoppingBagIcon2 isEmpty={!cart.value?.items?.length} />
        </Button>
      </CartDialog>
    </>
  );
});
