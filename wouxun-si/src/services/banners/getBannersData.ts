import { readItems } from '@directus/sdk';
import { getDirectusClient } from '~/services/directus';
import { handleError } from '~/services/logger';

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
