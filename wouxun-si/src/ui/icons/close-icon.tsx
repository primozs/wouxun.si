import { component$, type QwikIntrinsicElements } from '@builder.io/qwik';

type Props = {
  class?: QwikIntrinsicElements['svg']['class'] | string;
};

export const CloseIcon = component$((props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="h-6 w-6"
      aria-hidden="true"
      {...props}
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
});
