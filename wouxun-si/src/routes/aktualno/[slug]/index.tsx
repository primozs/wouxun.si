import { component$, useTask$ } from '@builder.io/qwik';
import {
  type DocumentHead,
  routeLoader$,
  type StaticGenerateHandler,
} from '@builder.io/qwik-city';
import { readItems } from '@directus/sdk';
import { getDirectusClient } from '~/modules/directus';
import { handleError } from '~/modules/logger';
import { BlogView } from './BlogView';

export const useGetPostBySlug = routeLoader$(async (event) => {
  return await getBlogBySlug(event.params.slug);
});

export default component$(() => {
  const post = useGetPostBySlug();

  useTask$(({ track }) => {
    track(() => post.value);
  });

  return <>{post.value && <BlogView post={post} />}</>;
});

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useGetPostBySlug);
  return {
    title: `${data?.title}`,
    meta: [
      {
        name: 'description',
        content: (data?.body?.slice(0, 140) ?? '') + '...',
      },
      {
        name: 'id',
        content: data?.id,
      },
    ],
  };
};

export const onStaticGenerate: StaticGenerateHandler = async () => {
  const items = await getBlogIds();

  return {
    params: items.map((item) => {
      return { slug: item.slug };
    }),
  };
};

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

export const getBlogIds = async (): Promise<{ slug: string }[]> => {
  const directus = getDirectusClient();

  const result = await directus.request(
    readItems('wouxun_news', {
      fields: ['slug'],
    }),
  );

  return result ?? [];
};
