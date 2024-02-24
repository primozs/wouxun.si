import { type Signal, component$, useSignal, $ } from '@builder.io/qwik';
import { useClickOutside } from '~/ui/hooks/useClickOutside';
import { Button } from '~/ui/button';
import { MainNavigation } from '../MainNavigation';
import { IoCloseOutline } from '@qwikest/icons/ionicons';
import { HiBars3Outline } from '@qwikest/icons/heroicons';
import { UiContent } from '~/ui/UiContent';
import { UiItem } from '~/ui/UiItem';
import { IoMoonOutline } from '@qwikest/icons/ionicons';
import { UiIcon } from '~/ui/UiIcon';
import { UiLabel } from '~/ui/UiLabel';
import { ThemeSwitcher } from '~/modules/theme/ThemeSwitcher';

export interface MobileMenuProps {
  visible: Signal<boolean>;
}

export const MobileMainMenu = component$<MobileMenuProps>((props) => {
  return (
    <>
      <div
        class={[
          `
          bg-base-100 absolute h-screen w-full z-10 sm:hidden
          transition-all ease-in-out duration-200 opacity-0
          -left-full
          motion-reduce:transition-none
          top-0
          `,
          { 'opacity-100 left-0': props.visible.value },
        ]}
        window:onKeyDown$={(e) => {
          const ev: KeyboardEvent = e as unknown as KeyboardEvent;
          if (ev.key === 'Escape') {
            props.visible.value = false;
          }
        }}
        id="mobile-menu"
      >
        <UiContent>
          <div class="space-y-1 p-10">
            <MainNavigation isMobile={true} />
          </div>

          <UiItem q:slot="end" border="top">
            <UiIcon q:slot="start">
              <IoMoonOutline></IoMoonOutline>
            </UiIcon>

            <UiLabel>Night mode</UiLabel>

            <ThemeSwitcher q:slot="end" />
          </UiItem>
        </UiContent>
      </div>
    </>
  );
});

export interface MobileMainMenuButtonProps {
  visible: Signal<boolean>;
}

export const MobileMainMenuButton = component$<MobileMainMenuButtonProps>(
  (props) => {
    const ref = useSignal<HTMLElement>();

    useClickOutside(
      ref,
      $(() => {
        props.visible.value = false;
      }),
    );

    return (
      <Button
        ref={ref}
        type="button"
        intent="square"
        color="primary"
        aria-controls="mobile-menu"
        aria-expanded="false"
        onClick$={() => {
          const newVal = !props.visible.value;
          if (newVal) window.scrollTo(0, 0);
          props.visible.value = newVal;
        }}
        class="sm:hidden"
      >
        <span class="sr-only">Odpri glavni meni</span>
        <HiBars3Outline
          class={{
            'h-6 w-6': true,
            hidden: props.visible.value === true,
          }}
        />
        <IoCloseOutline
          class={{
            'h-6 w-6': true,
            hidden: props.visible.value === false,
          }}
        />
      </Button>
    );
  },
);
