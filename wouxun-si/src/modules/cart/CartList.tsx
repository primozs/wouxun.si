import { type Signal, component$, useSignal } from '@builder.io/qwik';
import type { Cart, LineItem } from '@medusajs/client-types';
import { ShoppingBagIcon2 } from '~/ui/icons/shopping-bag-icon2';
import { Image } from '@unpic/qwik';
import { useCartDialog } from './CartDialog';
import ListPrice from '~/modules/products/Price';
import { getImageUrl } from '~/modules/directus';
import { UiNote } from '~/ui/UiNote';
import { UiItem } from '~/ui/UiItem';
import { UiLabel } from '~/ui/UiLabel';
import { UiTitle } from '~/ui/UiTitle';
import { Button, NavLink } from '~/ui/button';
import {
  useRemoveCartItemAction,
  useSetCartItemQuantityAction,
} from '~/routes/plugin@store';
import { UiIcon } from '~/ui/UiIcon';
import { IoTrashOutline } from '@qwikest/icons/ionicons';
import { UiList } from '~/ui/UiList';
import { LoadingDots } from '~/ui/loading-dots';
import { Select } from '~/ui/input/Select';

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
              <UiNote>Vmesni seštevek</UiNote>
              <UiNote>Dostava</UiNote>
              <UiTitle>Skupaj</UiTitle>
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
        <div class="card bg-base-100 h-full">
          <div class="card-body justify-center items-center text-base-content/60">
            <ShoppingBagIcon2 class="!h-16 !w-16" isEmpty={true} />
            <UiNote>Nakupovalna vrečka je prazna.</UiNote>
          </div>
        </div>
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

        <EditItemQuantity item={item} />
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
        <DeleteItemButton item={item} />
      </div>
    </UiItem>
  );
});

type Props = {
  item: LineItem;
};

export const DeleteItemButton = component$<Props>(({ item }) => {
  const removing = useSignal(false);
  const action = useRemoveCartItemAction();

  return (
    <Button
      disabled={removing.value}
      onClick$={async () => {
        removing.value = true;
        await action.submit({ itemId: item.id });
        removing.value = false;
      }}
      intent="unstyled"
      color="base"
      class="btn-sm text-xs"
      loading={removing.value}
    >
      <UiIcon class="hidden sm:block">
        <IoTrashOutline />
      </UiIcon>
      Odstrani
    </Button>
  );
});

export const EditItemQuantity = component$<Props>(({ item }) => {
  const isLoading = useSignal(false);
  const action = useSetCartItemQuantityAction();
  return (
    <>
      {isLoading.value && <LoadingDots class="bg-base-content/50" />}
      {!isLoading.value && (
        <div class="flex flex-shrink-0 items-center cursor-pointer relative mr-2 sm:mr-4">
          <Select
            id={'quantity_' + item.id}
            name={'quantity_' + item.id}
            label="Število"
            value={item.quantity + ''}
            options={[1, 2, 3, 4, 5].map((n) => ({
              label: String(n),
              value: String(n),
            }))}
            labelSrOnly
            onChange$={async (e) => {
              // @ts-ignore
              const quantity = parseInt(e.target.value);
              isLoading.value = true;
              await action.submit({ itemId: item.id, quantity });
              isLoading.value = false;
            }}
          />
        </div>
      )}
    </>
  );
});
