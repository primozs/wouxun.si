import { component$, Slot } from '@builder.io/qwik';

export type TagProps = {
  variant?: 'neutral' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  class?: string;
};

export const Tag = component$(
  ({ size = 'md', variant = 'primary', ...rest }: TagProps) => {
    return (
      <div
        class={[
          `badge badge-outline rounded-md truncate`,
          {
            'badge-neutral': variant === 'neutral',
            'badge-primary': variant === 'primary',
          },
          {
            'badge-sm': size === 'sm',
            'badge-md': size === 'md',
            'badge-lg': size === 'lg',
          },
          rest.class,
        ]}
      >
        <Slot />
      </div>
    );
  },
);
