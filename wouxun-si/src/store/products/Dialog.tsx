import { component$, useSignal, Slot, $ } from '@builder.io/qwik';
import { Tag } from '~/ui/tag';
import { IoCloseOutline } from '@qwikest/icons/ionicons';

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
          <div class="bg-base-200 flex flex-row justify-between p-2 border-b w-full border-base-300">
            <div class="flex items-center gap-x-2">
              <button
                type="button"
                onClick$={() => {
                  ref.value?.close();
                }}
                class="btn btn-square btn-sm btn-neutral"
              >
                <IoCloseOutline class="h-5 w-5" />
              </button>
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
