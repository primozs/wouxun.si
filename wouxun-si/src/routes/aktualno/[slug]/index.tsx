import { component$, useTask$ } from '@builder.io/qwik';
import {
  type DocumentHead,
  routeLoader$,
  type StaticGenerateHandler,
} from '@builder.io/qwik-city';
import { getBlogBySlug, getBlogIds } from '~/services/blog/getBlogData';
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
