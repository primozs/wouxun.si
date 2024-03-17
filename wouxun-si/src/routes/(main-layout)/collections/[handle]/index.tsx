import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { NotFound } from '~/modules/not-found/NotFound';
import { SortProducts } from '~/modules/products/SortProducts';
import { UiTitle } from '~/ui/UiTitle';
import {
  useCollectionByHandle,
  usePaginatedProductsLoader,
} from '~/modules/products/loaders';
import { PaginatedProducts } from '~/modules/products/PaginatedProducts';
import { Pagination } from '~/modules/products/Pagination';

export {
  useCollectionByHandle,
  usePaginatedProductsLoader,
} from '~/modules/products/loaders';

export default component$(() => {
  const collection = useCollectionByHandle();
  const paginated = usePaginatedProductsLoader();

  return (
    <>
      {!collection.value ? (
        <NotFound centered={true} />
      ) : (
        <div class="flex flex-col sm:flex-row gap-10">
          <SortProducts />
          <div class="w-full">
            <UiTitle as="h1" size="xl">
              {collection.value.title}
            </UiTitle>

            <PaginatedProducts products={paginated.value.products} />
            {paginated.value.totalPages > 1 && (
              <Pagination
                page={paginated.value.page}
                totalPages={paginated.value.totalPages}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
});

export const head: DocumentHead = (event) => {
  const res = event.resolveValue(useCollectionByHandle);
  return {
    title: $localize`${res?.title} collection`,
  };
};
