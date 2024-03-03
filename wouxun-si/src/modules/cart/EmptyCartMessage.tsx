import { component$ } from '@builder.io/qwik';
import { IoBagHandleOutline } from '@qwikest/icons/ionicons';
import { UiNote } from '~/ui/UiNote';

export const EmptyCartMessage = component$(() => {
  return (
    <div class="flex flex-col h-full justify-center items-center text-base-content/60">
      <IoBagHandleOutline class="!h-16 !w-16" />
      <UiNote>{$localize`Shopping bag is empty`}</UiNote>
    </div>
  );
});
