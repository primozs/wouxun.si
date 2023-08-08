import { component$, Slot } from '@builder.io/qwik';
import { Footer } from '~/layout/footer';
import { Header } from '~/layout/header';
import OstaliModeli from '~/content/ostaliModeli.mdx';
import { ProductListAside } from '~/ui/products/ProductListAside';

export const LayoutSidebar = component$(() => {
  return (
    <>
      <Header />
      <div>
        <div class="max-w-screen-2xl mx-auto px-4 sm:px-5 flex flex-col sm:flex-row sm:gap-5">
          <aside class="prose sm:max-w-xs shrink-0 bg-neutral-50 rounded-xl p-3 mb-10 mt-2">
            <ProductListAside />
            <OstaliModeli />
          </aside>
          <main class="prose flex-grow mb-10 mt-2 order-first sm:order-2">
            <Slot />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
});
