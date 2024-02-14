import { Slot, component$ } from '@builder.io/qwik';

type FormHeaderProps = {
  heading: string;
};

export const FormHeader = component$<FormHeaderProps>(({ heading }) => {
  return (
    <header class="flex items-center justify-between">
      <h1 class="text-lg font-medium leading-6 text-gray-800 dark:text-white">
        {heading}
      </h1>
      <div class="flex space-x-4">
        <Slot />
      </div>
    </header>
  );
});
