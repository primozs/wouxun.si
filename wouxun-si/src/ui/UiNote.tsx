import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
  color?: 'primary' | 'base';
  wrap?: boolean;
};

export const UiNote = component$<Props>(
  ({ color = 'base', wrap = false, ...props }: Props) => {
    return (
      <div
        class={[
          `
        ui-note
        font-normal
        `,
          color === 'primary' && 'text-primary',
          color === 'base' && 'text-base-content/60',
          wrap && 'text-balance',

          props.class,
        ]}
      >
        <Slot></Slot>
      </div>
    );
  },
);
