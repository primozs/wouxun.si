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
          text-labels-xsmall font-medium`,
          {
            'bg-neutral-200 dark:bg-neutral-400 border border-neutral-400 dark:border-neutral-200 text-neutral-600 dark:text-tag-neutral-dark':
              variant === 'neutral',
            'bg-tag-blue-light dark:bg-tag-blue-dark border border-primary-400 dark:bg-neutral-200 text-primary-400 dark:text-neutral-400':
              variant === 'blue',
          },
          { 'py-0.5 px-2': size === 'medium', 'px-1.5': size === 'small' },
        ]}
      >
        <Slot />
      </div>
    );
  },
);