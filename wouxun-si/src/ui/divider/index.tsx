import { component$ } from '@builder.io/qwik';

export const Divider = component$(() => {
  return (
    <div class="w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
  );
});
