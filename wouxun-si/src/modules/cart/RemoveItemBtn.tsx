import { component$, useSignal } from '@builder.io/qwik';
import type { LineItem } from '@medusajs/client-types';
import { IoTrashOutline } from '@qwikest/icons/ionicons';
import { useRemoveCartItemAction } from '~/routes/plugin@store';
import { UiIcon } from '~/ui/UiIcon';
import { Button } from '~/ui/button';

type Props = {
  item: LineItem;
  iconOnly?: boolean;
};

export const RemoveItemBtn = component$<Props>(({ item, iconOnly = false }) => {
  const removing = useSignal(false);
  const action = useRemoveCartItemAction();

  return (
    <Button
      disabled={removing.value}
      onClick$={async () => {
        removing.value = true;
        await action.submit({ itemId: item.id });
        removing.value = false;
      }}
      intent="unstyled"
      color="base"
      class="btn-sm text-xs"
      loading={removing.value}
    >
      {iconOnly === false ? (
        <>
          <UiIcon class="hidden sm:block">
            <IoTrashOutline />
          </UiIcon>
          {$localize`Remove`}
        </>
      ) : (
        <>
          <UiIcon>
            <IoTrashOutline />
          </UiIcon>
          <span class="sr-only">{$localize`Remove`}</span>
        </>
      )}
    </Button>
  );
});
