import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
  color?: 'base' | 'primary' | 'secondary';
};

export const UiListHeader = component$<Props>(
  ({ color = 'base', ...props }) => {
    return (
      <div
        class={[
          `      
          ui-list-header
          flex-1
          whitespace-nowrap overflow-hidden text-ellipsis
          font-semibold
          pt-7
          pb-1.5    
          px-4
        `,
          color === 'base' &&
            `
          bg-white text-gray-900 dark:bg-gray-900 dark:text-white
        `,
          props.class && props.class,
        ]}
      >
        <Slot></Slot>
      </div>
    );
  },
);
