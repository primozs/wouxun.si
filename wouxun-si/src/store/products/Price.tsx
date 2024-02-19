import { component$ } from '@builder.io/qwik';
import { formatPrice } from '~/store/common/formatPrice';
import type { PricedProduct, MoneyAmount } from '@medusajs/client-types';
import { useAppGlobal } from '../../store/common/AppGlobalProvider';

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
  const store = useAppGlobal();
  const variantPrice = getVariantPrice(product, 0);
  if (!variantPrice) return null;

  return (
    <div class="flex items-end gap-x-3">
      <div>
        <p class="font-semibold text-xl text-base-content/90">
          {formatPrice(variantPrice.calculatedPrice, {
            currency: variantPrice.currency_code,
            locale: store.locale,
          })}
        </p>
      </div>
      {variantPrice.hasDiff && variantPrice.originalPrice !== undefined && (
        <div>
          <p class="font-medium line-through text-[18px,28px] text-base-content/90">
            {formatPrice(variantPrice.originalPrice, {
              currency: variantPrice.currency_code,
              locale: store.locale,
            })}
          </p>
        </div>
      )}
    </div>
  );
});

export interface CardPriceProps {
  product: PricedProduct | null;
}

export const CardPrice = component$<CardPriceProps>(({ product }) => {
  const store = useAppGlobal();
  const variantPrice = getVariantPrice(product, 0);
  if (!variantPrice) return null;

  return (
    <div class="flex flex-col h-full justify-between items-end">
      <div>
        {formatPrice(variantPrice.calculatedPrice, {
          currency: variantPrice.currency_code,
          locale: store.locale,
        })}
      </div>
      {variantPrice.hasDiff && variantPrice.originalPrice !== undefined && (
        <div class="text-xs line-through text-base-content/90">
          {formatPrice(variantPrice.originalPrice, {
            currency: variantPrice.currency_code,
            locale: store.locale,
          })}
        </div>
      )}
    </div>
  );
});

type ListPriceProps = {
  amount: number;
  currency?: string;
  class?: string;
};

const ListPrice = component$(
  ({ amount, currency = 'usd', ...props }: ListPriceProps) => {
    const store = useAppGlobal();
    return (
      <p {...props}>
        {formatPrice(amount, {
          currency: currency,
          locale: store.locale,
        })}
      </p>
    );
  },
);

export default ListPrice;
