import { component$, Slot } from '@builder.io/qwik';

export const InputDivider = component$(() => {
  return (
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-base-300"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="bg-base-100 px-2 text-base-content/50">
          <Slot />
        </span>
      </div>
    </div>
  );
});
