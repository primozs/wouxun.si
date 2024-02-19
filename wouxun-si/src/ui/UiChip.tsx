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
          bg-base-300 text-base-content
        `,
          color === 'middle' &&
            `
              bg-neutral text-base-content
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
