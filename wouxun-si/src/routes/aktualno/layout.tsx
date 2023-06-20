import { component$, Slot } from '@builder.io/qwik';
import { LayoutBlog } from '~/layout/LayoutBlog';

export default component$(() => {
  return (
    <LayoutBlog>
      <Slot />
    </LayoutBlog>
  );
});
