import { component$ } from '@builder.io/qwik';
import { UiPage } from '~/ui/UiPage';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Footer } from '~/modules/layout/footer';
import { Header } from '~/modules/layout/header';
import { NotFound } from '~/modules/not-found/NotFound';

export default component$(() => {
  return (
    <UiPage>
      <Header />

      <NotFound />

      <Footer />
    </UiPage>
  );
});

export const head: DocumentHead = {
  title: '404',
};
