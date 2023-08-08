import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import ProdajniProgram from '~/content/prodajniProgram.mdx';
import { ProductList } from '~/ui/products/ProductList';

export default component$(() => {
  return (
    <>
      <section>
        <ProdajniProgram />
        <ProductList />
      </section>
    </>
  );
});

export const head: DocumentHead = {
  title: 'začetna stran',
};
