import { component$, Slot } from '@builder.io/qwik';
import { Footer } from '~/routes/(layout)/footer';
import { Header } from '~/routes/(layout)/header';

export default component$(() => {
  return (
    <>
      <Header />
      <div>
        <div class="max-w-screen-2xl mx-auto px-4 sm:px-5 flex flex-col sm:flex-row sm:gap-5 my-5">
          <main class="prose flex-grow order-first sm:order-2">
            <Slot />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
});
