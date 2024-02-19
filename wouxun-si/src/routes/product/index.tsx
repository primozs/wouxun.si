import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { ProductList } from '~/modules/products/ProductList';

export default component$(() => {
  return (
    <>
      <h1 class="header1">Prodajni program</h1>
      <ProductList />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Prodajni program',
};
