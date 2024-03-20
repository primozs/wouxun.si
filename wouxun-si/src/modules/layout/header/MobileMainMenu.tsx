import { type Signal, component$ } from '@builder.io/qwik';
import { Button } from '~/ui/button';
import { MainNavigation } from '../MainNavigation';
import { IoCloseOutline } from '@qwikest/icons/ionicons';
import { HiBars3Outline } from '@qwikest/icons/heroicons';
import { UiContent } from '~/ui/UiContent';
import { ThemeListItem } from '~/modules/theme/ThemeSwitcher';
import { SwitchLocaleListItem } from '~/modules/locale/SwitchLocale';
import { Logo } from './logo';
import { UiItem } from '~/ui/UiItem';
import { UiIcon } from '~/ui/UiIcon';

export interface MobileMenuProps {
  visible: Signal<boolean>;
}

export const MobileMainMenu = component$<MobileMenuProps>((props) => {
  return (
    <>
      <div
        class={[
          `
          bg-base-100 absolute h-screen w-full z-10 
          transition-all ease-in-out duration-200 opacity-0
          -left-full
          motion-reduce:transition-none
          top-0
          sm:max-w-96
          border-r border-base-300
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
          <UiItem q:slot="start" lines="none" class="py-4 items-center">
            <Logo />
            {props.visible.value && (
              <Button
                q:slot="end"
                type="button"
                onClick$={() => {
                  props.visible.value = false;
                }}
                intent="square"
                color="neutral"
                class="btn-sm"
              >
                <span class="sr-only">{$localize`Close main menu`}</span>
                <IoCloseOutline class="h-5 w-5" />
              </Button>
            )}
          </UiItem>

          {props.visible.value && (
            <div
              class="space-y-1 p-10"
              onClick$={() => {
                props.visible.value = false;
              }}
            >
              <MainNavigation isMobile={true} />
            </div>
          )}

          <SwitchLocaleListItem q:slot="end" />
          <ThemeListItem q:slot="end" />
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
    return (
      <Button
        type="button"
        intent="square"
        color="ghost"
        aria-controls="mobile-menu"
        aria-expanded="false"
        onClick$={() => {
          const newVal = !props.visible.value;
          if (newVal) window.scrollTo(0, 0);
          props.visible.value = newVal;
        }}
      >
        <span class="sr-only">{$localize`Open main menu`}</span>
        <UiIcon>
          <HiBars3Outline />
        </UiIcon>
        {/* <UiIcon>
          <IoCloseOutline
            class={{
              'h-6 w-6': true,
              hidden: props.visible.value === false,
            }}
          />
        </UiIcon> */}
      </Button>
    );
  },
);
