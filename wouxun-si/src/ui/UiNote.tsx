import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
  color?: 'light' | 'primary' | 'base';
  wrap?: boolean;
};

export const UiNote = component$<Props>(
  ({ color = 'base', wrap = false, ...props }: Props) => {
    return (
      <div
        class={[
          `
        ui-note
        text-base
        font-normal
        `,
          color === 'light' && 'text-base-content/60',
          color === 'primary' && 'text-primary',
          color === 'base' && 'text-base-content',
          wrap && 'text-balance',

          props.class && props.class,
        ]}
      >
        <Slot></Slot>
      </div>
    );
  },
);
