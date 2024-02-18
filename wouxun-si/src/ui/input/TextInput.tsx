import {
  component$,
  useSignal,
  useTask$,
  Slot,
  QwikIntrinsicElements,
} from '@builder.io/qwik';
import { InputLabel } from './InputLabel';
import { InputHelper } from './InputHelper';
import { InputErrorIcon } from './InputErrorIcon';

export type TextInputProps = {
  name: string;
  type: 'text' | 'email' | 'tel' | 'password' | 'url' | 'number' | 'date';
  label?: string;
  placeholder?: string;
  value: string | number | undefined;
  error: string;
  required?: boolean;
  ref: QwikIntrinsicElements['input']['ref'];
  onInput$: (event: Event, element: HTMLInputElement) => void;
  onChange$: (event: Event, element: HTMLInputElement) => void;
  onBlur$: (event: Event, element: HTMLInputElement) => void;
  class?: string;
  form?: string;
  disabled?: boolean;
  labelHidden?: boolean;
};

export const TextInput = component$(
  ({
    label,
    value,
    error,
    labelHidden = false,
    required,
    ...props
  }: TextInputProps) => {
    const { name } = props;
    const input = useSignal<string | number>();
    useTask$(({ track }) => {
      if (!Number.isNaN(track(() => value))) {
        input.value = value;
      }
    });
    return (
      <div>
        <div class="flex justify-between">
          <InputLabel
            name={name}
            label={label}
            required={required}
            class={labelHidden === true ? 'sr-only' : undefined}
          />
          <Slot name="label-end" />
        </div>
        <div class="relative mt-2">
          <input
            {...props}
            id={name}
            value={input.value}
            aria-invalid={!!error}
            aria-errormessage={`${name}-error`}
            class={[
              `
            form-input
            block w-full appearance-none rounded-sm border
            px-3 py-2 pr-10
            shadow-sm
            bg-white dark:bg-gray-700
            
            placeholder-gray-400 dark:placeholder-gray-400
            
            focus:text-gray-800 dark:focus:text-gray-200
            focus:outline-none focus:ring-1
            focus:ring-primary-500 dark:focus:ring-white
            sm:text-sm

            disabled:cursor-not-allowed 
            disabled:bg-gray-50 
            disabled:text-gray-500 
            disabled:ring-gray-200
            `,
              error
                ? 'border-error-600/50 dark:border-error-400/50'
                : `
              border-gray-300 dark:border-transparent
              hover:border-gray-400 dark:hover:border-white
              focus:border-primary-500 dark:focus:border-white
              `,
              props.class,
            ]}
          />
          <Slot name="icon-right" />
          <InputErrorIcon isError={!!error} />
        </div>
        <InputHelper id={`${name}-error`} error={!!error} intent="error">
          {error}
        </InputHelper>
      </div>
    );
  },
);
