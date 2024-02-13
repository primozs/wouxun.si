import type { QwikIntrinsicElements } from '@builder.io/qwik';
import { component$, Slot } from '@builder.io/qwik';

type Props = QwikIntrinsicElements['label'];

export const InputLabel1 = component$((props: Props) => {
  return (
    <label
      {...props}
      class={[
        `block text-sm font-medium
        text-gray-700 dark:text-gray-200
      `,
        props.class,
      ]}
    >
      <Slot />
    </label>
  );
});

type InputLabelProps = {
  name: string;
  label?: string;
  required?: boolean;
  margin?: 'none';
};

/**
 * Input label for a form field.
 */
export const InputLabel = component$(
  ({ name, label, required, margin }: InputLabelProps) => (
    <>
      {label && (
        <label
          class={[
            `
          inline-block text-sm font-medium 
          text-gray-700 dark:text-gray-200
          `,
            !margin && 'mb-1',
          ]}
          for={name}
        >
          {label}{' '}
          {required && (
            <span class="ml-1 text-error-600 dark:text-error-400">*</span>
          )}
        </label>
      )}
    </>
  ),
);
