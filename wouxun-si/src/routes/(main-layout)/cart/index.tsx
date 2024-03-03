import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { useCartLoader } from '../../plugin@store';
import { UiTitle } from '~/ui/UiTitle';
import { EmptyCartMessage } from '~/modules/cart/EmptyCartMessage';
import { SignInPrompt } from '~/modules/cart/SignInPrompt';
import { UiContent } from '~/ui/UiContent';
import { useAuthSessionLoader } from '~/routes/plugin@auth';
import { ListCartItemsTable } from '~/modules/cart/ListCartItemsTable';

export default component$(() => {
  const cart = useCartLoader();
  const session = useAuthSessionLoader();
  return (
    <UiContent>
      {cart.value?.items?.length ?? 0 > 0 ? (
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-x-20">
          <div>
            <UiTitle as="h1" size="2xl" color="primary">
              {$localize`Cart`}
            </UiTitle>

            {!session.value && <SignInPrompt />}

            <ListCartItemsTable
              items={cart.value?.items}
              region={cart.value?.region}
            />
          </div>
          <div class="bg-base-300">
            <UiTitle as="h2" size="xl">
              {$localize`Summary`}
            </UiTitle>
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
