import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';

export const SortProducts = component$(() => {
  const location = useLocation();
  return (
    <div class="flex sm:flex-col gap-2">
      <UiTitle>{$localize`Sort by`}</UiTitle>
      <NavLink href={`${location.url.pathname}?sortBy=created_at`}>
        {$localize`Latest arrivals`}
      </NavLink>
      <NavLink href={`${location.url.pathname}?sortBy=price_asc`}>
        {$localize`Price: Low -> High`}
      </NavLink>
      <NavLink href={`${location.url.pathname}?sortBy=price_desc`}>
        {$localize`Price: High -> Low`}
      </NavLink>
    </div>
  );
});
