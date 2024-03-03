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
import { formatAmount } from '../common/prices';
import { ItemImage } from './ItemImage';
import { LineItemPrice } from './LineItemUnitPrice';
import { RemoveItemBtn } from './RemoveItemBtn';
import { UiText } from '~/ui/UiText';

export interface CartButtonProps {}

export const CartNav = component$<CartButtonProps>(() => {
  const cart = useCartLoader();
  return (
    <>
      <NavLink
        type="button"
        aria-label={$localize`Go to cart`}
        color="ghost"
        intent="button"
        href="/cart"
        class="btn-square lg:hidden"
        size="none"
      >
        <UiIcon class="indicator">
          {(cart.value?.items?.length ?? 0) > 0 && (
            <span class="indicator-item badge badge-success badge-xs"></span>
          )}
          <IoBagHandleOutline />
        </UiIcon>
        <span class="sr-only">{$localize`Go to cart`}</span>
      </NavLink>

      <div class="dropdown dropdown-end hidden lg:block">
        <Button
          aria-label={$localize`Go to cart`}
          color="ghost"
          intent="square"
          tabIndex={0}
        >
          <UiIcon class="indicator">
            {(cart.value?.items?.length ?? 0) > 0 && (
              <span class="indicator-item badge badge-success badge-xs"></span>
            )}
            <IoBagHandleOutline />
          </UiIcon>
        </Button>
        <div
          tabIndex={0}
          class="mt-3 z-[1] card card-compact dropdown-content w-[450px] bg-base-100 shadow-xl"
        >
          <div class="card-body !p-0">
            <UiContent class="max-h-[420px] space-y-4">
              <div q:slot="start" class="p-4">
                <UiTitle size="lg">{$localize`Shopping bag`}</UiTitle>
              </div>
              {cart.value?.items
                ?.sort((a, b) => {
                  return a.created_at > b.created_at ? -1 : 1;
                })
                .map((item) => (
                  <div
                    class="grid grid-cols-[122px_1fr] gap-x-2 px-4"
                    key={item.id}
                  >
                    <NavLink href={`/product/${item.variant!.product!.handle}`}>
                      <ItemImage
                        src={item.thumbnail}
                        alt={item.variant?.product?.title ?? ''}
                      />
                    </NavLink>
                    <div class="flex flex-col justify-between flex-1">
                      <div class="flex flex-col flex-1">
                        <div class="flex items-start justify-between">
                          <div class="flex flex-col overflow-ellipsis whitespace-nowrap mr-4 w-[180px]">
                            <UiTitle as="h2" class="truncate">
                              {item.title}
                            </UiTitle>
                            <UiText class="truncate" color="light">
                              {item.variant?.title}
                            </UiText>
                            <UiText class="truncate" color="light">
                              {$localize`Quantity`} {item.quantity}
                            </UiText>
                          </div>
                          <div class="flex justify-end">
                            <LineItemPrice
                              region={cart.value.region}
                              item={item}
                              style="tight"
                            />
                          </div>
                        </div>
                      </div>
                      <RemoveItemBtn item={item} />
                    </div>
                  </div>
                ))}
            </UiContent>

            <div class="flex items-center justify-between px-4 mt-4">
              <UiTitle>
                {$localize`Subtotal`}{' '}
                <span class="font-normal">({$localize`excl. taxes`})</span>
              </UiTitle>
              <UiTitle size="lg">
                {formatAmount({
                  amount: cart.value?.subtotal || 0,
                  region: cart.value?.region,
                  includeTaxes: false,
                })}
              </UiTitle>
            </div>

            <div class="card-actions px-4 pb-4 pt-1">
              <NavLink
                intent="button"
                color="primary"
                href="/cart"
                class="w-full"
              >
                {$localize`Go to cart`}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

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
          aria-label={$localize`Go to cart`}
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
