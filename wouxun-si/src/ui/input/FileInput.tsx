import {
  component$,
  type NoSerialize,
  type QRL,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { InputError } from './InputError';
import { InputLabel } from './InputLabel';

type FileInputProps = {
  ref: QRL<(element: HTMLInputElement) => void>;
  name: string;
  value:
    | NoSerialize<Blob>
    | NoSerialize<Blob>[]
    | NoSerialize<File>
    | NoSerialize<File>[]
    | null
    | undefined;
  onInput$: (event: Event, element: HTMLInputElement) => void;
  onChange$: (event: Event, element: HTMLInputElement) => void;
  onBlur$: (event: Event, element: HTMLInputElement) => void;
  accept?: string;
  required?: boolean;
  multiple?: boolean;
  class?: string;
  label?: string;
  error?: string;
};

/**
 * File input field that users can click or drag files into. Various
 * decorations can be displayed in or around the field to communicate the entry
 * requirements.
 */
export const FileInput = component$(
  ({ value, label, error, ...props }: FileInputProps) => {
    const { name, required, multiple } = props;

    // Create computed value of selected files
    const files = useSignal<NoSerialize<Blob>[] | NoSerialize<File>[]>();
    useTask$(({ track }) => {
      track(() => value);
      files.value = value ? (Array.isArray(value) ? value : [value]) : [];
    });

    return (
      <div class={['px-8 lg:px-10', props.class]}>
        <InputLabel name={name} label={label} required={required} />
        <label
          class={[
            'relative flex min-h-[96px] w-full items-center justify-center rounded-2xl border-[3px] border-dashed border-slate-200 p-8 text-center focus-within:border-sky-600/50 hover:border-slate-300 dark:border-slate-800 dark:focus-within:border-sky-400/50 dark:hover:border-slate-700 md:min-h-[112px] md:text-lg lg:min-h-[128px] lg:p-10 lg:text-xl',
            !files.value?.length && 'text-slate-500',
          ]}
        >
          {files.value?.length
            ? `Selected file${multiple ? 's' : ''}: ${files.value
                // @ts-ignore
                .map((file) => file!.name)
                .join(', ')}`
            : `Click or drag and drop file${multiple ? 's' : ''}`}
          <input
            {...props}
            class="absolute h-full w-full cursor-pointer opacity-0"
            type="file"
            id={name}
            aria-invalid={!!error}
            aria-errormessage={`${name}-error`}
          />
        </label>
        <InputError name={name} error={error} />
      </div>
    );
  },
);
