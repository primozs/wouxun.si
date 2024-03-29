import { component$, type QwikIntrinsicElements } from '@builder.io/qwik';

export interface LoadingDotsProps {
  class?: QwikIntrinsicElements['div']['class'];
}

export const LoadingDots = component$<LoadingDotsProps>((props) => {
  return (
    <span class="mx-2 inline-flex items-center">
      <span
        class={[
          'mx-[1px] inline-block h-1 w-1 animate-blink rounded-md',
          props.class,
        ]}
      />
      <span
        class={[
          'mx-[1px] inline-block h-1 w-1 animate-blink rounded-md',
          'animation-delay-[200ms]',
          props.class,
        ]}
      />
      <span
        class={[
          'mx-[1px] inline-block h-1 w-1 animate-blink rounded-md',
          'animation-delay-[400ms]',
          props.class,
        ]}
      />
    </span>
  );
});
