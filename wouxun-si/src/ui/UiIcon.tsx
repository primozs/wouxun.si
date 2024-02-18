import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
  color?: 'inherit' | 'primary' | 'secondary';
  size?: 'xs' | 'sm' | 'base' | 'md';
};

export const UiIcon = component$<Props>(
  ({ color = 'inherit', size = 'base', ...props }) => {
    return (
      <div
        class={[
          'ui-icon flex-shrink-0',
          {
            'h-3.5 w-3.5': size === 'xs',
            'h-4 w-4': size === 'sm',
            'h-6 w-6': size === 'base',
            'h-7 w-7': size === 'md',
            'text-primary-500': color === 'primary',
            'text-gray-600 dark:text-white': color === 'secondary',
          },
          props.class && props.class,
        ]}
      >
        <Slot></Slot>
      </div>
    );
  },
);