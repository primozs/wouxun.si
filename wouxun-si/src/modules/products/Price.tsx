import { component$ } from '@builder.io/qwik';
import { formatPrice } from '~/modules/common/formatPrice';
import type { PricedProduct, MoneyAmount } from '@medusajs/client-types';
import { useLocale } from '../locale/LocaleProvider';

export interface ProductPriceProps {
  product: PricedProduct | null;
}

const getVariantPrice = (product: PricedProduct | null, variantIndex = 0) => {
  if (!product) return null;
  if (!product.variants) return null;

  const variant = product.variants[variantIndex];
  if (!variant) return null;

  const calculatedPrice = variant.calculated_price_incl_tax ?? 0;
  const originalPrice = variant.original_price_incl_tax;
  const hasDiff = originalPrice && calculatedPrice !== originalPrice;

  let moneyAmount: MoneyAmount | undefined;
  const prices = variant.prices;
  if (prices) {
    moneyAmount = prices[0];
  }
  const currency_code = moneyAmount?.currency_code ?? '';

  return {
    calculatedPrice,
    originalPrice,
    hasDiff,
    currency_code,
  };
};

export const ProductPrice = component$<ProductPriceProps>(({ product }) => {
  const locale = useLocale();

  const variantPrice = getVariantPrice(product, 0);
  if (!variantPrice) return null;

  return (
    <div class="flex items-end gap-x-3">
      <div>
        <p class="font-semibold text-xl text-base-content/90">
          {formatPrice(variantPrice.calculatedPrice, {
            currency: variantPrice.currency_code,
            locale: locale.value,
          })}
        </p>
      </div>
      {variantPrice.hasDiff && variantPrice.originalPrice !== undefined && (
        <div>
          <p class="font-medium line-through text-[18px,28px] text-base-content/90">
            {formatPrice(variantPrice.originalPrice, {
              currency: variantPrice.currency_code,
              locale: locale.value,
            })}
          </p>
        </div>
      )}
    </div>
  );
});
