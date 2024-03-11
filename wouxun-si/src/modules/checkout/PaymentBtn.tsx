import { type Signal, component$ } from '@builder.io/qwik';
import type { Cart, PaymentSession } from '@medusajs/client-types';
import { PaymentManualBtn } from './PaymentManualBtn';
import { PaymentPaypalBtn } from './paypal/PaymentPaypalBtn';
import { PaymentStripeBtn } from './stripe/PaymentStripeBtn';

export interface PaymentBtnProps {
  cart:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'>>>;
}

export const PaymentBtn = component$<PaymentBtnProps>(({ cart }) => {
  const notReady =
    !cart.value ||
    !cart.value.shipping_address ||
    !cart.value.billing_address ||
    !cart.value.email ||
    (cart.value.shipping_methods?.length ?? 0) < 1
      ? true
      : false;

  const paymentSession = cart.value?.payment_session as PaymentSession;

  return (
    <>
      {paymentSession.provider_id === 'stenar-manual' && (
        <PaymentManualBtn notReady={notReady} />
      )}
      {paymentSession.provider_id === 'paypal' && (
        <PaymentPaypalBtn notReady={notReady} cart={cart} />
      )}
      {paymentSession.provider_id === 'stripe' && (
        <PaymentStripeBtn notReady={notReady} cart={cart} />
      )}
      {!paymentSession.provider_id && <>{$localize`Select payment method`}</>}
    </>
  );
});
