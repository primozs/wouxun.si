import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { ProductList } from '~/store/products/ProductList';

export default component$(() => {
  return (
    <>
      <ProductList />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Prodajni program',
};
