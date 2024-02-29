import {
  Slot,
  component$,
  type PropFunction,
  $,
  type QRL,
} from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { IoChevronForwardOutline } from '@qwikest/icons/ionicons';

type Props = {
  class?: string | string[];
  classCenter?: string | string[];
  color?: 'base' | 'primary' | 'secondary' | 'transparent';
  overflow?: 'hidden' | 'initial';
  detail?: boolean;
  button?: boolean;
  selected?: boolean;
  pad?: boolean;
  lines?: 'none' | 'full';
  translucent?: boolean;
  to?: string;
  onClick$?: PropFunction<() => void>;
  border?: 'top' | 'right' | 'bottom' | 'left' | 'none';
  role?: string;
  tabIndex?: number | undefined;
};

export const UiItem = component$<Props>(
  ({
    color = 'base',
    overflow = 'initial',
    detail = false,
    button = false,
    selected = false,
    pad = true,
    lines = 'full',
    translucent = false,
    to,
    onClick$,
    border = 'bottom',
    role,
    tabIndex,
    ...props
  }: Props) => {
    const navigate = useNavigate();
    const onClick = onClick$ as QRL<Function | undefined> | undefined;
    return (
      <div
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

          pad && 'px-4 py-1.5',
          overflow === 'hidden' && 'overflow-hidden',
          button && 'cursor-pointer',
          color === 'base' &&
            !translucent &&
            `
          bg-base-100 text-base-content
          `,
          translucent && 'backdrop-blur bg-base-100/60',
          translucent || color === 'transparent'
            ? 'border-base-300/60'
            : 'border-base-300',
          selected && color !== 'transparent' && '!bg-base-200',
          selected && color === 'transparent' && '!bg-base-300/70',
          to && 'cursor-pointer',
          onClick && 'cursor-pointer',

          lines === 'full' && [
            {
              'border-t': border === 'top',
              'border-r': border === 'right',
              'border-b': border === 'bottom',
              'border-l': border === 'left',
            },
          ],

          props.class,
        ]}
        onClick$={$(() => {
          if (to) {
            navigate(to);
          }
          onClick && onClick();
        })}
        role={role}
        tabIndex={tabIndex}
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
                text-text-base-content/60
              `,
            ]}
          >
            <Slot name="endtop"></Slot>
          </div>

          <div class="absolute bottom-[10px] end-[17px] max-w-[20%]">
            <Slot name="endbottom"></Slot>
          </div>

          {detail && (
            <div class="ml-3 flex-shrink-0 h-5 w-5 text-text-base-content/60">
              <IoChevronForwardOutline class="h-5 w-5 text-base-content/60" />
            </div>
          )}
        </div>
      </div>
    );
  },
);
