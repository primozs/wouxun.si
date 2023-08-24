import {
  Resource,
  component$,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik/build';
import { Button } from '../button';
import JSCookies from 'js-cookie';
import { config } from '~/config';
import type { Cart } from '@medusajs/client-types';
import { createCart, getCart } from '~/services/medusa/cart';
import { useAppGlobal } from '../common/appGlobalState';
import { LoadingDots } from '../loading-dots';
import { ShoppingBagIcon2 } from '../icons/shopping-bag-icon2';
import { XCircle } from '../icons/x-circle';
import { CartDialog } from './CartDialog';

export interface CartButtonProps {}

export const CartButton = component$<CartButtonProps>(() => {
  const cartIsOpen = useSignal(false);
  const cart = useSignal<Cart | null | Promise<never>>(null);
  const store = useAppGlobal();

  useVisibleTask$(
    async () => {
      if (isBrowser) {
        const cartId = JSCookies.get('cartId');
        if (!cartId) {
          if (!store.region) throw new Error('No region id');
          cart.value = await createCart(store.region.id);

          JSCookies.set('cartId', cart.value.id, {
            expires: new Date(Date.now() + 60 * 60 * 1000 * 356),
            path: '/',
            secure: config.PROD ?? true,
            sameSite: 'strict',
          });
        } else {
          cart.value = await getCart(cartId);
        }
      }
    },
    { strategy: 'document-idle' },
  );

  return (
    <Resource
      value={cart}
      onResolved={(cart) => {
        return (
          <>
            <CartDialog>
              <pre q:slot="dialog">{JSON.stringify(cart, null, 2)}</pre>

              <Button
                intent="icon"
                type="button"
                aria-label="Odpri voziček"
                onClick$={() => {
                  cartIsOpen.value = true;
                }}
              >
                <ShoppingBagIcon2 isEmpty={!cart?.items?.length} />
              </Button>
            </CartDialog>
          </>
        );
      }}
      onPending={() => {
        return <LoadingDots class="bg-neutral-600 dark:bg-neutral-400" />;
      }}
      onRejected={() => {
        return <XCircle class="h-5 w-5 text-error-400" />;
      }}
    />
  );
});
