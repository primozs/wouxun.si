import { routeLoader$ } from '@builder.io/qwik-city';
import { getProductList } from './getDirectusProductData';

export type ProductListProducts = ReturnType<typeof useProductsLoader>;

// eslint-disable-next-line qwik/loader-location
export const useProductsLoader = routeLoader$(async (event) => {
  const locale = event.locale();
  const res = await getProductList(locale);
  return res;
});
