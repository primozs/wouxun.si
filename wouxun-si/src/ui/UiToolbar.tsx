import { Slot, component$ } from '@builder.io/qwik';

export interface UiToolbarProps {
  class?: string | string[];
  border?: 'top' | 'right' | 'bottom' | 'left' | 'none';
}

export const UiToolbar = component$<UiToolbarProps>(
  ({ border = 'bottom', ...props }) => {
    return (
      <div
        class={[
          ` grid grid-cols-5
        ps-1 pe-1 gap-x-1 min-h-[56px]
        relative
        items-center 
        
        border-gray-200 dark:border-white/10 
        overflow-hidden        
        z-10        
      `,
          {
            'border-t': border === 'top',
            'border-r': border === 'right',
            'border-b': border === 'bottom',
            'border-l': border === 'left',
          },
          props.class && props.class,
        ]}
      >
        <div class="col-span-1">
          <Slot name="start"></Slot>
        </div>

        <div
          class={[
            `
            col-span-3
            text-center
            `,
          ]}
        >
          <Slot></Slot>
        </div>

        <div class="col-span-1 justify-self-end">
          <Slot name="end"></Slot>
        </div>
      </div>
    );
  },
);
