import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { PaginatedProducts } from '~/modules/products/PaginatedProducts';
import { Pagination } from '~/modules/products/Pagination';
import { usePaginatedProductsLoader } from '~/modules/products/loaders';
import { useWebsiteContent } from '../layout';
import { mdParse } from '~/ui/md-parse';

export default component$(() => {
  const paginated = usePaginatedProductsLoader();
  const website = useWebsiteContent();
  return (
    <>
      <section
        class="prose mb-10"
        dangerouslySetInnerHTML={mdParse(website.value?.sales_programme)}
      ></section>
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
