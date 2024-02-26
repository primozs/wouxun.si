import { Slot, component$, useStyles$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
  color?: 'base' | 'light' | 'primary';
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
          color === 'base' && 'text-base-content',
          color === 'light' && 'text-base-content/60',
          color === 'primary' && 'text-primary',
          marginY === 'base' && 'my-2',
          weight,
          props.class,
        ]}
      >
        <Slot></Slot>
      </div>
    );
  },
);
