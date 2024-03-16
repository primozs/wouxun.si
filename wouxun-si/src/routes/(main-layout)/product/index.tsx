import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { PaginatedProducts } from '~/modules/products/PaginatedProducts';
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
    </>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Products`,
});
