import type { Region } from '@medusajs/client-types';
import type { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import type { CalculatedVariant, ProductPreviewType } from '../medusa/types';
import { getPercentageDiff } from './getPercentageDiff';
import { formatAmount } from './prices';

export const transformProductPreview = (
  product: PricedProduct,
  region: Region,
): ProductPreviewType => {
  const variants = product.variants as unknown as CalculatedVariant[];

  let cheapestVariant = undefined;

  if (variants?.length > 0) {
    cheapestVariant = variants.reduce((acc, curr) => {
      if ((acc?.calculated_price ?? 0) > curr.calculated_price) {
        return curr;
      }
      return acc;
    }, variants[0]);
  }

  return {
    id: product.id!,
    title: product.title!,
    handle: product.handle!,
    thumbnail: product.thumbnail!,
    created_at: product.created_at,
    price: cheapestVariant
      ? {
          calculated_price: formatAmount({
            amount: cheapestVariant.calculated_price,
            region: region,
            includeTaxes: false,
          }),
          original_price: formatAmount({
            amount: cheapestVariant.original_price,
            region: region,
            includeTaxes: false,
          }),
          difference: getPercentageDiff(
            cheapestVariant.original_price,
            cheapestVariant.calculated_price,
          ),
          price_type: cheapestVariant.calculated_price_type,
        }
      : undefined,
  };
};
