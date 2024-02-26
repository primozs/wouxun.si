import { $, Slot, component$, useSignal } from '@builder.io/qwik';
import { useClickOutside } from './hooks/useClickOutside';
import { Button, type ButtonProps } from './button';

type Props = ButtonProps & {
  label: string;
};

export const UiDropdown = component$<Props>(({ label, ...props }) => {
  const expanded = useSignal(false);
  const ref = useSignal<HTMLElement>();

  useClickOutside(
    ref,
    $(() => {
      expanded.value = false;
    }),
  );

  return (
    <div class="relative">
      <Button
        {...props}
        type="button"
        aria-expanded={expanded.value ? 'true' : 'false'}
        aria-haspopup="true"
        aria-label={label}
        onClick$={() => {
          expanded.value = !expanded.value;
        }}
        ref={ref}
      >
        <span class="sr-only">{label}</span>
        <Slot name="button" />
      </Button>

      <div
        class={[
          `
          w-48
          rounded-sm
          absolute right-0 z-40 mt-2 origin-top-right
          shadow-lg ring-1 ring-base-content ring-opacity-5 focus:outline-none
          bg-base-100
          py-0.5
          menu-dropdown-toggle          
        `,
          expanded.value == false && 'invisible',
        ]}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}
      >
        <Slot name="list" />
      </div>
    </div>
  );
});

// example usage
//
{
  /* <UiDropdown
  color="primary"
  fill="outline"
  intent="square"
  class="hidden md:flex"
  label={$localize`Change language`}
>
  <UiIcon q:slot="button">
    <IoLanguageOutline />
  </UiIcon>

  <UiList q:slot="list">
    <UiItem
      role="menuitem"
      tabIndex={-1}
      onClick$={() => {
        //
      }}
    >
      <UiLabel>English</UiLabel>
    </UiItem>
    <UiItem
      role="menuitem"
      tabIndex={-1}
      lines="none"
      onClick$={() => {
        //
      }}
    >
      <UiLabel>Slovenščina</UiLabel>
    </UiItem>
  </UiList>
</UiDropdown> */
}
