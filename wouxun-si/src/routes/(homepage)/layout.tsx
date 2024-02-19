import { component$, Slot } from '@builder.io/qwik';
import { Footer } from '~/modules/layout/footer';
import { Header } from '~/modules/layout/header';
import { Carousel } from '~/modules/layout/hero';
// import OstaliModeli from '~/content/ostaliModeli.mdx';
// import { ProductListAside } from '~/store/products/ProductListAside';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getBanners } from '~/services/banners/getBannersData';

export const useBannersData = routeLoader$(async () => {
  const banners = await getBanners();
  return banners;
});

export default component$(() => {
  const banners = useBannersData();
  return (
    <>
      <Header />

      <div class="min-w-0">
        <Carousel banners={banners} />
      </div>

      <div>
        <div class="max-w-screen-2xl mx-auto px-4 sm:px-5 flex flex-col sm:flex-row sm:gap-5 my-5">
          {/* <aside class="prose sm:max-w-xs shrink-0 bg-base-200 rounded-xl p-3">
            <ProductListAside />
            <OstaliModeli />
          </aside> */}
          <main class="flex-grow order-first sm:order-2">
            <Slot />
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
});
