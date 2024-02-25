import { type QwikIntrinsicElements, component$ } from '@builder.io/qwik';

export interface UiToggleProps {
  class?: string;
  checked?: boolean;
  title?: string;
  onClick$?: QwikIntrinsicElements['button']['onClick$'];
}

export const UiToggle = component$<UiToggleProps>(
  ({ checked = false, title = 'Toggle button', ...props }) => {
    return (
      <>
        <button
          {...props}
          class={[
            `
          relative inline-flex h-[34px] w-[54px] shrink-0 cursor-pointer rounded-full
          border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2
            focus-visible:ring-primary-content focus-visible:ring-opacity-75
          `,
            checked ? 'bg-primary' : 'bg-base-300',
            props.class,
          ]}
          aria-pressed={checked ? 'true' : 'false'}
          aria-label={title}
        >
          {title && <span class="sr-only">{title}</span>}
          <span
            aria-hidden="true"
            class={[
              `
              pointer-events-none inline-block h-[30px] w-[30px] transform 
              rounded-full bg-primary-content shadow-lg ring-0 transition duration-200 ease-in-out
              `,
              checked ? 'translate-x-5' : 'translate-x-0',
            ]}
          />
        </button>
      </>
    );
  },
);
