import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
  color?: 'base' | 'light' | 'primary' | 'dark';
  wrap?: boolean;
};

export const UiText = component$<Props>(
  ({ color = 'base', wrap = false, ...props }) => {
    return (
      <div
        class={[
          `
          ui-text
          text-base
          font-normal
          `,
          color === 'base' && 'text-gray-900 dark:text-white',
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
