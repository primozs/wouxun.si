import { component$, type QRL } from '@builder.io/qwik';
import { InputHelper } from './InputHelper';

type CheckboxProps = {
  ref: QRL<(element: HTMLInputElement) => void>;
  name: string;
  value?: string;
  checked?: boolean;
  onInput$: (event: Event, element: HTMLInputElement) => void;
  onChange$: (event: Event, element: HTMLInputElement) => void;
  onBlur$: (event: Event, element: HTMLInputElement) => void;
  required?: boolean;
  class?: string;
  label: string;
  error?: string;
  size?: 'base' | 'xs' | 'sm' | 'md';
  color?: 'base' | 'primary' | 'secondary';
};

export const Checkbox = component$(
  ({
    label,
    error,
    class: className,
    size = 'base',
    color = 'primary',
    ...props
  }: CheckboxProps) => {
    const { name, required } = props;
    return (
      <div>
        <div class={['relative flex items-start', className]}>
          <label
            class={[
              'flex select-none space-x-3 items-center',
              'text-sm font-medium leading-6 text-base-content',
            ]}
          >
            <input
              {...props}
              class={[
                'checkbox rounded-sm',
                {
                  'h-5 w-5': size === 'base',
                  'checkbox-xs': size === 'xs',
                  'checkbox-sm': size === 'sm',
                  'checkbox-md': size === 'md',
                },
                {
                  'checkbox-primary': color === 'primary',
                  'checkbox-secondary': color === 'secondary',
                },
              ]}
              type="checkbox"
              id={name}
              aria-invalid={!!error}
              aria-errormessage={`${name}-error`}
            />
            <span>{label}</span>{' '}
            {required && <span class="ml-1 text-error">*</span>}
          </label>
        </div>
        <InputHelper id={`${name}-error`} error={!!error} intent="error">
          {error}
        </InputHelper>
      </div>
    );
  },
);
