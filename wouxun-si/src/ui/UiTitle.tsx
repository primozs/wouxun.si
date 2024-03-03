import { Slot, component$, type QwikIntrinsicElements } from '@builder.io/qwik';

type Props = {
  class?: QwikIntrinsicElements['div']['class'];
  color?: 'base' | 'light' | 'primary' | 'secondary';
  size?: 'base' | 'sm' | 'lg' | 'xl' | '2xl';
  as?: 'h1' | 'h2' | 'h3' | 'div';
};

export const UiTitle = component$<Props>(
  ({ as = 'div', color = 'base', size = 'base', ...props }: Props) => {
    return (
      <As
        as={as}
        class={[
          `      
        ui-title    
        whitespace-nowrap overflow-hidden text-ellipsis          
        py-[3px]        
      `,
          color === 'base' && 'text-base-content',
          color === 'light' && 'text-base-content/60',
          color === 'primary' && 'text-primary',
          color === 'secondary' && 'text-secondary',
          size === 'base' && 'font-semibold',
          size === 'sm' && 'text-sm font-semibold',
          size === 'lg' && 'text-lg font-semibold',
          size === 'xl' && 'text-xl font-semibold',
          size === '2xl' && 'text-2xl font-medium leading-8',
          props.class,
        ]}
      >
        <Slot></Slot>
      </As>
    );
  },
);

type AsProps = {
  class?: QwikIntrinsicElements['div']['class'];
  as: 'h1' | 'h2' | 'h3' | 'div';
};
export const As = component$<AsProps>(({ as = 'h1', ...props }) => {
  return (
    <>
      {as === 'h1' && (
        <h1 {...props}>
          <Slot></Slot>
        </h1>
      )}
      {as === 'h2' && (
        <h2 {...props}>
          <Slot></Slot>
        </h2>
      )}
      {as === 'h3' && (
        <h3 {...props}>
          <Slot></Slot>
        </h3>
      )}
      {as === 'div' && (
        <div {...props}>
          <Slot></Slot>
        </div>
      )}
    </>
  );
});
