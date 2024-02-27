import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { PageContainer } from '~/modules/layout/PageContainer';
import { Footer } from '~/modules/layout/footer';
import { Header } from '~/modules/layout/header';
import { ProductList } from '~/modules/products/ProductList';
import { useProductsLoader } from '~/modules/products/loaders';
import { UiTitle } from '~/ui/UiTitle';

export { useProductsLoader } from '~/modules/products/loaders';

export default component$(() => {
  const products = useProductsLoader();
  return (
    <>
      <Header />
      <PageContainer>
        <UiTitle as="h1" size="2xl" color="primary">
          {$localize`Products`}
        </UiTitle>

        <ProductList products={products} />
      </PageContainer>
      <Footer />
    </>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Products`,
});
