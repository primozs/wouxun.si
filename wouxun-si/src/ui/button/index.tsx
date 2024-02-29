import { component$, type QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { Link, useLocation, type LinkProps } from '@builder.io/qwik-city';
import { LoadingDots } from '../loading-dots';

export type ButtonProps = QwikIntrinsicElements['button'] & {
  intent?: 'base' | 'rounded' | 'square' | 'unstyled';
  color?:
    | 'base'
    | 'primary'
    | 'secondary'
    | 'error'
    | 'neutral'
    | 'accent'
    | 'ghost';
  fill?: 'clear' | 'outline' | 'solid';
  loading?: boolean;
};

export const Button = component$<ButtonProps>(
  ({
    intent = 'base',
    color = 'primary',
    fill = 'solid',
    loading = false,
    ...rest
  }) => {
    return (
      <button
        {...rest}
        {...(rest.disabled && { 'aria-disabled': 'true' })}
        class={[
          `
            ui-button
            btn
            text-sm tracking-wide font-medium leading-6            
            truncate [&>span]:truncate
    
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-offset-1
          `,
          intent === 'base' && 'btn-md',
          intent === 'rounded' && 'btn-circle',
          intent === 'square' && 'btn-square',
          {
            'btn-primary focus-visible:ring-primary': color === 'primary',
            'btn focus-visible:ring-base-300 bg-gradient-to-b from-base-100 to-base-200 border border-base-300':
              color === 'secondary',
            // 'btn-secondary focus-visible:ring-secondary': color === 'secondary',
            'btn-neutral focus-visible:ring-neutral': color === 'neutral',
            'btn-accent focus-visible:ring-accent': color === 'accent',
            'btn-error focus-visible:ring-error': color === 'error',
            'btn-ghost focus-visible:ring-accent': color === 'ghost',
          },
          fill === 'outline' && 'btn-outline',
          fill === 'clear' && [
            `btn-link no-underline
            `,
          ],
          rest.disabled && 'btn-disabled btn-primary',
          rest.class as string,
          loading && '!relative text-transparent',
        ]}
      >
        <Slot></Slot>

        {loading && (
          <span class="absolute inset-0 top-1">
            <LoadingDots
              class={[
                {
                  'bg-primary-content': color === 'primary',
                  'bg-secondary-content': color === 'secondary',
                  'bg-neutral-content': color === 'neutral',
                  'bg-accent-content': color === 'accent',
                  'bg-error-content': color === 'error',
                  'bg-base-content': color === 'ghost' || color === 'base',
                },
              ]}
            />
          </span>
        )}
      </button>
    );
  },
);

type NavLinkProps = LinkProps & {
  intent?: 'link' | 'button';
  color?: 'base' | 'primary' | 'secondary' | 'error' | 'neutral' | 'accent';
  fill?: 'clear' | 'outline' | 'solid';
  size?: 'base' | 'sm' | 'md' | 'xl';
  activeClass?: QwikIntrinsicElements['a']['class'];
};

export const NavLink = component$<NavLinkProps>(
  ({
    intent = 'link',
    color = 'primary',
    fill = 'clear',
    size = 'base',
    ...rest
  }: NavLinkProps) => {
    return (
      <LinkNavHeadless
        {...(intent === 'button' && { type: 'button' })}
        {...rest}
        class={[
          intent === 'button' && [
            `btn btn-md
            text-sm tracking-wide font-semibold leading-6
            whitespace-nowrap no-underline
            `,
            {
              'btn-primary': color === 'primary',
              'btn-secondary': color === 'secondary',
              'btn-neutral': color === 'neutral',
              'btn-accent': color === 'accent',
              'btn-outline': fill === 'outline',
            },
          ],
          intent === 'link' && [
            'link',
            {
              'link-primary': color === 'primary',
              'link-secondary': color === 'secondary',
              'link-neutral': color === 'neutral',
              'link-accent': color === 'accent',
            },
            fill === 'clear' &&
              `                            
              whitespace-nowrap no-underline
              `,
            {
              'font-medium leading-6': size === 'base',
              'font-semibold text-sm leading-6': size === 'sm',
              'font-semibold text-base': size === 'md',
              'text-xl': size === 'xl',
            },
          ],
          rest.class as string,
        ]}
      >
        <Slot />
      </LinkNavHeadless>
    );
  },
);

type LinkNavHeadlessProps = LinkProps & {
  activeClass?: QwikIntrinsicElements['a']['class'];
};

export const LinkNavHeadless = component$(
  ({ activeClass, ...props }: LinkNavHeadlessProps) => {
    const location = useLocation();
    const toPathname = props.href ?? '';
    const locationPathname = location.url.pathname;

    const startSlashPosition =
      toPathname !== '/' && toPathname.startsWith('/')
        ? toPathname.length - 1
        : toPathname.length;
    const endSlashPosition =
      toPathname !== '/' && toPathname.endsWith('/')
        ? toPathname.length - 1
        : toPathname.length;
    const isActive =
      locationPathname === toPathname ||
      locationPathname === toPathname + '/' ||
      (locationPathname.endsWith(toPathname) &&
        (locationPathname.charAt(endSlashPosition) === '/' ||
          locationPathname.charAt(startSlashPosition) === '/'));
    return (
      <Link {...props} class={[props.class, isActive && activeClass]}>
        <Slot />
      </Link>
    );
  },
);
