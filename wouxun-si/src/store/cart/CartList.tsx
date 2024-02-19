import { type Signal, component$ } from '@builder.io/qwik';
import type { Cart, LineItem } from '@medusajs/client-types';
import { EditItemQuantityButton } from './EditItemQuantityButton';
import { DeleteItemButton } from './DeleteItemButton';
import { ShoppingBagIcon2 } from '~/ui/icons/shopping-bag-icon2';
import { CheckoutButtons } from './CheckoutButtons';
import { Image } from '@unpic/qwik';
import { useCartDialog } from './CartDialog';
import ListPrice from '~/store/products/Price';
import { getImageUrl } from '~/services/directus';

export interface CartListProps {
  cart: Signal<Cart | null>;
}

export const CartList = component$<CartListProps>(({ cart }) => {
  const { closeCardDialog } = useCartDialog();

  return (
    <>
      {cart.value?.items?.length === 0 ? (
        <div class="mt-20 flex w-full flex-col items-center justify-center overflow-hidden p-8">
          <ShoppingBagIcon2 class="!h-16 !w-16" isEmpty={true} />
          <p class="mt-3 text-center font-medium text-balance text-base-content">
            Nakupovalna vrečka je prazna.
          </p>
        </div>
      ) : null}

      {cart.value?.items?.length !== 0 ? (
        <div class="flex flex-col overflow-hidden h-full">
          <div class="overflow-auto">
            <ul class="flex flex-col w-full">
              {/* sort variants by product handle */}
              {cart.value?.items
                ?.sort((i1, i2) => {
                  return (
                    i1.variant?.product?.handle?.localeCompare(
                      i2.variant?.product?.handle ?? '',
                    ) ?? 0
                  );
                })
                .map((item_, i) => {
                  const item: LineItem = item_!;
                  const merchandiseUrl = `/product/${
                    item.variant!.product!.handle
                  }`;
                  const imageSrc = getImageUrl(
                    item.metadata?.thumbnailId ?? '',
                  );

                  return (
                    <li
                      key={i}
                      class="flex justify-between flex-row items-center gap-5 border-b border-base-300 px-8 py-6"
                    >
                      <div class="flex flex-row justify-between w-full">
                        <a
                          class="flex flex-row space-x-4"
                          href={merchandiseUrl}
                          onClick$={() => {
                            closeCardDialog();
                          }}
                        >
                          <div class="relative h-14 w-18 cursor-pointer overflow-hidden bg-base-100 rounded">
                            {/* image from medusa */}
                            {/* <Image
                              class="!h-14 !w-18 object-cover"
                              width={72}
                              height={56}
                              sizes="72px"
                              alt={item.variant?.product?.title ?? ''}
                              src={
                                item?.thumbnail ||
                                item?.variant?.product?.images![0]?.url
                              }
                            /> */}
                            {/* image from directus */}
                            <Image
                              width={72}
                              height={56}
                              src={imageSrc}
                              alt={item.variant?.product?.title ?? ''}
                              class="imageerr aspect-[16/9] rounded-2xl sm:aspect-[3/2] lg:aspect-[3/2]"
                              layout="constrained"
                              cdn="directus"
                            />
                          </div>
                          <div class="flex flex-1 flex-col justify-center">
                            <span class="text-sm font-medium">
                              {item.title}
                            </span>
                          </div>
                        </a>
                        <EditItemQuantityButton item={item} />
                      </div>
                      <div>
                        {item.total && (
                          <ListPrice
                            class="flex flex-col justify-between space-y-2 text-sm"
                            amount={item.total}
                            currency={cart.value?.region!.currency_code}
                          />
                        )}
                        <DeleteItemButton item={item} />
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div class="flex flex-grow flex-col h-fit justify-between">
            <div class="text-sm text-base-content font-medium px-8 py-6">
              <div class="mb-2 flex items-center justify-between">
                <p>Vmesni seštevek</p>
                <ListPrice
                  amount={cart.value?.subtotal || 0}
                  currency={cart.value?.region!.currency_code}
                />
              </div>
              <div class="mb-2 flex items-center justify-between">
                <p>Dostava</p>
                <p class="text-right">Free</p>
              </div>
              <div class="mb-2 flex items-center justify-between">
                <p>Skupaj</p>
                <ListPrice
                  class="text-right text-base-content"
                  amount={cart.value?.total || 0}
                  currency={cart.value?.region!.currency_code}
                />
              </div>
            </div>
            <CheckoutButtons />
          </div>
        </div>
      ) : null}
    </>
  );
});
