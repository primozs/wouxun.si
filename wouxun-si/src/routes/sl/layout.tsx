import { component$, Slot } from '@builder.io/qwik';
import { LayoutSidebar } from '~/modules/layout/LayoutSidebar';

export default component$(() => {
  return (
    <LayoutSidebar>
      <article class="prose">
        <Slot />
      </article>
    </LayoutSidebar>
  );
});
