import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { getPageBySlug } from '~/services/pages/getPageData';
import { mdParse } from '~/ui/md-parse';

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
