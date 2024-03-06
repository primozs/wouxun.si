import { type Signal, Slot, component$ } from '@builder.io/qwik';
import type { Cart } from '@medusajs/client-types';

export interface PaymentWrapperProps {
  cart: Readonly<Signal<null>> | Readonly<Signal<Cart>>;
}

export const PaymentWrapper = component$<PaymentWrapperProps>(() => {
  return (
    <>
      <Slot />
    </>
  );
});
