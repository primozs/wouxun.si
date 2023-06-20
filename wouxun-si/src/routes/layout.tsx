import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getProductList } from '~/services/products/getDirectusProductData';
import { getBanners } from '~/services/banners/getBannersData';

export const useProducts = routeLoader$(async () => {
  const res = await getProductList('sl');
  return res;
});

export const useBannersData = routeLoader$(async () => {
  const banners = await getBanners();
  return banners;
});

export default component$(() => {
  return <Slot />;
});
