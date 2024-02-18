import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
  classContainer?: string | string[];
  classFooter?: string;
  // fullscreen?: boolean;
  overflowYAuto?: boolean;
  scrollY?: boolean;
  border?: 'top' | 'right' | 'bottom' | 'left' | undefined;
  color?: 'base' | 'light' | 'translucent' | 'transparent';
  rounded?: 'base' | 'md';
};

export const UiContent = component$<Props>(
  ({
    color = 'base',
    overflowYAuto = true,
    scrollY = false,
    rounded = 'base',
    ...props
  }: Props) => {
    return (
      <div
        class={[
          `
            ui-content
            w-full
            h-full
     
            flex flex-col justify-between                
          `,
          color === 'base' && 'bg-white dark:bg-gray-900',
          color === 'light' && 'bg-light-70 dark:bg-gray-800',
          color === 'translucent' &&
            'backdrop-blur-2xl bg-white/10 dark:bg-gray-900/40',
          color === 'transparent' && 'bg-transparent',
          color === 'transparent' || color === 'translucent'
            ? 'border-gray-300/50 dark:border-white/10'
            : 'border-gray-200 dark:border-white/10',
          {
            'border-t': props.border === 'top',
            'border-r': props.border === 'right',
            'border-b': props.border === 'bottom',
            'border-l': props.border === 'left',
          },
          {
            'overflow-y-auto': scrollY,
          },
          rounded === 'md' && 'rounded-md',
          props.classContainer && props.classContainer,
        ]}
      >
        <div class="flex-grow-0 flex-shrink basis-auto">
          <Slot name="start"></Slot>
        </div>

        <div
          class={[
            `
            flex-grow flex-shrink basis-auto         
            relative scrollbar-thin scrollbar-thumb-rounded-full
            `,
            {
              'overflow-y-auto': overflowYAuto,
            },
            props.class && props.class,
          ]}
        >
          <Slot></Slot>
        </div>

        <div
          class={[
            `flex-grow-0 flex-shrink basis-auto`,
            props.classFooter && props.classFooter,
          ]}
        >
          <Slot name="end"></Slot>
        </div>
      </div>
    );
  },
);
