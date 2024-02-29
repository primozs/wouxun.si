import { component$ } from '@builder.io/qwik';
import {
  useAuthSessionLoader,
  useAuthSignoutAction,
} from '~/routes/plugin@auth';
import { NavLink } from '~/ui/button';

type Props = {
  class?: string | string[];
};

export const NavBanner = component$<Props>((props) => {
  const session = useAuthSessionLoader();
  const signout = useAuthSignoutAction();
  return (
    <>
      <div class={['bg-primary', props.class]}>
        <div
          class={[
            // max-w-screen-2xl px-3
            'max-w-8xl mx-auto flex items-center justify-center sm:justify-end',
            'px-4 py-1 sm:px-6 lg:px-8 space-x-4',
          ]}
        >
          {!session.value && (
            <NavLink href="/account/login" color="neutral" size="sm">
              {$localize`Signin`} <span aria-hidden="true">&rarr;</span>
            </NavLink>
          )}

          {!session.value && (
            <NavLink href="/account/register" color="neutral" size="sm">
              {$localize`Register`}
            </NavLink>
          )}

          {session.value && (
            <NavLink href="/account/dashboard" color="neutral" size="sm">
              {session.value?.first_name} {session.value?.last_name}
            </NavLink>
          )}

          {session.value && (
            <NavLink
              type="button"
              color="neutral"
              size="sm"
              onClick$={() => {
                signout.submit();
              }}
            >
              {$localize`Signout`}
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
});
