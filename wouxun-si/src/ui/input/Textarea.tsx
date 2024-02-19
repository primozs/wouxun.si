import type { QwikIntrinsicElements } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';

type Props = QwikIntrinsicElements['textarea'];

export const Textarea = component$((props: Props) => {
  return (
    <textarea
      {...props}
      class={[
        'block w-full max-w-lg rounded-md',
        'sm:text-sm shadow-sm',
        'bg-base-100',
        'placeholder-base-content/50',
        'border-base-content/20',
        'focus:border-primary',
        'focus:text-base-content',
        'focus:outline-none focus:ring-1',
        'focus:ring-primary',
        props.class,
      ]}
    />
  );
});
