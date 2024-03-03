import type { Cart as CartClient } from '@medusajs/client-types';

export function getCheckoutStep(
  // cart: Omit<Cart, "beforeInsert" | "beforeUpdate" | "afterUpdateOrLoad">
  cart: CartClient | null,
) {
  if (!cart) return 'none';

  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return 'address';
    // @ts-ignore
  } else if (cart?.shipping_methods.length === 0) {
    return 'delivery';
  } else {
    return 'payment';
  }
}
