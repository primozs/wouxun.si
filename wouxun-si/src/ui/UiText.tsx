import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
  color?: 'base' | 'light' | 'primary';
  wrap?: boolean;
  as?: 'div' | 'span';
};

export const UiText = component$<Props>(
  ({ as = 'div', color = 'base', wrap = false, ...props }) => {
    return (
      <>
        {as === 'div' ? (
          <div
            class={[
              `
          ui-text
          font-normal
          `,
              color === 'base' && 'text-base-content',
              color === 'light' && 'text-base-content/70',
              color === 'primary' && 'text-primary',
              wrap && 'text-balance',

              props.class,
            ]}
          >
            <Slot></Slot>
          </div>
        ) : (
          <span
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
          </span>
        )}
      </>
    );
  },
);
