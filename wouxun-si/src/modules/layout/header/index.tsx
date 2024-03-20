import { component$, useSignal } from '@builder.io/qwik';
import { Logo } from './logo';
import { MainNavigation } from '~/modules/layout/MainNavigation';
import { MobileMainMenu, MobileMainMenuButton } from './MobileMainMenu';
import { config } from '~/config';
import { NavBanner } from './NavBanner';
import { CartNav } from '~/modules/cart/CartButton';
// import { SwitchLocale } from '~/modules/locale/SwitchLocale';
// import { ThemeButton } from '~/modules/theme/ThemeSwitcher';

export const Header = component$(() => {
  const mobileMenuVisible = useSignal(false);

  return (
    <header
      class="`
        transform sticky top-0 z-20
        backdrop-blur bg-base-100/90
      `"
    >
      <NavBanner />
      <nav class="max-w-screen-2xl p-3 sm:p6 mx-auto flex items-center justify-between text-primary">
        <div class="mr-5">
          <a
            href="/"
            title={
              'Wouxun Slovenija začetna stran, v' + config.APPLICATION_VERSION
            }
          >
            <Logo />
          </a>
        </div>

        <div class="flex items-center gap-x-1.5">
          <div class="flex items-center gap-1.5">
            <div class="hidden sm:block">
              <MainNavigation />
            </div>

            <CartNav />
            {/* <SwitchLocale />
            <ThemeButton /> */}
          </div>

          <MobileMainMenuButton visible={mobileMenuVisible} />
        </div>
      </nav>
      <MobileMainMenu visible={mobileMenuVisible} />
    </header>
  );
});
