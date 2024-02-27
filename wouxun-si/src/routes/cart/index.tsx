import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { useCartLoader } from '../plugin@store';
import { CartList } from '~/modules/cart/CartList';
import { Header } from '~/modules/layout/header';
import { PageContainer } from '~/modules/layout/PageContainer';
import { UiTitle } from '~/ui/UiTitle';
import { Footer } from '~/modules/layout/footer';

export default component$(() => {
  const cart = useCartLoader();
  return (
    <>
      <Header />
      <PageContainer>
        <UiTitle as="h1" size="2xl" color="primary">
          {$localize`Cart`}
        </UiTitle>

        <CartList cart={cart} />
      </PageContainer>
      <Footer />
    </>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Cart`,
});
