import { component$, Slot } from '@builder.io/qwik';
import { LayoutHomepage } from '~/layout/LayoutHomepage';

export default component$(() => {
  return (
    <LayoutHomepage>
      <Slot />
    </LayoutHomepage>
  );
});
