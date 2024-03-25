import { type Signal, component$ } from '@builder.io/qwik';
import { mdParse } from '~/ui/md-parse';
import type { ProductDetail } from '~/modules/products/getDirectusProductData';
import type { PricedProduct } from '@medusajs/client-types';
import { UiTitle } from '~/ui/UiTitle';
import { Tags } from './Tags';
import { ProductActions } from './ProductActions';

export interface DetailsProps {
  product: Signal<{
    productDirectus: ProductDetail | null;
    productMedusa: PricedProduct | null;
  }>;
}

export const ProductDetailView = component$<DetailsProps>(({ product }) => {
  return (
    <div class="flex flex-col">
      <div class="flex flex-col gap-y-6">
        <div class="flex flex-col gap-y-2">
          {/* {product.value.productMedusa?.collection && (
            <NavLink
              href={`/collections/${product.value.productMedusa.collection.handle}`}
              color="ghost"
            >
              {product.value.productMedusa.collection.title}
            </NavLink>
          )} */}
          <UiTitle as="h1" size="2xl" color="primary">
            {product.value.productDirectus?.title}
          </UiTitle>

          {product.value.productMedusa && (
            <ProductActions
              product={product.value.productMedusa}
              productDirectus={product.value.productDirectus}
            />
          )}
        </div>

        <div class="flex flex-col gap-y-4">
          <Tags product={product.value.productDirectus} />

          <article
            class="prose"
            dangerouslySetInnerHTML={mdParse(
              product.value.productDirectus?.description,
            )}
          />
        </div>
      </div>
    </div>
  );
});
