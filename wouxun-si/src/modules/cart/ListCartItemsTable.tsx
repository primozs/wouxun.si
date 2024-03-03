import { component$ } from '@builder.io/qwik';
import { UiTitle } from '~/ui/UiTitle';
import { ItemImage } from '~/modules/cart/ItemImage';
import { UiText } from '~/ui/UiText';
import { ItemQuantitySelect } from '~/modules/cart/ItemQuantitySelect';
import { RemoveItemBtn } from '~/modules/cart/RemoveItemBtn';
import type { LineItem, Region } from '@medusajs/client-types';
import { LineItemPrice, LineItemUnitPrice } from './LineItemUnitPrice';
import { NavLink } from '~/ui/button';

export interface ListCartItemsProps {
  items?: LineItem[];
  region?: Region | null;
}

export const ListCartItemsTable = component$<ListCartItemsProps>(
  ({ items, region }) => {
    return (
      <div class="overflow-x-auto border-b border-base-300">
        <table class="table">
          <thead>
            <tr>
              <th class="!pl-0">
                {<UiTitle color="base">{$localize`Item`}</UiTitle>}
              </th>
              <th></th>
              <th>{<UiTitle color="base">{$localize`Quantity`}</UiTitle>}</th>
              <th class="hidden lg:table-cell">
                {<UiTitle color="base">{$localize`Price`}</UiTitle>}
              </th>
              <th class="text-right">
                {<UiTitle color="base">{$localize`Total`}</UiTitle>}
              </th>
            </tr>
          </thead>
          <tbody>
            {items &&
              region &&
              items
                .sort((a, b) => {
                  return a.created_at > b.created_at ? -1 : 1;
                })
                .map((item) => {
                  return (
                    <ListCartTableItem
                      key={item.id}
                      item={item}
                      region={region}
                    />
                  );
                })}
          </tbody>
        </table>
      </div>
    );
  },
);

export interface ListCartTableItemProps {
  item: LineItem;
  region: Region;
  type?: 'full' | 'preview';
}

export const ListCartTableItem = component$<ListCartTableItemProps>(
  ({ item, region, type = 'full' }) => {
    const merchandiseUrl = `/product/${item.variant!.product!.handle}`;
    return (
      <tr key={item.id}>
        <td class="!pl-0">
          <NavLink q:slot="start" href={merchandiseUrl}>
            <ItemImage
              src={item.thumbnail}
              alt={item.variant?.product?.title ?? ''}
            />
          </NavLink>
        </td>
        <td>
          <UiTitle as="h2" class="truncate">
            {item.title}
          </UiTitle>
          <UiText class="truncate" color="light">
            {item.variant?.title}
          </UiText>
        </td>
        {type === 'full' && (
          <>
            <td>
              <div class="flex gap-2 items-center w-28">
                <RemoveItemBtn item={item} iconOnly />
                <ItemQuantitySelect item={item} />
              </div>
            </td>
            <td class="hidden lg:table-cell">
              <LineItemUnitPrice item={item} region={region} style="tight" />
            </td>
          </>
        )}
        <td class="text-right">
          <span
            class={[
              type === 'preview' &&
                'flex flex-col items-end h-full justify-center',
            ]}
          >
            {type === 'preview' && (
              <span class="flex gap-x-1 ">
                <UiText color="light">{item.quantity}x </UiText>
                <LineItemUnitPrice item={item} region={region} style="tight" />
              </span>
            )}
            <LineItemPrice item={item} region={region} style="tight" />
          </span>
        </td>
      </tr>
    );
  },
);
