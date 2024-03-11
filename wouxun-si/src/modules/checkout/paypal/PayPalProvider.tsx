import {
  type Signal,
  useVisibleTask$,
  createContextId,
  useSignal,
  useContextProvider,
  useContext,
  type NoSerialize,
  noSerialize,
} from '@builder.io/qwik';
import { loadScript, type PayPalNamespace } from '@paypal/paypal-js';
import { config } from '~/config';
import type { Cart } from '@medusajs/client-types';
import { handleError } from '~/modules/logger';

type PaymentPaypalProviderProps = {
  cart:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'>>>;
};

type ContextType = Signal<NoSerialize<PayPalNamespace>>;

const Context = createContextId<ContextType>('paypal');

export const usePaypal = () => {
  const paypal = useContext(Context);
  return { paypal };
};

export const usePaypalProvider = (
  cart: PaymentPaypalProviderProps['cart'],
  error: Signal<string | null>,
) => {
  const paypal = useSignal<NoSerialize<PayPalNamespace>>();
  useContextProvider<ContextType>(Context, paypal);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track }) => {
    track(cart);

    loadScript({
      // "client-id": "test",
      // @ts-ignore
      'client-id': config.PAYPAL_CLIENT_ID,
      clientId: config.PAYPAL_CLIENT_ID,
      currency: cart.value?.region?.currency_code?.toUpperCase(),
      intent: 'authorize',
      components: 'buttons',
    })
      .then((_paypal) => {
        paypal.value = noSerialize(_paypal ?? undefined);
      })
      .catch((err) => {
        handleError(err);
        error.value = $localize`PayPal loadScript error`;
        paypal.value = undefined;
      });
  });
};
