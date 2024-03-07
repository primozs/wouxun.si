import {
  type QRL,
  type QwikIntrinsicElements,
  Slot,
  component$,
} from '@builder.io/qwik';

export interface UiRadioOptionProps {
  ref?: QRL<(element: HTMLInputElement) => void>;
  name: string;
  value?: string;
  checked?: boolean;
  onInput$?: (event: Event, element: HTMLInputElement) => void;
  onChange$?: (event: Event, element: HTMLInputElement) => void;
  onBlur$?: (event: Event, element: HTMLInputElement) => void;
  required?: boolean;
  class?: QwikIntrinsicElements['div']['class'];
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary';
}

export const UiRadio = component$<UiRadioOptionProps>(
  ({ size = 'sm', color = 'primary', ...props }) => {
    return (
      <label
        role="radio"
        aria-checked="true"
        class={[
          `
          relative
          flex items-center justify-between w-full          
          gap-x-4 py-2 px-6 mb-1        
          cursor-pointer
          border border-base-300 rounded-lg          
          focus:outline-none          
          hover:shadow-base-300
          hover:shadow-md
          `,
        ]}
      >
        <Slot></Slot>

        <input
          type="radio"
          {...props}
          class={[
            'radio',
            {
              'radio-xs': size === 'xs',
              'radio-sm': size === 'sm',
              'radio-md': size === 'md',
              'radio-lg': size === 'lg',
            },
            {
              'radio-primary': color === 'primary',
              'radio-secondary': color === 'secondary',
            },
          ]}
        />

        <Slot name="end"></Slot>
      </label>
    );
  },
);
