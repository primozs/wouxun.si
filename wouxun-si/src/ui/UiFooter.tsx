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
            'bg-neutral': !translucent,
            'backdrop-blur bg-base-100/60': translucent,
          },
          props.class && props.class,
        ]}
      >
        <Slot></Slot>
      </footer>
    );
  },
);
