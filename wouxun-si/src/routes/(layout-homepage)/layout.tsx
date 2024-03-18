import { component$, Slot } from '@builder.io/qwik';
import { Footer } from '~/modules/layout/footer';
import { Header } from '~/modules/layout/header';
import { PageContainer } from '~/modules/layout/PageContainer';
import { Hero } from '~/modules/layout/hero/Hero';

export { usePaginatedProductsLoader } from '~/modules/products/loaders';

export default component$(() => {
  return (
    <>
      <Header />
      <Hero />

      <PageContainer>
        <Slot />
      </PageContainer>

      <Footer />
    </>
  );
});

// import { routeLoader$ } from '@builder.io/qwik-city';
// import { readItems } from '@directus/sdk';
// import { getDirectusClient } from '~/modules/directus';
// import { handleError } from '~/modules/logger';

// export type BannersData = {
//   id: string;
//   title: string;
//   subtitle: string | null;
//   image: string | null;
//   style: string | null;
// };

// export const getBanners = async (): Promise<BannersData[]> => {
//   try {
//     const directus = getDirectusClient();
//     const result = await directus.request(
//       readItems('wouxun_banner', {
//         fields: ['*'],
//         filter: {
//           status: {
//             _eq: 'published',
//           },
//         },
//       }),
//     );
//     return result;
//   } catch (error: any) {
//     handleError(error, 'Get banners error');
//     return [];
//   }
// };

// export const useBannersData = routeLoader$(async () => {
//   const banners = await getBanners();
//   return banners;
// });
