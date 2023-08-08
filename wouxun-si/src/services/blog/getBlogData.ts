import { readItems } from '@directus/sdk';
import { getDirectusClient, abortAsync } from '~/services/directus';
import type { wouxun_news } from '~/services/directus/schema';
import { handleError } from '~/services/logger';

export const getBlogBySlug = async (slug: string | undefined) => {
  try {
    if (!slug) return null;
    const directus = getDirectusClient();
    const result = await directus.request(
      readItems('wouxun_news', {
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

export const getBlogList = async (
  page: number,
  signal: AbortSignal,
): Promise<wouxun_news[]> => {
  const result = (await abortAsync(signal, async () => {
    const directus = getDirectusClient();
    return directus.request(
      readItems('wouxun_news', {
        limit: 6,
        page,
        sort: ['-date_created'],
        fields: ['*'],
      }),
    );
  })) as wouxun_news[];

  return result ?? [];
};

export const getBlogIds = async (): Promise<{ slug: string }[]> => {
  const directus = getDirectusClient();

  const result = await directus.request(
    readItems('wouxun_news', {
      fields: ['slug'],
    }),
  );

  return result ?? [];
};
