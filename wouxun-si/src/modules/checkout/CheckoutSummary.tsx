import { component$ } from '@builder.io/qwik';
import { UiTitle } from '~/ui/UiTitle';
import { CartTotals } from '../cart/CartTotals';
import { ListCartItemsPreviewTable } from '../cart/ListCartItemsTable';
import { DiscountCode } from '../cart/DiscountCode';
import { useCartLoader } from '~/routes/plugin@store';

export interface CheckoutSummaryProps {}

export const CheckoutSummary = component$<CheckoutSummaryProps>(() => {
  const cart = useCartLoader();
  return (
    <div>
      {cart.value && (
        <>
          <UiTitle as="h2" size="2xl">
            {$localize`In your cart`}
          </UiTitle>

          <div class="h-px w-full border-b border-base-300 my-4" />

          <CartTotals data={cart.value} />

          <div class="h-px w-full border-b border-base-300 my-4" />

          {/* <UiContent classContainer="max-h-[320px]" class="py-0 space-y-2"> */}
          <ListCartItemsPreviewTable
            items={cart.value.items}
            region={cart.value.region}
          />
          {/* </UiContent> */}

          <div class="h-px w-full border-b border-base-300 my-4" />

          <div class="my-3">
            <DiscountCode cart={cart} />
          </div>
        </>
      )}
    </div>
  );
});
