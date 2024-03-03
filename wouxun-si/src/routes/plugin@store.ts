import { routeAction$, routeLoader$, z, zod$ } from '@builder.io/qwik-city';
import { config } from '~/config';
import { getMedusaClient, getSrvSessionHeaders } from '~/modules/medusa';
import type { RequestEvent, RequestEventLoader } from '@builder.io/qwik-city';
import { handleError } from '~/modules/logger';
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

export const useGetRegionLoader = routeLoader$(async (event) => {
  const country_code = await getCountryCode();
  const region = await getRegion(country_code, event);
  return region;
});

const getCountryCode = async () => {
  // const client = getMedusaApi();
  // const {country_code} = await client
  //   .get('ip')
  //   .json<{ ip: string; country_code: string }>();
  const country_code = config.DEFAULT_COUNTRY;
  return country_code;
};

const getRegion = async (
  country_code: string,
  event: RequestEventLoader | RequestEvent,
): Promise<Region | null> => {
  const promise = event.sharedMap.get('region');

  if (promise) {
    return promise;
  }

  const client = getMedusaClient();
  const shared = client.regions
    .list()
    .then((res) => {
      const regions = res.regions;

      const region = regions.find((item) =>
        item.countries?.find((c) => c.iso_2 === country_code),
      );
      return region ? (structuredClone(region) as unknown as Region) : null;
    })
    .catch((error) => {
      handleError(error, 'Get region');
      return null;
    });

  event.sharedMap.set('region', shared);
  return shared as unknown as Promise<Region | null>;
};
