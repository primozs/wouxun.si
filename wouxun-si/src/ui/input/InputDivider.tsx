import { component$, Slot } from '@builder.io/qwik';

export const InputDivider = component$(() => {
  return (
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="bg-white px-2 text-gray-500 dark:bg-secondary-900 dark:text-white">
          <Slot />
        </span>
      </div>
    </div>
  );
});
