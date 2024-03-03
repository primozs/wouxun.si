import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { CartDialog, useCartDialog } from './CartDialog';
import { CartList } from './CartList';
import { useCartLoader } from '~/routes/plugin@store';
import { Button, NavLink } from '~/ui/button';
import { UiItem } from '~/ui/UiItem';
import { IoBagHandleOutline } from '@qwikest/icons/ionicons';
import { UiIcon } from '~/ui/UiIcon';
import { IoCloseOutline } from '@qwikest/icons/ionicons';
import { UiContent } from '~/ui/UiContent';
import { UiFooter } from '~/ui/UiFooter';
import { UiHeader } from '~/ui/UiHeader';
import { UiTitle } from '~/ui/UiTitle';
import { UiToolbar } from '~/ui/UiToolbar';
import { getCheckoutStep } from '../common/getCheckoutStep';

export interface CartButtonProps {}

export const CartButton = component$<CartButtonProps>(() => {
  const cart = useCartLoader();
  const { closeCardDialog } = useCartDialog();
  const checkout_step = useSignal<string>('none');

  useTask$(({ track }) => {
    track(cart);
    checkout_step.value = getCheckoutStep(cart.value);
  });

  return (
    <>
      <CartDialog>
        <Button
          q:slot="button"
          type="button"
          aria-label="Odpri voziček"
          color="ghost"
          intent="square"
        >
          <UiIcon class="indicator">
            {(cart.value?.items?.length ?? 0) > 0 && (
              <span class="indicator-item badge badge-success badge-xs"></span>
            )}
            <IoBagHandleOutline />
          </UiIcon>
        </Button>

        <UiContent>
          <UiHeader q:slot="start">
            <UiToolbar>
              <div q:slot="end" class="flex items-center gap-2 mx-2">
                <Button
                  type="button"
                  onClick$={closeCardDialog}
                  intent="square"
                  color="neutral"
                  class="btn-sm"
                >
                  <IoCloseOutline class="h-5 w-5" />
                </Button>
                <kbd class="kbd kbd-sm text-base-content/60 text-xs">esc</kbd>
              </div>

              <UiTitle>{$localize`Shopping bag`}</UiTitle>
            </UiToolbar>
          </UiHeader>

          <CartList cart={cart} />

          <UiFooter q:slot="end" color="transparent">
            <UiToolbar border="top" layout={false}>
              {(cart.value?.items?.length ?? 0) > 0 && (
                <UiItem class="py-4" classCenter="gap-4" border="top">
                  <NavLink
                    intent="button"
                    color="primary"
                    href={'/checkout?step=' + checkout_step.value}
                    class="w-full"
                  >
                    {$localize`Go to checkout`}
                  </NavLink>
                </UiItem>
              )}
            </UiToolbar>
          </UiFooter>
        </UiContent>
      </CartDialog>
    </>
  );
});
