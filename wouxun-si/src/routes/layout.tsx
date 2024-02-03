import { component$, Slot } from '@builder.io/qwik';
import { type RequestHandler, routeLoader$ } from '@builder.io/qwik-city';
import { getProductList } from '~/services/products/getDirectusProductData';
import { getBanners } from '~/services/banners/getBannersData';
import { getMedusaApi } from '~/services/medusa';
import { srvSetLocale, getUserLocaleSrv } from '~/ui/common/srvGetLocale';
import { config } from '~/config';
import { getRegion } from '~/services/medusa/getRegions';

export const onGet: RequestHandler = async (reqEvent) => {
  reqEvent.cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
  srvSetLocale(reqEvent);
};

export const useProducts = routeLoader$(async (event) => {
  const locale = getUserLocaleSrv(event);
  const res = await getProductList(locale);
  return res;
});

export const useBannersData = routeLoader$(async () => {
  const banners = await getBanners();
  return banners;
});

export const useGetRegion = routeLoader$(async () => {
  const country_code = config.DEFAULT_COUNTRY;
  const region = await getRegion(country_code);
  return region;
});

export const useGetCountryAndIP = routeLoader$(async () => {
  const client = getMedusaApi();
  const result = await client
    .get('ip')
    .json<{ ip: string; country_code: string }>();

  return {
    ip: result.ip,
    country: result.country_code,
  };
});

export default component$(() => {
  return <Slot />;
});
