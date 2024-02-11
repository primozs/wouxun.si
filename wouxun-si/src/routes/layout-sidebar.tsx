import { component$, Slot } from '@builder.io/qwik';
import { type RequestHandler } from '@builder.io/qwik-city';
import { srvSetLocale } from '~/store/common/srvGetLocale';
import { Footer } from '~/routes/(layout)/footer';
import { Header } from '~/routes/(layout)/header';
import OstaliModeli from '~/content/ostaliModeli.mdx';
import { ProductListAside } from '~/store/products/ProductListAside';

export { useGetRegion } from '~/store/common/AppGlobalProvider';
export { useProducts } from '~/store/products/ProductListAside';

export const onGet: RequestHandler = async (reqEvent) => {
  reqEvent.cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
  srvSetLocale(reqEvent);
};

export default component$(() => {
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
