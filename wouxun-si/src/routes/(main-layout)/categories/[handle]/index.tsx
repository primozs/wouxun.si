import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { NotFound } from '~/modules/not-found/NotFound';
import { SortProducts } from '~/modules/products/SortProducts';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';
import {
  useCategoryByHandle,
  usePaginatedProductsLoader,
} from '~/modules/products/loaders';
import { PaginatedProducts } from '~/modules/products/PaginatedProducts';
import { Pagination } from '~/modules/products/Pagination';

export {
  useCategoryByHandle,
  usePaginatedProductsLoader,
} from '~/modules/products/loaders';

export default component$(() => {
  const category = useCategoryByHandle();
  const paginated = usePaginatedProductsLoader();
  return (
    <>
      {!category.value ? (
        <NotFound centered={true} />
      ) : (
        <div class="flex flex-col sm:flex-row gap-10">
          <SortProducts />
          <div class="w-full">
            {category.value.parent_category && (
              <NavLink
                href={`/categories/${category.value.parent_category?.handle}`}
              >
                {category.value.parent_category?.name}
              </NavLink>
            )}

            <UiTitle size="xl" as="h1">
              {category.value.name}
            </UiTitle>

            {category.value.category_children && (
              <>
                <ul class="grid grid-cols-1 gap-2">
                  {category.value.category_children?.map((c) => (
                    <li key={c.id}>
                      <NavLink href={`/categories/${c.handle}`}>
                        {c.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <UiText>{category.value.description}</UiText>

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
  const res = event.resolveValue(useCategoryByHandle);
  return {
    title: $localize`${res?.name} category`,
  };
};
