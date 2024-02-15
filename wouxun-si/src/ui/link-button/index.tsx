import { component$, Slot } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import type { LinkProps } from '@builder.io/qwik-city';
import { buttonIntents } from '../button';

type Props = LinkProps & {
  intent?: 'primary' | 'secondary' | 'error' | 'icon';
};

export const LinkButton = component$(
  ({ intent = 'primary', ...rest }: Props) => {
    const selectedIntent = buttonIntents[intent];

    return (
      <Link
        type="button"
        {...rest}
        class={[
          `
            relative
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-offset-1
            focus-visible:ring-primary-500 dark:focus-visible:ring-white
            text-sm tracking-wide font-semibold leading-6
            whitespace-nowrap no-underline
          `,
          selectedIntent,
          rest.class as string,
        ]}
      >
        <Slot />
      </Link>
    );
  },
);
