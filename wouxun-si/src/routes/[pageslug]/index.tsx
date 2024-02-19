import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { mdParse } from '~/ui/md-parse';
import { readItems } from '@directus/sdk';
import { getDirectusClient } from '~/modules/directus';
import { handleError } from '~/modules/logger';

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

export const useGetPageBySlug = routeLoader$(async (event) => {
  return await getPageBySlug(event.params.pageslug);
});

export default component$(() => {
  const post = useGetPageBySlug();

  return (
    <article
      class="prose"
      dangerouslySetInnerHTML={mdParse(post.value?.body)}
    />
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useGetPageBySlug);
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
