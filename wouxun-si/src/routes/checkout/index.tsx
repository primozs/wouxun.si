import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return <>checkout</>;
});

export const head: DocumentHead = {
  title: 'Prodajni program',
};
