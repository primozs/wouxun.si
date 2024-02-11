import { component$, Slot } from '@builder.io/qwik';
import { LayoutSidebar } from '~/routes/(layout)/LayoutSidebar';

export default component$(() => {
  return (
    <LayoutSidebar>
      <Slot />
    </LayoutSidebar>
  );
});
