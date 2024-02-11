import { $, component$, useSignal } from '@builder.io/qwik';
import type { LineItem } from '@medusajs/client-types';
import { getMedusaClient } from '~/services/medusa';
import { useCart } from './cartState';
import { LoadingDots } from '~/ui/loading-dots';
import { ChevronUpDown } from '~/ui/icons/chevron-up-down';

type Props = {
  item: LineItem;
};

export const EditItemQuantityButton = component$<Props>(({ item }) => {
  const isLoading = useSignal(false);
  const { updateCart } = useCart();

  const handleUpdate = $(async (item: LineItem, quantity: number) => {
    try {
      isLoading.value = true;
      const client = getMedusaClient();
      await client.carts.lineItems.update(item.cart_id!, item.id, { quantity });
      await updateCart();
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <>
      {isLoading.value && (
        <LoadingDots class="bg-neutral-400 dark:bg-neutral-400" />
      )}
      {!isLoading.value && (
        <div class="flex items-center cursor-pointer relative">
          <select
            class="flex flex-row p-1 bg-transparent text-base-light dark:text-base-dark appearance-none cursor-pointer pr-5 z-50"
            value={item.quantity}
            onChange$={(e) => {
              // console.log(e.target.value);
              // @ts-ignore
              handleUpdate(item, parseInt(e.target.value));
            }}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option value={n} key={n}>
                {String(n)}
              </option>
            ))}
          </select>
          <ChevronUpDown class="absolute left-4" />
        </div>
      )}
    </>
  );
});
