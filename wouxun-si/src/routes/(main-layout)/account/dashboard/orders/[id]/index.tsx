import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { UiItem } from '~/ui/UiItem';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';

export default component$(() => {
  return (
    <>
      <UiItem pad={false} classCenter="flex flex-col mb-4 gap-y-4">
        <UiTitle size="xl" as="h1">
          {$localize`Order details`}
        </UiTitle>
        <NavLink
          q:slot="end"
          href="/account/dashboard/orders"
        >{$localize`Back to overview`}</NavLink>
        {/* <UiText class="text-sm" q:slot="end">
          <p class="font-medium">{$localize`Signed in:`}</p>
          <p class="truncate">{customer.value?.email}</p>
        </UiText> */}
      </UiItem>
    </>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Order #`,
});
