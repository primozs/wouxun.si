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
            'h-3.5 w-3.5 [&>svg]:h-3.5 [&>svg]:w-3.5': size === 'xs',
            'h-4 w-4 [&>svg]:h-4 [&>svg]:w-4': size === 'sm',
            'h-6 w-6 [&>svg]:h-6 [&>svg]:w-6': size === 'base',
            'h-7 w-7 [&>svg]:h-7 [&>svg]:w-7': size === 'md',
            'text-primary': color === 'primary',
            'text-secondary': color === 'secondary',
          },
          props.class && props.class,
        ]}
      >
        <Slot></Slot>
      </div>
    );
  },
);
