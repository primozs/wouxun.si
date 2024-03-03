import { component$, type QwikIntrinsicElements, Slot } from '@builder.io/qwik';

type Props = {
  class?: QwikIntrinsicElements['div']['class'];
};

export const UiDivider = component$<Props>((props) => {
  return (
    <div
      class={[
        'divider divider-neutral text-neutral-content/60 text-sm',
        props.class,
      ]}
    >
      <Slot />
    </div>
  );
});
