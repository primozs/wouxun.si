import { component$, Slot } from '@builder.io/qwik';

export const FormDescription = component$(() => {
  return (
    <p class="mt-1 max-w-2xl text-sm text-base-content/60">
      <Slot />
    </p>
  );
});
