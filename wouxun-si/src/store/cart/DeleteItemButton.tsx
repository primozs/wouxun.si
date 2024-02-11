import { $, component$, useSignal } from '@builder.io/qwik';
import type { LineItem } from '@medusajs/client-types';
import { getMedusaClient } from '~/services/medusa';
import { useCart } from './cartState';
import { LoadingDots } from '~/ui/loading-dots';

type Props = {
  item: LineItem;
};

export const DeleteItemButton = component$<Props>(({ item }) => {
  const { updateCart } = useCart();
  const removing = useSignal(false);

  const handleRemove = $(async () => {
    const { cart_id, id } = item;
    if (!cart_id || !id) return;

    removing.value = true;

    const client = getMedusaClient();
    const res = await client.carts.lineItems.delete(cart_id, id);
    const cart = res.cart;
    updateCart();

    if (!cart) {
      throw new Error(`Error fetching cart with id ${cart_id}`);
    }

    removing.value = false;
  });

  return (
    <button disabled={removing.value} onClick$={handleRemove}>
      {removing.value ? (
        <LoadingDots class="bg-neutral-500 dark:bg-neutral-400" />
      ) : (
        'Odstrani'
      )}
    </button>
  );
});
