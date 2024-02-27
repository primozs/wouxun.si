import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { BlogListView } from './BlogListView';
import { UiTitle } from '~/ui/UiTitle';

export default component$(() => {
  return (
    <>
      <UiTitle as="h1" size="2xl" color="primary">
        {$localize`News`}
      </UiTitle>
      <BlogListView />
    </>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`News`,
});
