import { readItems } from '@directus/sdk';
import { getDirectusClient } from '~/services/directus';
import { handleError } from '~/services/logger';

export const getPageBySlug = async (slug: string | undefined) => {
  try {
    if (!slug) return null;
    const directus = getDirectusClient();
    const result = await directus.request(
      readItems('wouxun_page', {
        limit: 1,
        fields: ['*'],
        filter: {
          slug: {
            _eq: slug,
          },
        },
      }),
    );

    if (result.length === 0) return null;

    const item = result[0];
    return item;
  } catch (error: any) {
    handleError(error, 'Get post by slug');
    return null;
  }
};

export const getPagesIds = async (): Promise<{ slug: string }[]> => {
  const directus = getDirectusClient();
  const result = await directus.request(
    readItems('wouxun_page', {
      fields: ['slug'],
    }),
  );

  return result ?? [];
};
