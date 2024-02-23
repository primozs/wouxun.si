import {
  type RequestHandler,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from '@builder.io/qwik-city';
import { config } from '~/config';
import {
  getMedusaApi,
  getMedusaClient,
  getSrvSessionHeaders,
} from '~/modules/medusa';
import { getRegion } from '~/modules/medusa/getRegions';
import { getProductList } from '~/modules/products/getDirectusProductData';
import { getUserLocaleSrv } from '~/modules/common/srvGetLocale';
import type { Cart, Region } from '@medusajs/client-types';

export const useSetCartItemQuantityAction = routeAction$(
  async (data, event) => {
    const cartId = event.cookie.get('cartid');

    if (!cartId || !cartId.value) {
      return event.fail(500, {
        message: 'Cart not found',
      });
    }

    const client = getMedusaClient();
    await client.carts.lineItems.update(cartId.value, data.itemId, {
      quantity: data.quantity,
    });
  },

  zod$({
    itemId: z.string(),
    quantity: z.number(),
  }),
);

export const useRemoveCartItemAction = routeAction$(
  async (data, event) => {
    const cartId = event.cookie.get('cartid');

    if (!cartId || !cartId.value) {
      return event.fail(500, {
        message: 'Cart not found',
      });
    }

    const client = getMedusaClient();
    await client.carts.lineItems.delete(cartId.value, data.itemId);

    return {
      success: true,
    };
  },
  zod$({
    itemId: z.string(),
  }),
);

export const useAddToCartAction = routeAction$(
  async (data, event) => {
    const cartId = event.cookie.get('cartid');

    if (!cartId || !cartId.value) {
      return event.fail(500, {
        message: 'Product not added',
      });
    }

    const client = getMedusaClient();
    const lineItem = {
      variant_id: data.variantId,
      quantity: 1,
      metadata: {
        externalId: data.directusId,
        thumbnailId: data.thumbnailId,
      },
    };
    const result = await client.carts.lineItems.create(cartId.value, lineItem);
    const isError = result.response.status !== 200;
    if (isError) {
      return event.fail(500, {
        message: 'Product not added',
      });
    }

    return {
      success: true,
      cartId: result.cart.id,
    };
  },
  zod$({
    variantId: z.string(),
    directusId: z.string(),
    thumbnailId: z.string(),
  }),
);

export const useDeleteShippingAddressAction = routeAction$(
  async (data, event) => {
    try {
      const client = getMedusaClient();
      await client.customers.addresses.deleteAddress(
        data.addressId,
        getSrvSessionHeaders(event),
      );
    } catch (error) {
      return event.fail(500, {
        message: 'unknown',
      });
    }
    return {
      status: 'success',
      message: 'Address deleted',
      data: { addressId: data.addressId },
    };
  },
  zod$({
    addressId: z.string(),
  }),
);

export const useCartLoader = routeLoader$(async (event) => {
  const cartId = event.cookie.get('cartid');
  const region = await event.resolveValue(useGetRegionLoader);
  const client = getMedusaClient();

  if (!region) return null;

  try {
    if (!cartId?.value) {
      const { cart } = await client.carts.create({
        region_id: region.id,
        sales_channel_id: config.MEDUSA_SALES_CHANNEL_ID,
      });
      event.cookie.set('cartid', cart.id, {
        expires: new Date(Date.now() + 60 * 60 * 1000 * 356),
        path: '/',
        secure: true,
        sameSite: 'Strict',
        httpOnly: true,
      });

      return cart as unknown as Cart;
    } else {
      const { cart } = await client.carts.retrieve(cartId.value);
      return cart as unknown as Cart;
    }
  } catch (error) {
    return null;
  }
});

export const useProductsLoader = routeLoader$(async (event) => {
  const locale = getUserLocaleSrv(event);
  const res = await getProductList(locale);
  return res;
});

export const useGetRegionLoader = routeLoader$(async (event) => {
  // server
  let region = (await event.sharedMap.get('region')) as Region | null;
  // client
  if (!region) {
    const country_code = config.DEFAULT_COUNTRY;
    region = await getRegion(country_code, event);
  }
  return region;
});

export const useGetCountryIPLoader = routeLoader$(async () => {
  const client = getMedusaApi();
  const result = await client
    .get('ip')
    .json<{ ip: string; country_code: string }>();

  return {
    ip: result.ip,
    country: result.country_code,
  };
});

export const onGet: RequestHandler = async (event) => {
  const country_code = config.DEFAULT_COUNTRY;
  await getRegion(country_code, event);
};
