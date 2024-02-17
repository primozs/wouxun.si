import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
  color?: 'transparent' | 'translucent' | 'header-color';
};

export const UiHeader = component$<Props>(
  ({ color = 'header-color', ...props }) => {
    return (
      <header
        class={[
          `
          block relative
          w-full
          z-10
          `,
          {
            'bg-light-200 dark:bg-gray-900': color === 'header-color',
            'backdrop-blur bg-white/50 dark:bg-gray-900/60':
              color === 'translucent',
          },
          props.class && props.class,
        ]}
      >
        <Slot></Slot>
      </header>
    );
  },
);
