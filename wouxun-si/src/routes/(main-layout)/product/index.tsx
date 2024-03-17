import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { PaginatedProducts } from '~/modules/products/PaginatedProducts';
import { Pagination } from '~/modules/products/Pagination';
import { usePaginatedProductsLoader } from '~/modules/products/loaders';
import { UiTitle } from '~/ui/UiTitle';

export { usePaginatedProductsLoader } from '~/modules/products/loaders';

export default component$(() => {
  const paginated = usePaginatedProductsLoader();
  return (
    <>
      <UiTitle as="h1" size="2xl" color="primary">
        {$localize`Products`}
      </UiTitle>

      <PaginatedProducts products={paginated.value.products} />
      {paginated.value.totalPages > 1 && (
        <Pagination
          page={paginated.value.page}
          totalPages={paginated.value.totalPages}
        />
      )}
    </>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Products`,
});
