import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
  translucent?: boolean;
  color?: 'base' | 'translucent' | 'transparent';
};

export const UiFooter = component$<Props>(
  ({ color = 'base', ...props }: Props) => {
    return (
      <footer
        class={[
          `
          block relative
          w-full
          z-10
          `,
          {
            'bg-neutral': color === 'base',
            'backdrop-blur bg-base-100/60': color === 'translucent',
          },
          props.class,
        ]}
      >
        <Slot></Slot>
      </footer>
    );
  },
);
