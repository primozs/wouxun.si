import { component$, useComputed$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';

export const SortProducts = component$(() => {
  const location = useLocation();
  const urlCreatedAt = useComputed$(() => {
    const url = new URL(location.url);
    url.searchParams.set('sortBy', 'created_at');
    return url.toString();
  });
  const urlPriceAsc = useComputed$(() => {
    const url = new URL(location.url);
    url.searchParams.set('sortBy', 'price_asc');
    return url.toString();
  });

  const urlPriceDesc = useComputed$(() => {
    const url = new URL(location.url);
    url.searchParams.set('sortBy', 'price_desc');
    return url.toString();
  });
  return (
    <div class="flex sm:flex-col gap-2">
      <UiTitle>{$localize`Sort by`}</UiTitle>
      <NavLink href={urlCreatedAt.value}>{$localize`Latest arrivals`}</NavLink>
      <NavLink href={urlPriceAsc.value}>
        {$localize`Price: Low -> High`}
      </NavLink>
      <NavLink href={urlPriceDesc.value}>
        {$localize`Price: High -> Low`}
      </NavLink>
    </div>
  );
});
