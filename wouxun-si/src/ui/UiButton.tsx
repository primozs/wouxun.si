import {
  Slot,
  component$,
  useComputed$,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';

type Props = QwikIntrinsicElements['button'] & {
  color?: 'primary' | 'secondary' | '';
  fill?: 'default' | 'clear' | 'outline' | 'solid';
  padding?: boolean;
};

export const UiButton = component$<Props>(
  ({
    color = 'primary',
    fill = 'default',
    padding = true,
    ...props
  }: Props) => {
    const fillStyle = useComputed$(() => {
      // if (buttons.buttonsParent && props.fill === 'default') {
      //   return 'clear';
      // }
      if (fill === 'default' || fill === 'solid') return 'solid';
      return fill;
    });
    return (
      <button
        {...props}
        class={[
          `
          ui-button
          focus-visible:outline 
          focus-visible:outline-2 
          focus-visible:outline-offset-2 
          focus-visible:outline-primary-600 dark:focus-visible:outline-white
          
          flex justify-center items-center gap-x-1.5
          text-sm font-semibold
          `,

          fillStyle.value !== 'clear' && 'rounded-md shadow-sm',

          fillStyle.value === 'solid' &&
            color === 'primary' &&
            `
          bg-primary-600 text-white hover:bg-primary-500
          `,

          fillStyle.value === 'solid' &&
            color === 'secondary' &&
            `
          bg-gray-100 dark:bg-gray-800
          text-gray-800 dark:text-gray-400 
          hover:bg-gray-200 dark:hover:bg-gray-700
          `,

          fillStyle.value === 'clear' &&
            color === 'primary' &&
            `
          text-primary-600 hover:text-primary-500
          `,

          fillStyle.value === 'clear' &&
            color === 'secondary' &&
            `
          text-gray-800 dark:text-gray-400 
          hover:text-gray-700 dark:hover:text-gray-300
          `,
          padding && 'p-2',
          props.class && props.class,
        ]}
      >
        <Slot name="start"></Slot>
        <span>
          <Slot></Slot>
        </span>
        <Slot name="end"></Slot>
      </button>
    );
  },
);
