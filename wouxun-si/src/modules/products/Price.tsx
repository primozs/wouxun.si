import { type Signal, component$, useComputed$ } from '@builder.io/qwik';
import type {
  PricedProduct,
  PricedVariant,
  Region,
} from '@medusajs/client-types';
import { formatAmount } from '../common/prices';
import type { CalculatedVariant } from '../medusa/types';

export interface ProductActionsPriceProps {
  product: PricedProduct | null;
  variant: Signal<PricedVariant | undefined>;
  region: Signal<Region | null>;
}

export const ProductActionsPrice = component$<ProductActionsPriceProps>(
  ({ product, variant, region }) => {
    const selectedPrice = useComputed$(() => {
      const { cheapestPrice, variantPrice } = getProductPrice({
        product,
        variantId: variant.value?.id,
        region: region.value,
      });
      return variant.value ? variantPrice : cheapestPrice;
    });

    return (
      <div class="flex flex-col">
        <span
          class={[
            'font-semibold text-2xl ',
            {
              'text-base-content/90':
                selectedPrice.value?.price_type !== 'sale',
              'text-primary': selectedPrice.value?.price_type === 'sale',
            },
          ]}
        >
          {!variant.value && $localize`From` + ' '}
          {selectedPrice.value?.calculated_price}
        </span>
        {selectedPrice.value?.price_type === 'sale' && (
          <>
            <p>
              <span class="text-base-content/60">{$localize`Original`}: </span>
              <span class="font-medium line-through">
                {selectedPrice.value?.original_price}
              </span>
            </p>
            <span class="text-primary">
              -{selectedPrice.value?.percentage_diff}%
            </span>
          </>
        )}
      </div>
    );
  },
);

export function getProductPrice({
  product,
  variantId,
  region,
}: {
  product: PricedProduct | null;
  variantId?: string;
  region: Region | null;
}) {
  if (!product || !product.id) {
    throw new Error('No product provided');
  }

  const getPercentageDiff = (original: number, calculated: number) => {
    const diff = original - calculated;
    const decrease = (diff / original) * 100;

    return decrease.toFixed();
  };

  const cheapestPrice = () => {
    if (!product || !product.variants?.length || !region) {
      return null;
    }

    const variants = product.variants as unknown as CalculatedVariant[];

    const cheapestVariant = variants.reduce((prev, curr) => {
      return prev.calculated_price < curr.calculated_price ? prev : curr;
    });

    return {
      calculated_price: formatAmount({
        amount: cheapestVariant.calculated_price,
        region,
        includeTaxes: false,
      }),
      original_price: formatAmount({
        amount: cheapestVariant.original_price,
        region,
        includeTaxes: false,
      }),
      price_type: cheapestVariant.calculated_price_type,
      percentage_diff: getPercentageDiff(
        cheapestVariant.original_price,
        cheapestVariant.calculated_price,
      ),
    };
  };

  const variantPrice = () => {
    if (!product || !variantId || !region) {
      return null;
    }

    const variant = product.variants?.find(
      (v) => v.id === variantId || v.sku === variantId,
    ) as unknown as CalculatedVariant;

    if (!variant) {
      return null;
    }

    return {
      calculated_price: formatAmount({
        amount: variant.calculated_price,
        region,
        includeTaxes: false,
      }),
      original_price: formatAmount({
        amount: variant.original_price,
        region,
        includeTaxes: false,
      }),
      price_type: variant.calculated_price_type,
      percentage_diff: getPercentageDiff(
        variant.original_price,
        variant.calculated_price,
      ),
    };
  };

  return {
    product,
    cheapestPrice: cheapestPrice(),
    variantPrice: variantPrice(),
  };
}
