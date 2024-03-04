import { Slot, component$ } from '@builder.io/qwik';

export interface PaymentWrapperProps {}

export const PaymentWrapper = component$<PaymentWrapperProps>(() => {
  return (
    <>
      <Slot />
    </>
  );
});
