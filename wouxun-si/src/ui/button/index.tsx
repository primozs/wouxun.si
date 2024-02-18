import { component$, type QwikIntrinsicElements, Slot } from '@builder.io/qwik';

export type ButtonProps = QwikIntrinsicElements['button'] & {
  intent?: 'primary' | 'secondary' | 'error' | 'icon';
};

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
    bg-primary-500
    hover:bg-primary-600/90 
    !text-white    
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
    border-secondary-200    
    bg-secondary-600/10
    hover:bg-secondary-600/20
    text-secondary-900
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
    bg-error-600
    hover:bg-error-700 
    text-white shadow-sm
  `,
  icon: `
    p-2
    inline-flex items-center justify-center
    rounded-md
    text-primary-500 dark:text-white
    hover:bg-primary-600/90 dark:hover:bg-primary-800
    hover:text-white dark:hover:text-white
  `,
};

export const Button = component$<ButtonProps>(
  ({ intent = 'primary', ...rest }) => {
    const selectedIntent = buttonIntents[intent];

    return (
      <button
        {...rest}
        class={[
          `
            relative
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-offset-1
            focus-visible:ring-primary-500 dark:focus-visible:ring-white
            text-sm tracking-wide font-semibold leading-6 whitespace-nowrap
          `,
          selectedIntent,
          rest.class as string,
        ]}
      >
        <Slot />
      </button>
    );
  },
);
