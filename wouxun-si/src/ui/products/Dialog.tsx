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
        class="`          
          outline-none rounded-md overflow-hidden
          w-full sm:max-w-6xl
          shadow-lg
        `"
        onClick$={() => {
          ref.value?.close();
        }}
      >
        <Slot name="dialog" />
      </dialog>
    </>
  );
});
