import { component$, type QRL, useSignal, useTask$ } from '@builder.io/qwik';
import { InputError } from './InputError';
import { InputLabel } from './InputLabel';

type SelectProps = {
  ref: QRL<(element: HTMLSelectElement) => void>;
  name: string;
  value: string | string[] | null | undefined;
  onInput$: (event: Event, element: HTMLSelectElement) => void;
  onChange$: (event: Event, element: HTMLSelectElement) => void;
  onBlur$: (event: Event, element: HTMLSelectElement) => void;
  options: { label: string; value: string }[];
  multiple?: boolean;
  size?: number;
  placeholder?: string;
  required?: boolean;
  class?: string;
  label?: string;
  error?: string;
};

/**
 * Select field that allows users to select predefined values. Various
 * decorations can be displayed in or around the field to communicate the
 * entry requirements.
 */
export const Select = component$(
  ({
    value,
    options,
    label,
    error,
    multiple = false,
    ...props
  }: SelectProps) => {
    const { name, required, placeholder } = props;

    // Create computed value of selected values
    const values = useSignal<string[]>();
    useTask$(({ track }) => {
      track(() => value);
      values.value = Array.isArray(value)
        ? value
        : value && typeof value === 'string'
          ? [value]
          : [];
    });

    return (
      <div class={[props.class]}>
        <InputLabel name={name} label={label} required={required} />
        <div class="relative flex items-center">
          <select
            {...props}
            class={[
              multiple ? 'form-multiselect' : 'form-select',
              `            
            block w-full appearance-none rounded-sm border
            
            shadow-sm
            bg-base-100
            
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
              placeholder && !values.value?.length && 'text-base-content/50',
              multiple && 'py-3',
            ]}
            id={name}
            aria-invalid={!!error}
            aria-errormessage={`${name}-error`}
            multiple={multiple}
          >
            <option value="" disabled hidden selected={!value}>
              {placeholder}
            </option>
            {options.map(({ label, value }) => {
              const selected = values.value?.includes(value);
              return (
                <option key={value} value={value} selected={selected}>
                  {label}
                </option>
              );
            })}
          </select>
          {/* {!multiple && (
            <IoChevronDownOutline class="pointer-events-none absolute right-2.5 h-5" />
          )} */}
        </div>
        <InputError name={name} error={error} />
      </div>
    );
  },
);
