import { Slot, component$ } from '@builder.io/qwik';

export const PageContainer = component$(() => {
  return (
    <main class="max-w-screen-2xl mx-auto w-full px-4 sm:px-5 my-5">
      <Slot></Slot>
    </main>
  );
});

export const SectionContainerSmall = component$(() => {
  return (
    <section class="mx-auto w-full max-w-sm lg:w-96">
      <Slot></Slot>
    </section>
  );
});
