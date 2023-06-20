import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { BlogListView } from './BlogListView';

export default component$(() => {
  return (
    <>
      <BlogListView />
    </>
  );
});

export const head: DocumentHead = {
  title: 'Aktualno',
};
