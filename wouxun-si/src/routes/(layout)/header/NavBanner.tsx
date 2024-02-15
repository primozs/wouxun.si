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
    text-white dark:text-gray-300
    hover:text-gray-200 dark:hover:text-white
    py-0 px-3
    inline-flex items-center
    text-sm font-semibold leading-6
    gap-x-1
    focus-visible:ring-white
  `;

  return (
    <>
      <div class={['bg-primary-500 dark:bg-secondary-600', props.class]}>
        <div
          class={[
            // max-w-screen-2xl px-3
            'max-w-8xl mx-auto flex items-center justify-center sm:justify-end',
            'px-4 py-1 sm:px-6 lg:px-8',
          ]}
        >
          {!session.value && (
            <Link href="/login" class={[linkStyle]}>
              Prijava <span aria-hidden="true">&rarr;</span>
            </Link>
          )}

          {!session.value && (
            <Link href="/register" class={[linkStyle]}>
              Registracija
            </Link>
          )}

          {session.value && (
            <Link href="/profile" class={[linkStyle]}>
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
