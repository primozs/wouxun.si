import {
  type NoSerialize,
  type Signal,
  Slot,
  component$,
  createContextId,
  noSerialize,
  useComputed$,
  useContext,
  useContextProvider,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import type { Cart, PaymentSession } from '@medusajs/client-types';
import {
  type Stripe,
  type StripeElementsOptionsClientSecret,
  type StripeElements,
  loadStripe,
} from '@stripe/stripe-js';
import { config } from '~/config';
import { handleError } from '~/modules/logger';

type ContextType = {
  stripe: Signal<NoSerialize<Stripe>>;
  elements: Signal<NoSerialize<StripeElements>>;
};

const Context = createContextId<ContextType>('stripe');

export const useStripe = () => {
  const ctx = useContext(Context);
  return ctx;
};

export const useStripeProvider = (
  cart:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'>>>,
  error: Signal<string | null>,
) => {
  const stripeKey = config.STRIPE_KEY;
  const paymentSession = useComputed$(() => {
    const session = cart.value?.payment_session as PaymentSession;
    return session;
  });
  const stripe = useSignal<NoSerialize<Stripe>>();
  const elements = useSignal<NoSerialize<StripeElements>>();

  useContextProvider<ContextType>(Context, { stripe, elements });

  const options: StripeElementsOptionsClientSecret = {
    clientSecret: paymentSession.value?.data?.client_secret as
      | string
      | undefined,
    appearance: {
      theme: 'night',
    },
  };

  if (!stripeKey) {
    error.value = $localize`Stripe key is missing.`;
    return;
  }

  if (!paymentSession.value?.data?.client_secret) {
    error.value = $localize`Stripe client secret is missing. Cannot initialize Stripe.`;
    return;
  }

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    const _stripe = await loadStripe(stripeKey).catch((err) => {
      handleError(err);
      error.value = $localize`Stripe load error`;
      return undefined;
    });

    stripe.value = noSerialize(_stripe ?? undefined);
    const _elements = stripe.value?.elements(options);

    elements.value = noSerialize(_elements);
  });
};

type StripeProviderProps = {
  cart:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'>>>;
  error: Signal<string | null>;
};

export const StripeProvider = component$<StripeProviderProps>(
  ({ cart, error }) => {
    useStripeProvider(cart, error);
    return (
      <>
        <Slot />
      </>
    );
  },
);
