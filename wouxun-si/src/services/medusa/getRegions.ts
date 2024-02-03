import { handleError } from '../logger';
import { getMedusaClient } from '.';
import type { Region } from '@medusajs/client-types';

export const getRegion = async (country_code: string) => {
  try {
    const client = getMedusaClient();
    const res = await client.regions.list();
    const regions = res.regions;

    const region = regions.find((item) =>
      item.countries?.find((c) => c.iso_2 === country_code),
    );

    return region ? (structuredClone(region) as unknown as Region) : null;
  } catch (error: any) {
    handleError(error, 'Get region');
    return null;
  }
};
