import { component$, type QwikIntrinsicElements, Slot } from '@builder.io/qwik';
import { Link, useLocation, type LinkProps } from '@builder.io/qwik-city';
import { LoadingDots } from '../loading-dots';

export const buttonIntents: Record<string, string> = {
  unstyled: '',
  primary: `
    py-2
    px-5
    flex flex-row
    items-center
    justify-center
    font-medium
    border
    rounded-md
    shadow-sm
    border-transparent
    bg-primary
    hover:bg-primary/90    
    !text-primary-content    
    no-underline transition-colors
  `,
  // gap-1
  // h-fit
  secondary: `
    py-2
    px-5
    flex flex-row
    items-center        
    justify-center
    font-medium
    border
    rounded-md    
    shadow-sm
    border-secondary-content/10
    bg-secondary    
    hover:bg-primary/5    
    text-secondary-content
    no-underline transition-colors
  `,
  error: `
    py-2
    px-5
    inline-flex
    items-center
    font-medium
    border
    rounded-md
    shadow-sm
    border-transparent
    bg-error
    hover:bg-error/90 
    text-error-content shadow-sm
  `,
  icon: `
    p-2
    inline-flex items-center justify-center
    rounded-md
    text-primary
    hover:bg-primary/90
    hover:text-primary-content
  `,
};

export type ButtonProps = QwikIntrinsicElements['button'] & {
  intent?: 'base' | 'rounded' | 'square';
  color?: 'base' | 'primary' | 'secondary' | 'error' | 'neutral' | 'accent';
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
            relative
            text-sm tracking-wide font-semibold leading-6
            whitespace-nowrap
          `,
          intent === 'base' && 'btn-md',
          intent === 'rounded' && 'btn-circle',
          intent === 'square' && 'btn-square',
          {
            'btn-primary': color === 'primary',
            'btn-secondary': color === 'secondary',
            'btn-neutral': color === 'neutral',
            'btn-accent': color === 'accent',
            'btn-error': color === 'error',
          },
          fill === 'outline' && 'btn-outline',
          fill === 'clear' && [
            `btn-link no-underline
            `,
          ],
          rest.disabled && 'btn-disabled btn-primary',
          rest.class as string,
        ]}
      >
        {!loading && <Slot></Slot>}

        {loading && (
          <span class="absolute inset-0 top-1">
            <LoadingDots
              class={[
                color === 'secondary'
                  ? 'bg-secondary-content'
                  : 'bg-primary-content',
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
