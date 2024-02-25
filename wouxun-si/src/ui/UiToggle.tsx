import {
  type QwikIntrinsicElements,
  component$,
  type Signal,
  type QRL,
} from '@builder.io/qwik';

export interface UiToggleProps {
  class?: string;
  checked?: boolean;
  label: string;
  onClick$?: QwikIntrinsicElements['label']['onClick$'];
  onCheckboxClick$?: QwikIntrinsicElements['input']['onClick$'];
  name?: string;
  checkbox?: boolean;
  ref?: Signal<HTMLInputElement>;
}

export const UiToggle = component$<UiToggleProps>(
  ({
    checked = false,
    label,
    name,
    checkbox = false,
    ref,
    onCheckboxClick$,
    ...props
  }) => {
    const onCheckboxClick = onCheckboxClick$ as QRL<Function | undefined>;
    return (
      <label
        {...props}
        for={name}
        class={[
          `
            relative inline-flex h-[34px] w-[54px] shrink-0 cursor-pointer rounded-full
            border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2
            focus-visible:ring-primary-content focus-visible:ring-opacity-75
            has-[:checked]:bg-primary
          `,
          checked ? 'bg-primary' : 'bg-base-300',
          props.class,
        ]}
        // button
        // aria-pressed={checked ? 'true' : 'false'}
        // aria-label={label}
        // div
        // role="switch"
        // aria-checked={checked ? 'true' : 'false'}
      >
        {checkbox && (
          <input
            ref={ref}
            id={name}
            name={name}
            type="checkbox"
            class="hidden peer"
            checked={checked}
            onClick$={onCheckboxClick}
          />
        )}

        {label && <span class="sr-only">{label}</span>}

        <span
          aria-hidden="true"
          class={[
            `
              pointer-events-none inline-block h-[30px] w-[30px] transform 
              rounded-full bg-primary-content shadow-lg ring-0 transition duration-200 ease-in-out
              peer-checked:translate-x-5
              `,
            checked ? 'translate-x-5' : 'translate-x-0',
          ]}
        />
      </label>
    );
  },
);
