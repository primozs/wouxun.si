import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { CheckoutSummary } from '~/modules/checkout/CheckoutSummary';
import { PaymentWrapper } from '~/modules/checkout/PaymentWrapper';
// import { useAuthSessionLoader } from '~/routes/plugin@auth';
// import { useCartLoader } from '~/routes/plugin@store';
import { UiTitle } from '~/ui/UiTitle';

export default component$(() => {
  // const cart = useCartLoader();
  // const session = useAuthSessionLoader();
  return (
    <>
      <PaymentWrapper>
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_416px] lg:gap-x-20 xl:gap-x-40">
          <div>
            <UiTitle as="h1" size="2xl" color="primary">
              {$localize`Checkout`}
            </UiTitle>
          </div>

          <CheckoutSummary />
        </div>
      </PaymentWrapper>
    </>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Checkout`,
});
