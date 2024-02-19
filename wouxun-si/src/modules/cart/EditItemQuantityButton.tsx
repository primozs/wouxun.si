import { component$, useSignal } from '@builder.io/qwik';
import type { LineItem } from '@medusajs/client-types';
import { LoadingDots } from '~/ui/loading-dots';
import { useSetCartItemQuantityAction } from '~/routes/plugin@store';
import { IoChevronExpandOutline } from '@qwikest/icons/ionicons';

type Props = {
  item: LineItem;
};

export const EditItemQuantityButton = component$<Props>(({ item }) => {
  const isLoading = useSignal(false);
  const action = useSetCartItemQuantityAction();
  return (
    <>
      {isLoading.value && <LoadingDots class="bg-base-content/50" />}
      {!isLoading.value && (
        <div class="flex items-center cursor-pointer relative">
          <select
            class="flex flex-row p-1 text-base-content appearance-none cursor-pointer pr-5 z-50"
            value={item.quantity}
            onChange$={async (e) => {
              // @ts-ignore
              const quantity = parseInt(e.target.value);
              isLoading.value = true;
              await action.submit({ itemId: item.id, quantity });
              isLoading.value = false;
            }}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option value={n} key={n}>
                {String(n)}
              </option>
            ))}
          </select>
          <IoChevronExpandOutline class="absolute left-4" />
        </div>
      )}
    </>
  );
});
