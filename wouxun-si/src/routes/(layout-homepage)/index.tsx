import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import ProdajniProgram from '~/content/prodajniProgram.mdx';
import { ProductList } from '~/modules/products/ProductList';
import { useProductsLoader } from '~/modules/products/loaders';

export default component$(() => {
  const products = useProductsLoader();
  return (
    <>
      <section class="prose mb-10">
        <ProdajniProgram />
      </section>
      <section>
        <ProductList products={products} />
      </section>
    </>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Homepage`,
});
