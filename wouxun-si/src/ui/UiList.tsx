import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
  inset?: boolean;
  role?: string;
};

export const UiList = component$<Props>(({ inset = false, ...props }) => {
  return (
    <div
      class={[
        `      
            flex flex-col    
          `,

        inset &&
          `
            m-4
            [&>.ui-list-header:first-child]:rounded-t-xl
            [&>.ui-list-header:first-child]:pt-3
    
            [&>.ui-item:first-child]:rounded-t-xl
            [&>.ui-item:last-child]:rounded-b-xl
          `,
        props.class && props.class,
      ]}
      role={props.role}
    >
      <Slot></Slot>
    </div>
  );
});
