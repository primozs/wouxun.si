import { Slot, component$, useStyles$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
  color?: 'base' | 'light' | 'primary' | 'dark';
  weight?: 'font-normal' | 'font-medium' | 'font-semibold';
  marginY?: 'base' | 'none';
};

export const UiLabel = component$<Props>(
  ({ color = 'base', marginY = 'base', weight = 'normal', ...props }) => {
    useStyles$(`
    .ui-label h1 {
      margin-left: 0;
      margin-right: 0;
      margin-top: 3px;
      margin-bottom: 2px;
      font-size: 1rem;
      font-weight: bolder;
    }
    .ui-label h2 {
      margin-left: 0;
      margin-right: 0;
      margin-top: 0;
      margin-bottom: 2px;
      font-size: 0.95rem;
      font-weight: bolder;
    }
    
    .ui-label h3 {
      margin-left: 0;
      margin-right: 0;
      margin-top: 0;
      margin-bottom: 2px;
      font-size: 0.8rem;
      font-weight: normal;
    }
    
    .ui-label p,
    .ui-label span {
      margin-left: 0;
      margin-right: 0;
      margin-top: 0;
      margin-bottom: 2px;
      font-size: 0.875rem;
      line-height: normal;
      text-overflow: inherit;
      overflow: inherit;
    }  
  `);
    return (
      <div
        class={[
          `
      ui-label
      whitespace-nowrap overflow-hidden text-ellipsis      
      flex-1    
      ms-0 me-2
      `,
          color === 'base' && 'text-gray-900 dark:text-white',
          color === 'light' && 'text-gray-500 dark:text-gray-500',
          color === 'primary' && 'text-primary-600',
          color === 'dark' && 'text-gray-800 dark:text-gray-400',
          marginY === 'base' && 'my-2',
          weight,
          props.class && props.class,
        ]}
      >
        <Slot></Slot>
      </div>
    );
  },
);
