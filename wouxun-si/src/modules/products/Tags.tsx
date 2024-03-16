import { component$ } from '@builder.io/qwik';
import { Tag } from '~/ui/tag';
import type { ProductDetail } from '~/modules/products/getDirectusProductData';
// import { ProductCategory, ProductTag } from '@medusajs/client-types';

export interface TagsProps {
  product: ProductDetail;
  // tags?: ProductTag[];
  // categories?: ProductCategory[];
}

export const Tags = component$<TagsProps>(({ product }) => {
  if (!product) return null;
  const tags = product.tags;
  const categories = product.categories;
  if (!tags || tags.length === 0) {
    return null;
  }
  return (
    <div class="flex items-center flex-wrap gap-1.5">
      {tags.map((tag) => {
        if (!tag) return null;
        return <Tag key={tag.id}>{tag.value}</Tag>;
      })}

      {categories &&
        categories.map((category) => {
          if (!category) return null;
          return <Tag key={category.id}>{category?.value}</Tag>;
        })}
    </div>
  );
});
