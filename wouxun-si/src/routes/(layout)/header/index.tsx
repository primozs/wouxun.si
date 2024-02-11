import { component$, useSignal } from '@builder.io/qwik';
import { Logo } from './logo';
import { MainNavigation } from '~/routes/(layout)/MainNavigation';
import { MobileMainMenu, MobileMainMenuButton } from './MobileMainMenu';
// import { CartButton } from '~/ui/cart/CartButton';
import { config } from '~/config';

export const Header = component$(() => {
  const mobileMenuVisible = useSignal(false);

  return (
    <header
      class="`
        transform sticky top-0 z-10
        backdrop-blur bg-white/90
      `"
    >
      <nav class="max-w-screen-2xl p-3 sm:p6 mx-auto flex items-center justify-between text-primary-500">
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
          <div class="flex items-center">
            <div class="hidden sm:block">
              <MainNavigation />
            </div>

            {/* <CartButton /> */}
          </div>

          <MobileMainMenuButton visible={mobileMenuVisible} />
        </div>
      </nav>
      <MobileMainMenu visible={mobileMenuVisible} />
    </header>
  );
});
