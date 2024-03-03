import { component$, useSignal } from '@builder.io/qwik';
import type { LineItem } from '@medusajs/client-types';
import { useSetCartItemQuantityAction } from '~/routes/plugin@store';
import { Select } from '~/ui/input/Select';
import { LoadingDots } from '~/ui/loading-dots';

type Props = {
  item: LineItem;
};

export const ItemQuantitySelect = component$<Props>(({ item }) => {
  const isLoading = useSignal(false);
  const action = useSetCartItemQuantityAction();
  return (
    <>
      <div class="flex flex-shrink-0 items-center cursor-pointer relative mr-2 sm:mr-4">
        {isLoading.value && <LoadingDots class="bg-base-content/50" />}
        {!isLoading.value && (
          <Select
            name={'quantity_' + item.id}
            label={$localize`Quantity`}
            value={item.quantity + ''}
            options={[1, 2, 3, 4, 5].map((n) => ({
              label: String(n),
              value: String(n),
            }))}
            labelSrOnly
            onChange$={async (e) => {
              // @ts-ignore
              const quantity = parseInt(e.target.value);
              isLoading.value = true;
              await action.submit({ itemId: item.id, quantity });
              isLoading.value = false;
            }}
          />
        )}
      </div>
    </>
  );
});
