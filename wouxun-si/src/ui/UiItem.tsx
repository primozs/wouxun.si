import { Slot, component$, type PropFunction } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { IoChevronForwardOutline } from '@qwikest/icons/ionicons';

type Props = {
  class?: string | string[];
  classCenter?: string | string[];
  color?: 'base' | 'primary' | 'secondary' | 'transparent';
  overflow?: 'hidden' | 'initial';
  detail?: boolean;
  button?: boolean;
  selected?: boolean;
  padX?: boolean;
  lines?: 'none' | 'full';
  translucent?: boolean;
  to?: string;
  onClick$?: PropFunction<() => void>;
};

export const UiItem = component$<Props>(
  ({
    color = 'base',
    overflow = 'hidden',
    detail = false,
    button = false,
    selected = false,
    padX = true,
    lines = 'full',
    translucent = false,
    to,
    ...props
  }: Props) => {
    return (
      <Link
        class={[
          `      
          ui-item 
          min-h-[44px]
          outline-none      

          select-none

          flex items-center relative              

          [&>.ui-icon]:my-4 [&>.ui-icon]:mr-4
          [&>.ui-item-start>.ui-icon]:my-4 [&>.ui-item-start>.ui-icon]:mr-4
          `,
          lines === 'full' && 'border-b',
          padX && 'px-4',
          overflow === 'hidden' && 'overflow-hidden',
          button && 'cursor-pointer',
          color === 'base' &&
            !translucent &&
            `
          bg-white text-gray-900 dark:bg-gray-900 dark:text-white
          `,
          color === 'transparent' && 'bg-transparent',
          translucent && 'backdrop-blur bg-white/60 dark:bg-gray-900/60',
          translucent || color === 'transparent'
            ? 'border-light-300/60 dark:border-white/5'
            : 'border-light-300 dark:border-white/5',
          selected &&
            color !== 'transparent' &&
            '!bg-light-200 dark:!bg-darkcustomhover',
          selected &&
            color === 'transparent' &&
            '!bg-light-400/70 dark:!bg-darkcustomhover/80',
          to && 'cursor-pointer',
          props.onClick$ && 'cursor-pointer',
          props.class && props.class,
        ]}
        href={to}
        onClick$={props.onClick$}
      >
        <div class="flex ui-item-start flex-grow-0 flex-shrink basis-auto">
          <Slot name="start"></Slot>
        </div>
        <div
          class={[
            `flex flex-grow flex-shrink basis-auto`,
            props.classCenter && props.classCenter,
          ]}
        >
          <Slot></Slot>
        </div>
        <div class="flex ui-item-end flex-grow-0 flex-shrink basis-auto gap-2">
          <Slot name="end"></Slot>

          <div
            class={[
              `
                absolute top-[10px] end-[10px] 
                flex items-center
                text-gray-500 dark:text-gray-400
              `,
            ]}
          >
            <Slot name="endtop"></Slot>
          </div>

          <div class="absolute bottom-[10px] end-[17px] max-w-[20%]">
            <Slot name="endbottom"></Slot>
          </div>

          {detail && (
            <div class="ml-3 flex-shrink-0 h-5 w-5 text-gray-500 dark:text-gray-400">
              <IoChevronForwardOutline class="h-5 w-5" />
            </div>
          )}
        </div>
      </Link>
    );
  },
);
