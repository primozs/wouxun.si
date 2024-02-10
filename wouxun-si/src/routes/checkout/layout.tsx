import { component$, Slot } from '@builder.io/qwik';
import { Footer } from '~/layout/footer';
import { Header } from '~/layout/header';

export default component$(() => {
  return (
    <>
      <Header />
      <>
        <main class="max-w-screen-2xl mx-auto px-4 sm:px-5 w-full mb-10">
          <Slot />
        </main>
      </>
      <Footer />
    </>
  );
});
