import { type QwikIntrinsicElements, Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: QwikIntrinsicElements['div']['class'];
  classContainer?: QwikIntrinsicElements['div']['class'];
  classFooter?: QwikIntrinsicElements['div']['class'];
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
          color === 'base' && 'bg-base-100',
          color === 'light' && 'bg-base-300/40',
          color === 'translucent' && 'backdrop-blur-2xl bg-base-300/10',
          color === 'transparent' || color === 'translucent'
            ? 'border-base-300/50'
            : 'border-base-300',
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
          props.classContainer,
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
            props.class,
          ]}
        >
          <Slot></Slot>
        </div>

        <div class={[`flex-grow-0 flex-shrink basis-auto`, props.classFooter]}>
          <Slot name="end"></Slot>
        </div>
      </div>
    );
  },
);
