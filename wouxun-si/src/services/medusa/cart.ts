import type { Cart } from '@medusajs/client-types';
import { getMedusaClient } from '.';

export async function createCart(regionId: string) {
  const client = getMedusaClient();
  const res = await client.carts.create({ region_id: regionId });
  return res.cart as unknown as Cart;
}

export async function getCart(cartId: string) {
  const client = getMedusaClient();
  const res = await client.carts.retrieve(cartId);
  return res.cart as unknown as Cart;
}
