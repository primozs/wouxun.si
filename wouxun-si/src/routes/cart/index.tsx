import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { useCartLoader } from '../plugin@store';
import { CartList } from '~/modules/cart/CartList';

export default component$(() => {
  const cart = useCartLoader();
  return (
    <>
      <CartList cart={cart} />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Nakupovalna košarica',
};
