import { Slot, component$ } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
};

export const UiSplitPane = component$<Props>((props) => {
  return (
    <div
      class={[
        `ui-split-pane
            h-full 
            overflow-x-hidden
            flex flex-wrap sm:flex-nowrap
          `,
        props.class,
      ]}
    >
      <div
        class={[
          `
          ui-split-pane-start
          flex flex-col 
          flex-grow sm:flex-grow-0 flex-shrink-0 basis-auto
        `,
        ]}
      >
        <Slot name="start"></Slot>
      </div>

      <div
        class={[
          `        
          ui-split-pane-center
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
          ui-split-pane-end
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
