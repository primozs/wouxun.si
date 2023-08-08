import { type Signal, component$, useSignal, $ } from '@builder.io/qwik';
import { useClickOutside } from '~/ui/hooks/useClickOutside';
import { Button } from '~/ui/button';
import { MenuIcon } from '~/ui/icons/menu-icon';
import { CloseIcon } from '~/ui/icons/close-icon';
import { HeaderMenu } from './header-menu';

export interface MobileMenuProps {
  visible: Signal<boolean>;
}

export const MobileMainMenu = component$<MobileMenuProps>((props) => {
  return (
    <>
      <div
        class={[
          `
          bg-white absolute h-screen w-full z-10 sm:hidden
          transition ease-in duration-200 transform opacity-0
          -left-full
          `,
          { ' transform opacity-100 left-0': props.visible.value },
        ]}
        window:onKeyDown$={(e) => {
          const ev: KeyboardEvent = e as unknown as KeyboardEvent;
          if (ev.key === 'Escape') {
            props.visible.value = false;
          }
        }}
        id="mobile-menu"
      >
        <div class="space-y-1 p-10">
          <HeaderMenu isMobile={true} />
        </div>
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
        intent="icon"
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
        <MenuIcon
          class={{
            'h-6 w-6': true,
            hidden: props.visible.value === true,
          }}
        />
        <CloseIcon
          class={{
            'h-6 w-6': true,
            hidden: props.visible.value === false,
          }}
        />
      </Button>
    );
  },
);
