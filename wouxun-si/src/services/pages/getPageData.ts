import { directus } from '~/services/directus';
import { handleError } from '~/services/logger';

export type PageItem = {
  id: string;
  title: string;
  slug: string;
  body: string;
};

export const getPageBySlug = async (slug: string) => {
  try {
    const result = (await directus.items('wouxun_page').readByQuery({
      limit: 1,
      fields: ['id', 'title', 'slug', 'body'],
      filter: {
        slug: {
          _eq: slug,
        },
      },
    })) as { data: PageItem[] };

    if (result.data.length === 0) return null;

    const item = result.data[0];
    return item;
  } catch (error: any) {
    handleError(error, 'Get post by slug');
    return null;
  }
};

export const getPagesIds = async (): Promise<{ slug: string }[]> => {
  const result = (await directus.items('wouxun_page').readByQuery({
    fields: ['slug'],
  })) as { data: { slug: string }[] };

  const transformed = result.data ?? [];
  return transformed;
};
