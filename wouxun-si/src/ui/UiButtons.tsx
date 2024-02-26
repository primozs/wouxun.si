import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
};

export const UiButtons = component$<Props>((props) => {
  return (
    <div
      class={[
        `
        ui-buttons
  
        [&>.ui-button>span]:max-w-[70px]
        [&>.ui-button>span]:whitespace-nowrap
        [&>.ui-button>span]:overflow-hidden 
        [&>.ui-button>span]:text-ellipsis
      `,
        props.class,
      ]}
    >
      <Slot></Slot>
    </div>
  );
});
