import { component$ } from '@builder.io/qwik';
import {
  type DocumentHead,
  routeLoader$,
  type StaticGenerateHandler,
} from '@builder.io/qwik-city';
import { getPageBySlug, getPagesIds } from '~/services/pages/getPageData';
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

export const onStaticGenerate: StaticGenerateHandler = async () => {
  const items = await getPagesIds();

  return {
    params: items.map((item) => {
      return { pageslug: item.slug };
    }),
  };
};
