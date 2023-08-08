import { component$, type QwikIntrinsicElements, Slot } from '@builder.io/qwik';

export type ButtonProps = QwikIntrinsicElements['button'] & {
  intent?: 'primary' | 'secondary' | 'error' | 'icon';
};

export const Button = component$<ButtonProps>(
  ({ intent = 'primary', ...rest }) => {
    const intents: Record<string, string> = {
      unstyled: '',
      primary: `
        py-2
        px-4
        flex flex-row
        items-center
        justify-center
        font-medium
        border
        rounded-md
        shadow-sm
        border-transparent
        bg-primary-500
        hover:bg-primary-600 
        text-white
        shadow-sm
      `,
      secondary: `
        py-2
        px-4
        gap-1
        h-fit
        flex flex-row
        items-center
        justify-center
        text-secondary-900
        shadow-sm
        rounded-md
        border
        border-secondary-200
        bg-gradient-to-b
        from-secondary-100
        to-secondary-200
        hover:bg-primary-200
      `,
      error: `
        py-2
        px-4
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
        text-gray-700 dark:text-white
        hover:bg-gray-100 dark:hover:bg-gray-800
        hover:text-gray-500 dark:hover:text-white
      `,
    };
    const selectedIntent = intents[intent];

    return (
      <button
        {...rest}
        class={[
          `
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-offset-1
            focus-visible:ring-primary-500 dark:focus-visible:ring-white
            text-sm tracking-wide font-semibold leading-6
          `,
          selectedIntent,
          rest.class as string,
        ]}
        // class={{
        //   [button({
        //     intent: intent,
        //     bold: bold,
        //     fontSize: fontSize,
        //     active: active,
        //     class: typeof rest.class === 'string' ? rest.class : null,
        //   })]: true,
        //   ...(typeof rest.class === 'object' && { ...rest.class }),
        // }}
      >
        <Slot />
      </button>
    );
  },
);
