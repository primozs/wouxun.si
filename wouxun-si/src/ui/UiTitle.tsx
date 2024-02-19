import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
  color?: 'base' | 'primary' | 'secondary';
  size?: 'base' | 'lg' | 'xl' | '2xl';
};

export const UiTitle = component$<Props>(
  ({ color = 'base', size = 'base', ...props }: Props) => {
    return (
      <div
        class={[
          `      
        ui-title    
        whitespace-nowrap overflow-hidden text-ellipsis          
        py-[3px]        
      `,
          color === 'base' && 'text-base-content',
          color === 'primary' && 'text-primary',
          color === 'secondary' && 'text-secondary',
          size === 'base' && 'font-semibold',
          size === 'lg' && 'text-lg font-semibold',
          size === 'xl' && 'text-xl font-semibold',
          size === '2xl' && 'text-2xl font-medium leading-8',
          props.class && props.class,
        ]}
      >
        <Slot></Slot>
      </div>
    );
  },
);
