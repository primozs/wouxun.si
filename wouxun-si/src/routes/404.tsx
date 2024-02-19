import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <main class="w-full h-screen flex flex-col flex-grow justify-center items-center bg-primary !text-primary-content p-6">
      <h1 class="font-semibold text-4xl">404</h1>
      <h2 class="font-medium text-2xl">Stran ne obstaja</h2>
    </main>
  );
});

export const head: DocumentHead = {
  title: '404',
};
