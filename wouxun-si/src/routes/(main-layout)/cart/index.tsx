import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { useCartLoader } from '../../plugin@store';
import { CartList } from '~/modules/cart/CartList';
import { UiTitle } from '~/ui/UiTitle';

export default component$(() => {
  const cart = useCartLoader();
  return (
    <>
      <UiTitle as="h1" size="2xl" color="primary">
        {$localize`Cart`}
      </UiTitle>

      <CartList cart={cart} />
    </>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Cart`,
});
