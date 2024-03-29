import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { useCartLoader } from '../../plugin@store';
import { UiTitle } from '~/ui/UiTitle';
import { EmptyCartMessage } from '~/modules/cart/EmptyCartMessage';
import { SignInPrompt } from '~/modules/cart/SignInPrompt';
import { UiContent } from '~/ui/UiContent';
import { useIsAuthenticatedLoader } from '~/routes/plugin@auth';
import { ListCartItemsTable } from '~/modules/cart/ListCartItemsTable';
import { NavLink } from '~/ui/button';
import { getCheckoutStep } from '~/modules/common/getCheckoutStep';
import { CartTotals } from '~/modules/cart/CartTotals';
import { DiscountCode } from '~/modules/cart/DiscountCode';

export default component$(() => {
  const cart = useCartLoader();
  const authenticated = useIsAuthenticatedLoader();
  const checkout_step = useSignal<string>('none');

  useTask$(({ track }) => {
    track(cart);
    checkout_step.value = getCheckoutStep(cart.value);
  });

  return (
    <UiContent overflowYAuto={false}>
      {cart.value && (cart.value?.items?.length ?? 0) > 0 ? (
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_416px] lg:gap-x-20 xl:gap-x-40">
          <div>
            <UiTitle as="h1" size="2xl" color="primary">
              {$localize`Shopping bag`}
            </UiTitle>

            {!authenticated.value && <SignInPrompt />}

            <ListCartItemsTable
              items={cart.value?.items}
              region={cart.value?.region}
            />
          </div>

          <div class="space-y-4">
            <UiTitle as="h2" size="2xl">
              {$localize`Summary`}
            </UiTitle>

            <DiscountCode cart={cart} />

            <div class="h-px w-full border-b border-base-300 my-4" />

            <CartTotals data={cart.value} />

            <div class="h-px w-full border-b border-base-300 my-4" />

            <NavLink
              intent="button"
              color="primary"
              href={'/checkout?step=' + checkout_step.value}
              class="w-full"
            >
              {$localize`Go to checkout`}
            </NavLink>
          </div>
        </div>
      ) : (
        <EmptyCartMessage />
      )}
    </UiContent>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Cart`,
});
