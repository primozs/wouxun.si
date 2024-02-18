import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
  color?: 'light' | 'primary' | 'dark';
  wrap?: boolean;
};

export const UiNote = component$<Props>(
  ({ color = 'base', wrap = false, ...props }) => {
    return (
      <div
        class={[
          `
        ui-note
        text-base
        font-normal
        `,
          color === 'light' && 'text-gray-500 dark:text-gray-500',
          color === 'primary' && 'text-primary-600',
          color === 'dark' && 'text-gray-800 dark:text-gray-400',
          wrap && 'text-balance',

          props.class && props.class,
        ]}
      >
        <Slot></Slot>
      </div>
    );
  },
);
