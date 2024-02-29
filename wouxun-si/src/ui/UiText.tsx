import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
  color?: 'base' | 'light' | 'primary';
  wrap?: boolean;
};

export const UiText = component$<Props>(
  ({ color = 'base', wrap = false, ...props }) => {
    return (
      <div
        class={[
          `
          ui-text
          font-normal
          `,
          color === 'base' && 'text-base-content',
          color === 'light' && 'text-base-content/60',
          color === 'primary' && 'text-primary',
          wrap && 'text-balance',

          props.class,
        ]}
      >
        <Slot></Slot>
      </div>
    );
  },
);
