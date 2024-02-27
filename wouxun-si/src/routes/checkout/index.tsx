import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import { PageContainer } from '~/modules/layout/PageContainer';
import { Footer } from '~/modules/layout/footer';
import { Header } from '~/modules/layout/header';
import { UiTitle } from '~/ui/UiTitle';

export default component$(() => {
  return (
    <>
      <Header />
      <PageContainer>
        <UiTitle as="h1" size="2xl" color="primary">
          {$localize`Checkout`}
        </UiTitle>
      </PageContainer>
      <Footer />
    </>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Checkout`,
});
