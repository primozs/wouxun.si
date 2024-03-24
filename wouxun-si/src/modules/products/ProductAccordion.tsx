import { type Signal, component$ } from '@builder.io/qwik';
import { UiCollapse } from '~/ui/UiCollapse';
import { UiTitle } from '~/ui/UiTitle';
import type { ProductDetail } from './getDirectusProductData';
import type { PricedProduct } from '@medusajs/client-types';
import { Tags } from './Tags';
import { UiText } from '~/ui/UiText';

export interface ProductAccordionProps {
  product: Signal<{
    productDirectus: ProductDetail | null;
    productMedusa: PricedProduct | null;
  }>;
}

export const ProductAccordion = component$<ProductAccordionProps>(
  ({ product }) => {
    return (
      <>
        <UiCollapse name="product-info" icon="plus">
          <UiTitle q:slot="title">Product information</UiTitle>
          <div q:slot="content">
            <div class="grid grid-cols-2 gap-x-8">
              <div class="flex flex-col gap-y-4">
                <div>
                  <UiTitle>Material</UiTitle>
                  <UiText>
                    {product.value.productMedusa?.material
                      ? product.value.productMedusa.material
                      : '-'}
                  </UiText>
                </div>
                <div>
                  <UiTitle>Country of origin</UiTitle>
                  <UiText>
                    {product.value.productMedusa?.origin_country
                      ? product.value.productMedusa.origin_country
                      : '-'}
                  </UiText>
                </div>
                <div>
                  <UiTitle>Type</UiTitle>
                  <UiText>
                    {product.value.productMedusa?.type
                      ? product.value.productMedusa.type.value
                      : '-'}
                  </UiText>
                </div>
              </div>
              <div class="flex flex-col gap-y-4">
                <div>
                  <UiTitle>Weight</UiTitle>
                  <UiText>
                    {product.value.productMedusa?.weight
                      ? `${product.value.productMedusa.weight} g`
                      : '-'}
                  </UiText>
                </div>
                <div>
                  <UiTitle>Dimensions</UiTitle>
                  <UiText>
                    {product.value.productMedusa?.length &&
                    product.value.productMedusa?.width &&
                    product.value.productMedusa?.height
                      ? `${product.value.productMedusa.length}L x ${product.value.productMedusa.width}W x ${product.value.productMedusa.height}H`
                      : '-'}
                  </UiText>
                </div>
              </div>
            </div>
            <Tags product={product.value.productDirectus} />
          </div>
        </UiCollapse>

        <UiCollapse name="product-info" icon="plus">
          <UiTitle q:slot="title">Shipping & Returns</UiTitle>
          <div q:slot="content">Content test 2</div>
        </UiCollapse>
      </>
    );
  },
);
