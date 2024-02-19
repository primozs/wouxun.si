import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import {
  useAuthSessionLoader,
  useAuthSignoutAction,
} from '~/routes/plugin@auth';

type Props = {
  class?: string | string[];
};

export const NavBanner = component$<Props>((props) => {
  const session = useAuthSessionLoader();
  const signout = useAuthSignoutAction();

  const linkStyle = `
    text-primary-content
    hover:text-primary-content/90
    py-0 px-3
    inline-flex items-center
    text-sm font-semibold leading-6
    gap-x-1
    focus-visible:ring-primary-content
  `;

  return (
    <>
      <div class={['bg-primary', props.class]}>
        <div
          class={[
            // max-w-screen-2xl px-3
            'max-w-8xl mx-auto flex items-center justify-center sm:justify-end',
            'px-4 py-1 sm:px-6 lg:px-8',
          ]}
        >
          {!session.value && (
            <Link href="/account/login" class={[linkStyle]}>
              Prijava <span aria-hidden="true">&rarr;</span>
            </Link>
          )}

          {!session.value && (
            <Link href="/account/register" class={[linkStyle]}>
              Registracija
            </Link>
          )}

          {session.value && (
            <Link href="/account/dashboard" class={[linkStyle]}>
              {session.value?.first_name} {session.value?.last_name}
            </Link>
          )}

          {session.value && (
            <Link
              type="button"
              class={[linkStyle, 'cursor-pointer']}
              onClick$={() => {
                signout.submit();
              }}
            >
              Odjava
            </Link>
          )}
        </div>
      </div>
    </>
  );
});
