import { directus, abortAsync } from '~/services/directus';
import { handleError } from '~/services/logger';

export type BlogListItem = {
  id: string;
  title: string;
  slug: string;
  body: string;
  image: string | null;
  date_created: string;
};

export const getBlogBySlug = async (slug: string) => {
  try {
    const result = (await directus.items('wouxun_news').readByQuery({
      limit: 1,
      fields: [
        'id',
        'status',
        'title',
        'slug',
        'body',
        'image',
        'date_created',
      ],
      filter: {
        slug: {
          _eq: slug,
        },
      },
    })) as { data: BlogListItem[] };

    if (result.data.length === 0) return null;

    const item = result.data[0];
    return item;
  } catch (error: any) {
    handleError(error, 'Get post by slug');
    return null;
  }
};

export const getBlogList = async (
  page: number,
  signal: AbortSignal,
): Promise<BlogListItem[]> => {
  const result = (await abortAsync(signal, async () => {
    return directus.items('wouxun_news').readByQuery({
      limit: 6,
      page,
      // @ts-ignore
      sort: ['-date_created'],
      fields: [
        'id',
        'status',
        'title',
        'slug',
        'body',
        'image',
        'date_created',
      ],
    });
  })) as { data: BlogListItem[] };

  const transformed = result.data ?? [];

  return transformed;
};

export const getBlogIds = async (): Promise<{ slug: string }[]> => {
  const result = (await directus.items('wouxun_news').readByQuery({
    fields: ['slug'],
  })) as { data: { slug: string }[] };

  const transformed = result.data ?? [];
  return transformed;
};
