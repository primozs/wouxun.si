import { component$, Slot } from '@builder.io/qwik';

export const FormDescription = component$(() => {
  return (
    <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-200">
      <Slot />
    </p>
  );
});
