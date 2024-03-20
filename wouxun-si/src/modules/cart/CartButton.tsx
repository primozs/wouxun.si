import { component$ } from '@builder.io/qwik';
import { useCartLoader } from '~/routes/plugin@store';
import { NavLink } from '~/ui/button';
import { IoBagHandleOutline } from '@qwikest/icons/ionicons';
import { UiIcon } from '~/ui/UiIcon';
import { UiContent } from '~/ui/UiContent';
import { UiTitle } from '~/ui/UiTitle';
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

      <details class="dropdown dropdown-end hidden lg:block">
        <summary
          class="btn btn-ghost btn-square"
          aria-label={$localize`Go to cart`}
        >
          <UiIcon class="indicator">
            {(cart.value?.items?.length ?? 0) > 0 && (
              <span class="indicator-item badge badge-success badge-xs"></span>
            )}
            <IoBagHandleOutline />
          </UiIcon>
        </summary>
        <div class="mt-3 z-[1] menu card card-compact dropdown-content w-[450px] bg-base-100 shadow-xl">
          <div class="card-body !p-0">
            <UiContent classContainer="max-h-[420px]" class="py-1 space-y-4">
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
      </details>
    </>
  );
});
