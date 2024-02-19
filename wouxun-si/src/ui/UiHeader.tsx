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
            'bg-neutral': color === 'header-color',
            'backdrop-blur bg-base-100/50': color === 'translucent',
          },
          props.class && props.class,
        ]}
      >
        <Slot></Slot>
      </header>
    );
  },
);
