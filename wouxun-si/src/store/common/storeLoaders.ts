import { getMedusaApi } from '~/services/medusa';
import { config } from '~/config';
import { getRegion } from '~/services/medusa/getRegions';
import { getProductList } from '~/services/products/getDirectusProductData';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getUserLocaleSrv } from '~/store/common/srvGetLocale';

export const useProducts = routeLoader$(async (event) => {
  const locale = getUserLocaleSrv(event);
  const res = await getProductList(locale);
  return res;
});

export const useGetRegion = routeLoader$(async () => {
  const country_code = config.DEFAULT_COUNTRY;
  const region = await getRegion(country_code);
  return region;
});

export const useGetCountryIPLoader = routeLoader$(async () => {
  const client = getMedusaApi();
  const result = await client
    .get('ip')
    .json<{ ip: string; country_code: string }>();

  return {
    ip: result.ip,
    country: result.country_code,
  };
});
