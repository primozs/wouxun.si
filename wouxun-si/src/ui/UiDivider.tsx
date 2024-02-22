import { component$, Slot } from '@builder.io/qwik';

export const UiDivider = component$(() => {
  return (
    <div class="divider divider-neutral text-neutral-content/60 text-sm">
      <Slot />
    </div>
  );
});
