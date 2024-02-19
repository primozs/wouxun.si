import { component$, Slot } from '@builder.io/qwik';

export const FormTitle = component$(() => {
  return (
    <h3 class="text-lg font-medium leading-6 text-base-content">
      <Slot />
    </h3>
  );
});
