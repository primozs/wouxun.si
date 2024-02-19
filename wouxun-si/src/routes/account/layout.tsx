import { component$, Slot } from '@builder.io/qwik';
import { Footer } from '~/modules/layout/footer';
import { Header } from '~/modules/layout/header';

export default component$(() => {
  return (
    <>
      <Header />
      <main class="content-container flex flex-1 flex-col my-5">
        <Slot />
      </main>
      <Footer />
    </>
  );
});
