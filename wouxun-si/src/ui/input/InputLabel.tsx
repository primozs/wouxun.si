import type { QwikIntrinsicElements } from '@builder.io/qwik';
import { component$, Slot } from '@builder.io/qwik';

type InputLabelProps = {
  name: string;
  label?: string;
  required?: boolean;
  class?: string | string[];
};

export const InputLabel = component$(
  ({ name, label, required, ...rest }: InputLabelProps) => (
    <>
      {label && (
        <label
          class={[
            `
          block text-sm font-medium leading-6
          text-base-content
          `,
            rest.class,
          ]}
          for={name}
        >
          {label} {required && <span class="ml-1 text-error">*</span>}
        </label>
      )}
    </>
  ),
);

type Props = QwikIntrinsicElements['label'];

export const InputLabel1 = component$((props: Props) => {
  return (
    <label
      {...props}
      class={[
        `block text-sm font-medium leading-6
        text-base-content
      `,
        props.class,
      ]}
    >
      <Slot />
    </label>
  );
});
