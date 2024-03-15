import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import type { ProductCategory } from '@medusajs/client-types';
import { handleError } from '~/modules/logger';
import { getMedusaClient, getSrvSessionHeaders } from '~/modules/medusa';
import { NotFound } from '~/modules/not-found/NotFound';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';

export type ProductCategoryWithChildren = Omit<
  ProductCategory,
  'category_children'
> & {
  category_children: ProductCategory[];
  category_parent?: ProductCategory;
};

export const useCategoryByHandle = routeLoader$(async (event) => {
  const client = getMedusaClient();

  const handle = event.params.handle;

  if (!handle) {
    event.status(404);
    return null;
  }

  const category = await client.productCategories
    .list(
      {
        handle: handle,
      },
      getSrvSessionHeaders(event),
    )
    .then(({ product_categories: { [0]: category } }) => category)
    .catch((err) => {
      handleError(err);
      return null;
    });
  if (!category) event.status(404);
  return category as ProductCategory | null;
});

export default component$(() => {
  const category = useCategoryByHandle();
  return (
    <>
      {!category.value ? (
        <NotFound centered={true} />
      ) : (
        <div>
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
                    <NavLink href={`/categories/${c.handle}`}>{c.name}</NavLink>
                  </li>
                ))}
              </ul>
            </>
          )}
          <UiText>{category.value.description}</UiText>
        </div>
      )}
    </>
  );
});
