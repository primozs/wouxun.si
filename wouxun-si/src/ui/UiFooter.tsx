import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
  translucent?: boolean;
};

export const UiFooter = component$<Props>(
  ({ translucent = false, ...props }) => {
    return (
      <footer
        class={[
          `
          block relative
          w-full
          z-10
          `,
          {
            'bg-light-200 dark:bg-gray-900': !translucent,
            'backdrop-blur bg-white/60 dark:bg-gray-900': translucent,
          },
          props.class && props.class,
        ]}
      >
        <Slot></Slot>
      </footer>
    );
  },
);
