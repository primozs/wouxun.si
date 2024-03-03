import { type Signal, component$ } from '@builder.io/qwik';
import { Image } from '@unpic/qwik';
import { useCartDialog } from './CartDialog';
import ListPrice from '~/modules/products/Price';
import { getImageUrl } from '~/modules/directus';
import { UiNote } from '~/ui/UiNote';
import { UiItem } from '~/ui/UiItem';
import { UiLabel } from '~/ui/UiLabel';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';
import { UiList } from '~/ui/UiList';
import { EmptyCartMessage } from './EmptyCartMessage';
import { RemoveItemBtn } from './RemoveItemBtn';
import { ItemQuantitySelect } from './ItemQuantitySelect';
import { UiContent } from '~/ui/UiContent';
import type { Cart, LineItem } from '@medusajs/client-types';

export interface CartListProps {
  cart: Signal<Cart | null>;
}

export const CartList = component$<CartListProps>(({ cart }) => {
  return (
    <>
      {cart.value?.items?.length ?? 0 > 0 ? (
        <UiList>
          {/* sort variants by product handle */}
          {cart.value?.items
            ?.sort((i1, i2) => {
              return (
                i1.variant?.product?.handle?.localeCompare(
                  i2.variant?.product?.handle ?? '',
                ) ?? 0
              );
            })
            .map((item_) => {
              const item: LineItem = item_!;
              return <ListLineItem key={item.id} item={item} cart={cart} />;
            })}

          <UiItem class="px-8 py-3" lines="none">
            <UiLabel>
              <UiNote>{$localize`Subtotal`}</UiNote>
              <UiNote>{$localize`Shipping`}</UiNote>
              <UiTitle>{$localize`Total`}</UiTitle>
            </UiLabel>

            <div class="flex flex-col" q:slot="end">
              <UiNote class="text-right">
                <ListPrice
                  amount={cart.value?.subtotal || 0}
                  currency={cart.value?.region!.currency_code}
                />
              </UiNote>

              <UiNote class="text-right">Free</UiNote>
              <UiTitle class="text-right">
                <ListPrice
                  amount={cart.value?.total || 0}
                  currency={cart.value?.region!.currency_code}
                />
              </UiTitle>
            </div>
          </UiItem>
        </UiList>
      ) : (
        <UiContent>
          <EmptyCartMessage />
        </UiContent>
      )}
    </>
  );
});

export interface ListLineItemProps {
  item: LineItem;
  cart: Signal<Cart | null>;
}

export const ListLineItem = component$<ListLineItemProps>(({ item, cart }) => {
  const { closeCardDialog } = useCartDialog();

  const merchandiseUrl = `/product/${item.variant!.product!.handle}`;
  // @ts-ignore
  const imageSrc = getImageUrl(item.metadata?.thumbnailId ?? '');

  return (
    <UiItem>
      <div class="flex flex-1 justify-between py-3">
        <NavLink
          class="flex flex-row space-x-1 sm:space-x-4 items-center"
          href={merchandiseUrl}
          onClick$={() => {
            closeCardDialog();
          }}
        >
          <Image
            width={72}
            height={56}
            src={imageSrc}
            // src={
            //   item?.thumbnail ||
            //   item?.variant?.product?.images![0]?.url
            // }
            alt={item.variant?.product?.title ?? ''}
            class="imageerr aspect-[16/9] rounded-md sm:aspect-[3/2] lg:aspect-[3/2]"
            layout="constrained"
            cdn="directus"
          />
          <UiTitle class="text-wrap sm:text-nowrap">{item.title}</UiTitle>
        </NavLink>

        <ItemQuantitySelect item={item} />
      </div>

      <div
        q:slot="end"
        class="flex flex-shrink-0 flex-col justify-between space-y-1"
      >
        {item.total && (
          <UiTitle class="text-right">
            <ListPrice
              amount={item.total}
              currency={cart.value?.region!.currency_code}
            />
          </UiTitle>
        )}
        <RemoveItemBtn item={item} />
      </div>
    </UiItem>
  );
});
