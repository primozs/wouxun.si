import { component$, Slot } from '@builder.io/qwik';
import { Footer } from '~/modules/layout/footer';
import { Header } from '~/modules/layout/header';
import { Carousel } from '~/modules/layout/hero';
// import OstaliModeli from '~/content/ostaliModeli.mdx';
// import { ProductListAside } from '~/modules/products/ProductListAside';
import { routeLoader$ } from '@builder.io/qwik-city';
import { readItems } from '@directus/sdk';
import { getDirectusClient } from '~/modules/directus';
import { handleError } from '~/modules/logger';

export type BannersData = {
  id: string;
  title: string;
  subtitle: string | null;
  image: string | null;
  style: string | null;
};

export const getBanners = async (): Promise<BannersData[]> => {
  try {
    const directus = getDirectusClient();
    const result = await directus.request(
      readItems('wouxun_banner', {
        fields: ['*'],
        filter: {
          status: {
            _eq: 'published',
          },
        },
      }),
    );
    return result;
  } catch (error: any) {
    handleError(error, 'Get active banners');
    return [];
  }
};

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
