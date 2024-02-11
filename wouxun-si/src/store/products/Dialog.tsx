import { component$, useSignal, Slot, $ } from '@builder.io/qwik';
import { Button } from '~/ui/button';
import { XMark } from '~/ui/icons/x-mark';
import { Tag } from '~/ui/tag';

export const Dialog = component$(() => {
  const ref = useSignal<HTMLDialogElement>();

  const handleClick = $(() => {
    ref.value?.showModal();
  });

  return (
    <>
      <div onClick$={handleClick} class="cursor-pointer">
        <Slot />
      </div>

      <dialog
        ref={ref}
        class="`          
          outline-none rounded-md overflow-hidden
          w-full sm:max-w-6xl
          shadow-lg
        `"
      >
        <div class="w-full h-full rounded-lg flex flex-col items-center">
          <div class="bg-neutral-50 dark:bg-neutral-600 flex flex-row justify-between p-2 border-b w-full border-neutral-200 dark:border-neutral-400">
            <div class="flex items-center gap-x-2">
              <Button
                intent="icon"
                onClick$={() => {
                  ref.value?.close();
                }}
                type="button"
                class="p-[5px] focus-visible:ring-1 focus-visible:ring-neutral-400"
              >
                <XMark class="h-5 w-5 text-neutral-400" />
              </Button>
              <Tag class="hidden md:block" size="small" variant="neutral">
                esc
              </Tag>
            </div>
          </div>
          <div class="w-full flex items-center justify-center overflow-auto">
            <Slot name="dialog" />
          </div>
        </div>
      </dialog>
    </>
  );
});
