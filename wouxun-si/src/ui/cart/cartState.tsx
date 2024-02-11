import {
  component$,
  createContextId,
  useContextProvider,
  useSignal,
  type Signal,
  Slot,
  useContext,
  $,
  useVisibleTask$,
} from '@builder.io/qwik';
import JSCookies from 'js-cookie';
import { config } from '~/config';
import { useAppGlobal } from '../common/appGlobalState';
import type { Cart, Region } from '@medusajs/client-types';
import { CartDialogContext } from '~/ui/cart/CartDialog';
import { getMedusaClient } from '~/services/medusa';

type TCartContext = Signal<Cart | null>;

const CartContext = createContextId<TCartContext>('cart-context');

const createCart = async (region: Region) => {
  const client = getMedusaClient();
  const { cart } = await client.carts.create({
    region_id: region.id,
    sales_channel_id: config.MEDUSA_SALES_CHANNEL_ID,
  });

  JSCookies.set('cartId', cart.id, {
    expires: new Date(Date.now() + 60 * 60 * 1000 * 356),
    path: '/',
    secure: config.PROD ?? true,
    sameSite: 'strict',
  });
  return cart as unknown as Cart;
};

export const createOrGetCart = async (region: Region | null) => {
  const cartId = JSCookies.get('cartId');

  try {
    if (!cartId) {
      if (!region) throw new Error('No region id');
      const cart = await createCart(region);
      return cart;
    } else {
      const client = getMedusaClient();
      const { cart } = await client.carts.retrieve(cartId);
      return cart as unknown as Cart;
    }
  } catch {
    return null;
  }
};

export const useCart = () => {
  const store = useAppGlobal();
  const cart = useContext(CartContext);

  const updateCart = $(async () => {
    const res = await createOrGetCart(store.region);
    cart.value = res;
  });

  return { cart, updateCart };
};

export const CartProvider = component$(() => {
  const cart = useSignal<Cart | null>(null);
  const store = useAppGlobal();
  useContextProvider(CartContext, cart);

  const dialog = useSignal<HTMLDialogElement>();
  useContextProvider(CartDialogContext, dialog);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    async () => {
      const res = await createOrGetCart(store.region);
      cart.value = res;
    },
    { strategy: 'document-idle' },
  );

  return (
    <>
      <Slot />
    </>
  );
});
