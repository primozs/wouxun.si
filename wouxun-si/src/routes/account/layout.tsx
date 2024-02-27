import { component$, Slot } from '@builder.io/qwik';
import { PageContainer } from '~/modules/layout/PageContainer';
import { Footer } from '~/modules/layout/footer';
import { Header } from '~/modules/layout/header';

export default component$(() => {
  return (
    <>
      <Header />
      <PageContainer>
        <Slot />
      </PageContainer>
      <Footer />
    </>
  );
});
