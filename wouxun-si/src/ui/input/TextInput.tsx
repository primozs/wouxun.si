import {
  component$,
  useSignal,
  useTask$,
  Slot,
  type QwikIntrinsicElements,
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
  ref?: QwikIntrinsicElements['input']['ref'];
  onInput$?: (event: Event, element: HTMLInputElement) => void;
  onChange$?: (event: Event, element: HTMLInputElement) => void;
  onBlur$?: (event: Event, element: HTMLInputElement) => void;
  class?: string;
  form?: string;
  disabled?: boolean;
  labelHidden?: boolean;
  errorHidden?: boolean;
  id?: string;
};

export const TextInput = component$(
  ({
    label,
    value,
    error,
    labelHidden = false,
    errorHidden = false,
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
        <div class={['relative', labelHidden === false && 'mt-1']}>
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
            bg-base-100
            
            placeholder-base-content/50
            
            focus:text-base-content
            focus:outline-none focus:ring-1
            focus:ring-primary
            sm:text-sm

            disabled:cursor-not-allowed 
            disabled:bg-base-200 
            disabled:text-base-content/40 
            disabled:ring-base-300
            `,
              error
                ? 'border-error'
                : `
              border-base-content/20
              hover:border-base-content/30
              focus:border-primary
              `,
              props.class,
            ]}
          />
          <Slot name="icon-right" />
          <InputErrorIcon isError={!!error} />
        </div>
        {errorHidden === false && (
          <InputHelper id={`${name}-error`} error={!!error} intent="error">
            {error}
          </InputHelper>
        )}
      </div>
    );
  },
);
