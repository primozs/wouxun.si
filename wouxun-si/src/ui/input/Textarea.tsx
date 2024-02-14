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
        'bg-white dark:bg-gray-700',
        'placeholder-gray-400 dark:placeholder-gray-400',
        'border-gray-300 dark:border-transparent',
        'focus:border-primary-500 dark:focus:border-white',
        'focus:text-gray-900 dark:focus:text-gray-900',
        'focus:outline-none focus:ring-1',
        'focus:ring-primary-500 dark:focus:ring-white',
        props.class,
      ]}
    />
  );
});
