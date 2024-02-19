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

export const Button = component$<ButtonProps>(
  ({ intent = 'primary', ...rest }) => {
    const selectedIntent = buttonIntents[intent];

    return (
      <button
        {...rest}
        class={[
          `rounded-full
            relative
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-offset-1
            focus-visible:ring-primary
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
