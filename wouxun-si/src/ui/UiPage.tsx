import { Slot, component$ } from '@builder.io/qwik';

export interface UiPageProps {
  class?: string | string[];
}

export const UiPage = component$<UiPageProps>((props) => {
  return (
    <div
      class={[
        `
          ui-page
          h-[100dvh]
          w-full
          flex flex-col
          overflow-hidden
          justify-between
          z-0
        `,
        props.class,
      ]}
    >
      <Slot></Slot>
    </div>
  );
});
