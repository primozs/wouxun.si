import { component$ } from '@builder.io/qwik';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';

export const Help = component$(() => {
  return (
    <div class="my-4">
      <UiTitle size="lg" as="h2">
        {$localize`Need help?`}
      </UiTitle>
      <NavLink
        href={$localize`/info/contact`}
        class="block"
      >{$localize`Contact`}</NavLink>
      <NavLink
        href={$localize`/info/contact`}
      >{$localize`Returns & Exchanges`}</NavLink>
    </div>
  );
});
