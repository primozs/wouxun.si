import { component$, useSignal, Slot, $ } from '@builder.io/qwik';

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement
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
        class="max-w-xs sm:max-w-xl lg:max-w-3xl xl:max-w-6xl outline-none rounded-md"
        onClick$={() => {
          ref.value?.close();
        }}
      >
        <Slot name="dialog" />
      </dialog>
    </>
  );
});
