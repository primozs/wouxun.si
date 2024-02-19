import { component$, Slot } from '@builder.io/qwik';
import { Footer } from '~/modules/layout/footer';
import { Header } from '~/modules/layout/header';
import OstaliModeli from '~/content/ostaliModeli.mdx';
import { ProductListAside } from '~/store/products/ProductListAside';

export const LayoutSidebar = component$(() => {
  return (
    <>
      <Header />
      <div>
        <div class="max-w-screen-2xl mx-auto px-4 sm:px-5 flex flex-col sm:flex-row sm:gap-5">
          <aside class="prose sm:max-w-xs shrink-0 bg-base-200 rounded-xl p-3 mb-10 mt-2">
            <ProductListAside />
            <OstaliModeli />
          </aside>
          <main class="flex-grow mb-10 mt-2 order-first sm:order-2">
            <Slot />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
});
