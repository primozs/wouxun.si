import { component$ } from '@builder.io/qwik';
import { UiItem } from '~/ui/UiItem';
import { UiLabel } from '~/ui/UiLabel';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';

export const SignInPrompt = component$(() => {
  return (
    <UiItem pad={false} class="pb-4">
      <UiLabel>
        <UiTitle size="lg">{$localize`Already have an account?`}</UiTitle>
        <UiText>{$localize`Sign in for a better experience.`}</UiText>
      </UiLabel>

      <NavLink
        q:slot="end"
        intent="button"
        href="/account/login?callbackUrl=/cart"
        color="primary"
      >
        {$localize`Signin`} <span aria-hidden="true">&rarr;</span>
      </NavLink>
    </UiItem>
  );
});
