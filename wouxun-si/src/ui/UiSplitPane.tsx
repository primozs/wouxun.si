import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
};

export const UiSplitPane = component$<Props>((props) => {
  return (
    <div
      class={[
        `
            h-full 
            overflow-x-hidden
            flex flex-wrap sm:flex-nowrap
          `,
        props.class && props.class,
      ]}
    >
      <div
        class={[
          `
          flex flex-col 
          flex-grow-0 flex-shrink-0 basis-auto
        `,
        ]}
      >
        <Slot name="start"></Slot>
      </div>

      <div
        class={[
          `        
          flex flex-col 
          flex-grow flex-shrink basis-auto
        `,
        ]}
      >
        <Slot></Slot>
      </div>

      <div
        class={[
          `      
          flex flex-col 
          flex-grow-0 flex-shrink-0 basis-auto
        `,
        ]}
      >
        <Slot name="end"></Slot>
      </div>
    </div>
  );
});
