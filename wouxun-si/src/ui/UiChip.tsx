import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
  color?: 'light' | 'middle';
  maxWidth?: 'none' | 'xs';
};

export const UiChip = component$<Props>(
  ({ color = 'light', maxWidth = 'xs', ...props }: Props) => {
    return (
      <div
        class={[
          `
        inline-flex items-center relative
        rounded-2xl antialiased
        ms-1 me-1 my-1
        ps-3 pe-3 py-[6px]
        min-h-[32px]
        overflow-hidden
        align-middle
        gap-2
        [&>.ui-label]:m-0
        text-sm
        truncate
        
       `,
          color === 'light' &&
            `
          bg-light-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300
        `,
          color === 'middle' &&
            `
              bg-light-200 text-gray-800 dark:bg-gray-800 dark:text-gray-300
            `,
          maxWidth === 'xs' && 'max-w-xs',
          props.class,
        ]}
      >
        <Slot></Slot>
      </div>
    );
  },
);
