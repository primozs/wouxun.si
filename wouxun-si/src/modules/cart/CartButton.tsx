import { component$ } from '@builder.io/qwik';
import { CartDialog, useCartDialog } from './CartDialog';
import { CartList } from './CartList';
import { useCartLoader } from '~/routes/plugin@store';
import { Button } from '~/ui/button';
import { CheckoutButtons } from './CheckoutButtons';
import { UiItem } from '~/ui/UiItem';
import { IoBagHandleOutline } from '@qwikest/icons/ionicons';
import { UiIcon } from '~/ui/UiIcon';
import { IoCloseOutline } from '@qwikest/icons/ionicons';
import { UiContent } from '~/ui/UiContent';
import { UiFooter } from '~/ui/UiFooter';
import { UiHeader } from '~/ui/UiHeader';
import { UiTitle } from '~/ui/UiTitle';
import { UiToolbar } from '~/ui/UiToolbar';

export interface CartButtonProps {}

export const CartButton = component$<CartButtonProps>(() => {
  const cart = useCartLoader();
  const { closeCardDialog } = useCartDialog();
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
                  <CheckoutButtons />
                </UiItem>
              )}
            </UiToolbar>
          </UiFooter>
        </UiContent>
      </CartDialog>
    </>
  );
});
