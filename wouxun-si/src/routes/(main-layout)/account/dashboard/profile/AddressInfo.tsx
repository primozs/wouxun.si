import { Slot, component$, useSignal } from '@builder.io/qwik';
import { UiItem } from '~/ui/UiItem';
import { UiLabel } from '~/ui/UiLabel';
import { Button } from '~/ui/button';
import { Expandable } from '~/ui/expendable/Expandable';

export interface AddressInfoProps {}

export const AddressInfo = component$<AddressInfoProps>(() => {
  const expanded = useSignal(false);
  return (
    <>
      <UiItem lines={expanded.value ? 'none' : 'full'} pad={false}>
        <UiLabel>
          <Slot name="info"></Slot>
        </UiLabel>
        <Button
          q:slot="end"
          color="secondary"
          type="button"
          onClick$={() => {
            expanded.value = !expanded.value;
          }}
        >
          {expanded.value === true ? (
            <>{$localize`Close`}</>
          ) : (
            <>{$localize`Edit`}</>
          )}
        </Button>
      </UiItem>
      <Expandable expanded={expanded.value}>
        <Slot name="content"></Slot>
      </Expandable>
    </>
  );
});
