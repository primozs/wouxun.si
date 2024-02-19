import { component$, Slot } from '@builder.io/qwik';

export type TagProps = {
  variant?: 'neutral' | 'blue';
  size?: 'small' | 'medium';
  class?: string;
};

export const Tag = component$(
  ({ size = 'medium', variant = 'blue', ...rest }: TagProps) => {
    return (
      <div
        class={[
          rest.class,
          `rounded-md inline-flex items-center justify-center 
          text-sm font-medium`,
          {
            'bg-neutral border border-neutral-content text-neutral-content':
              variant === 'neutral',
            'border border-primary text-primary': variant === 'blue',
          },
          { 'py-0.5 px-2': size === 'medium', 'px-1.5': size === 'small' },
        ]}
      >
        <Slot />
      </div>
    );
  },
);
