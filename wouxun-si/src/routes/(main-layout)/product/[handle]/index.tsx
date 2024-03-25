import { component$, useComputed$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { PaginatedProducts } from '~/modules/products/PaginatedProducts';
import { ProductActions } from '~/modules/products/ProductActions';
import { ProductDetailView } from '~/modules/products/ProductDetail';
import {
  ProductGallery,
  ProductMainImage,
} from '~/modules/products/ProductDetailImage';
import {
  useGetProductByHandle,
  useRelatedProductsLoader,
} from '~/modules/products/loaders';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';

export {
  useGetProductByHandle,
  useRelatedProductsLoader,
} from '~/modules/products/loaders';

export default component$(() => {
  const product = useGetProductByHandle();
  const related = useRelatedProductsLoader();
  const relatedProducts = useComputed$(() => {
    const tmp = related.value.products.filter(
      (item) => item.id !== product.value.productMedusa?.id,
    );
    return tmp.length === 4 ? tmp : tmp.slice(0, 4);
  });

  return (
    <section>
      <div class="grid grid-cols-1 gap-x-8 gap-y-10  lg:grid-cols-3">
        <div id="product-image" class="lg:order-2">
          <ProductMainImage
            image={product.value?.productDirectus?.thumbnail ?? ''}
            productTitle={product.value?.productDirectus?.title ?? ''}
          />
          <ProductGallery
            images={
              product.value?.productDirectus?.media ?? ([] as readonly string[])
            }
            productTitle={product.value?.productDirectus?.title ?? ''}
          />
        </div>
        <div class="w-full lg:order-1">
          <ProductDetailView product={product} />
        </div>

        <div class="lg:order-3">
          {product.value.productMedusa && (
            <ProductActions
              product={product.value.productMedusa}
              productDirectus={product.value.productDirectus}
            />
          )}
        </div>
      </div>

      {relatedProducts.value.length > 0 && (
        <>
          <div class="flex flex-col my-16">
            <UiTitle size="lg">{$localize`Related products`}</UiTitle>
            <UiText color="light">
              {$localize`You might also want to check out these products.`}
            </UiText>
          </div>
          <PaginatedProducts products={relatedProducts.value} />
        </>
      )}
    </section>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useGetProductByHandle);

  return {
    title: `${data?.productDirectus?.title}`,
    meta: [
      {
        name: 'description',
        content:
          (data?.productDirectus?.description?.slice(0, 140) ?? '') + '...',
      },
      {
        name: 'id',
        content: data?.productDirectus?.id,
      },
      {
        property: 'og:image',
        content: data?.thumbnail ?? '',
      },
    ],
  };
};
