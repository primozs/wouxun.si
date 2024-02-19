import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import ProdajniProgram from '~/content/prodajniProgram.mdx';
import { ProductList } from '~/modules/products/ProductList';

export default component$(() => {
  return (
    <>
      <section class="prose mb-10">
        <ProdajniProgram />
      </section>
      <section>
        <ProductList />
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: 'začetna stran',
};
