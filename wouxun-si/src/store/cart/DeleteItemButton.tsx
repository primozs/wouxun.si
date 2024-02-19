import { component$, useSignal } from '@builder.io/qwik';
import type { LineItem } from '@medusajs/client-types';
import { useRemoveCartItemAction } from '~/routes/plugin@store';
import { LoadingDots } from '~/ui/loading-dots';

type Props = {
  item: LineItem;
};

export const DeleteItemButton = component$<Props>(({ item }) => {
  const removing = useSignal(false);
  const action = useRemoveCartItemAction();

  return (
    <button
      disabled={removing.value}
      onClick$={async () => {
        removing.value = true;
        await action.submit({ itemId: item.id });
        removing.value = false;
      }}
    >
      {removing.value ? <LoadingDots class="bg-base-content/50" /> : 'Odstrani'}
    </button>
  );
});
