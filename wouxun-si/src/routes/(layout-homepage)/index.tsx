import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import ProdajniProgram from '~/content/prodajniProgram.mdx';
import SalesProgramme from '~/content/salesProgramme.mdx';
import { useLocale } from '~/modules/locale/LocaleProvider';
import { PaginatedProducts } from '~/modules/products/PaginatedProducts';
import { Pagination } from '~/modules/products/Pagination';
import { usePaginatedProductsLoader } from '~/modules/products/loaders';

export default component$(() => {
  const locale = useLocale();
  const paginated = usePaginatedProductsLoader();
  return (
    <>
      <section class="prose mb-10">
        {locale.value === 'sl' ? <ProdajniProgram /> : <SalesProgramme />}
      </section>
      <section>
        <PaginatedProducts products={paginated.value.products} />
        {paginated.value.totalPages > 1 && (
          <Pagination
            page={paginated.value.page}
            totalPages={paginated.value.totalPages}
          />
        )}
      </section>
    </>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Homepage`,
});
