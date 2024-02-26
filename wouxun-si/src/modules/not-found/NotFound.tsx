import { component$ } from '@builder.io/qwik';
import { UiContent } from '~/ui/UiContent';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';

export const NotFound = component$(() => {
  return (
    <>
      <UiContent class="flex justify-center items-center">
        <div class="flex flex-col gap-4 text-center">
          <UiTitle as="h1" size="2xl">{$localize`Page not found`}</UiTitle>

          <UiText wrap>
            {$localize`The page you tried to access does not exist.`}
          </UiText>

          <NavLink href="/">{$localize`Go to frontpage`}</NavLink>
        </div>
      </UiContent>
    </>
  );
});
