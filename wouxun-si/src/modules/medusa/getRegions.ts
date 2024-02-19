import { handleError } from '../logger';
import { getMedusaClient } from '.';
import type { Region } from '@medusajs/medusa';
import type { RequestEvent, RequestEventLoader } from '@builder.io/qwik-city';

export const getRegion = async (
  country_code: string,
  event: RequestEventLoader | RequestEvent,
) => {
  const promise = event.sharedMap.get('region');

  if (promise) {
    return promise;
  }

  const client = getMedusaClient();
  const shared = client.regions
    .list()
    .then((res) => {
      const regions = res.regions;

      const region = regions.find((item) =>
        item.countries?.find((c) => c.iso_2 === country_code),
      );
      return region ? (structuredClone(region) as unknown as Region) : null;
    })
    .catch((error) => {
      handleError(error, 'Get region');
      return null;
    });

  event.sharedMap.set('region', shared);
  return shared as unknown as Promise<Region | null>;
};
