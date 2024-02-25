import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { ProductList } from '~/modules/products/ProductList';
import { useProductsLoader } from '~/modules/products/loaders';

export default component$(() => {
  const products = useProductsLoader();
  return (
    <>
      <h1 class="header1">Prodajni program</h1>
      <ProductList products={products} />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Prodajni program',
};
