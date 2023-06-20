import { directus } from '~/services/directus';
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
    const result = (await directus.items('wouxun_banner').readByQuery({
      fields: ['id', 'title', 'subtitle', 'image', 'style'],
      filter: {
        _and: [
          {
            status: {
              _eq: 'published',
            },
          },
        ],
      },
    })) as { data: BannersData[] };

    return result.data;
  } catch (error: any) {
    handleError(error, 'Get active banners');
    return [];
  }
};
