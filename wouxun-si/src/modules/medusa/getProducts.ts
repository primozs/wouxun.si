import type { PricedProduct } from '@medusajs/client-types';
import { getMedusaClient } from '.';

export const getProduct = async (
  handle: string | undefined,
  region_id?: string,
) => {
  if (!handle) return null;

  const client = getMedusaClient();
  const product = await client.products
    .list({
      handle,
      expand: 'variants,variants.prices',
      region_id: region_id ?? undefined,
    })
    .then((res) => res.products[0]);

  if (!product) {
    throw new Error(`Product with handle ${handle} not found`);
  }

  return product as unknown as PricedProduct;
};
