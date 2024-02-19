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
          focus-visible:outline-primary
          
          flex justify-center items-center gap-x-1.5
          text-sm font-semibold
          `,

          fillStyle.value !== 'clear' && 'rounded-md shadow-sm',

          fillStyle.value === 'solid' &&
            color === 'primary' &&
            `
          bg-primary text-primary-content hover:bg-primary/90
          `,

          fillStyle.value === 'solid' &&
            color === 'secondary' &&
            `
          bg-secondary
          text-secondary-content
          hover:bg-secondary-content/5    
          `,

          fillStyle.value === 'clear' &&
            color === 'primary' &&
            `
          text-primary hover:text-primary
          `,

          fillStyle.value === 'clear' &&
            color === 'secondary' &&
            `
          text-base-content
          hover:text-base-content/90
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
