import { component$, Slot } from '@builder.io/qwik';

type Props = {
  class?: string | string[];
};

export const FormDivider = component$((props: Props) => {
  return (
    <div
      class={['space-y-6 divide-y divide-base-300 sm:space-y-5', props.class]}
    >
      <Slot />
    </div>
  );
});
