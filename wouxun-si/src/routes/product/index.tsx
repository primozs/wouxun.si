import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { ProductList } from '~/ui/products/ProductList';

export default component$(() => {
  return (
    <>
      <h1>Prodajni program</h1>
      <ProductList />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Prodajni program',
};
