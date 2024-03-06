import {
  type QwikIntrinsicElements,
  Slot,
  component$,
  type PropFunction,
  useSignal,
  $,
} from '@builder.io/qwik';
import { IoChevronExpandOutline } from '@qwikest/icons/ionicons';
import { useClickOutside } from './hooks/useClickOutside';

export interface UiSelectProps {
  label: string;
  class?: QwikIntrinsicElements['div']['class'];
  disabled?: boolean;
  border?: boolean;
  labelPlacement?: 'stacked' | 'inline';
  value: string | undefined;
  onClick$?: PropFunction<() => void>;
  dropdown?: boolean;
}

export const UiSelect = component$<UiSelectProps>(
  ({ labelPlacement = 'stacked', onClick$, dropdown = true, ...props }) => {
    const expanded = useSignal(false);
    const ref = useSignal<HTMLElement>();

    useClickOutside(
      ref,
      $(() => {
        expanded.value = false;
      }),
    );

    return (
      <>
        <div
          tabIndex={0}
          class={[
            `
          flex flex-col
          relative w-full py-3 px-3
          focus-visible:outline 
          focus-visible:outline-2 
          focus-visible:outline-offset-1 
          focus-visible:outline-primary
          rounded-md
          bg-base-200
          `,
            props.disabled && 'opacity-60',
            props.class,
          ]}
        >
          <div class="text-xs">{props.label}</div>

          <button
            class={[
              `
              text-left
              cursor-pointer          
              w-full rounded-sm 
              outline-none
              placeholder-gray-400
              `,
              props.border &&
                `
              bg-base-100 
              border-base-300
              border shadow-sm            
              `,
            ]}
            aria-expanded="true"
            aria-haspopup="true"
            onClick$={() => {
              onClick$ && onClick$();
              if (dropdown) {
                expanded.value = !expanded.value;
              }
            }}
            ref={ref}
          >
            <span class="block truncate">
              <Slot name="selected"></Slot>

              {!props.value && labelPlacement !== 'stacked' && (
                <span>{props.label}</span>
              )}

              {!props.value && labelPlacement === 'stacked' && (
                <span>{$localize`Nothing selected`}</span>
              )}
            </span>
            <span
              class={[
                `
              pointer-events-none absolute 
              inset-y-0 right-3 flex items-center
              `,
              ]}
            >
              <IoChevronExpandOutline
                class="h-5 w-5 text-base-content/60"
                aria-hidden="true"
              />
            </span>
          </button>

          {expanded.value && (
            <ul
              class={[
                [
                  `
              absolute right-0 origin-bottom-right z-10 mt-14 w-full py-1
              overflow-auto rounded-sm shadow-lg
              ring-1 ring-opacity-5
              focus:outline-none
              bg-base-100
              ring-base-content
              scrollbar-thin scrollbar-thumb-rounded-full        
              `,
                ],
              ]}
            >
              <Slot></Slot>
            </ul>
          )}
        </div>
      </>
    );
  },
);

export type UiSelectOptionProps = QwikIntrinsicElements['li'];

export const UiSelectOption = component$<UiSelectOptionProps>(
  ({ ...props }) => {
    return (
      <li
        {...props}
        class={[
          `
          py-2 pl-4 pr-4
          cursor-pointer
          relative text-base-content 
          select-none
          hover:bg-base-200
          focus-visible:outline-none
          focus-visible:ring-2
          focus-visible:ring-offset-1
          focus-visible:ring-primary
          tracking-wide
          text-base
          border-b border-base-300
          `,
        ]}
        role="menuitem"
        tabIndex={-1}
      >
        <span class={['font-normal block truncate']}>
          <Slot></Slot>
        </span>
      </li>
    );
  },
);
