import { component$ } from '@builder.io/qwik';
import { UiItem } from '~/ui/UiItem';
import { UiLabel } from '~/ui/UiLabel';
import { UiList } from '~/ui/UiList';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { LineItemPrice, LineItemUnitPrice } from './LineItemUnitPrice';
import { ItemImage } from '~/modules/cart/ItemImage';
import type { Order } from '@medusajs/client-types';

export interface OrderItemsProps {
  order: Order;
}

export const OrderItems = component$<OrderItemsProps>(({ order }) => {
  return (
    <div class="my-4 space-y-1">
      <UiTitle size="lg" as="h2">
        {$localize`Summary`}
      </UiTitle>

      <UiList>
        {order.items
          ?.sort((a, b) => {
            return a.created_at > b.created_at ? -1 : 1;
          })
          .map((item) => {
            return (
              <UiItem key={item.id} pad={false} class="py-4 space-x-4">
                <ItemImage
                  q:slot="start"
                  src={item.thumbnail}
                  alt={item.variant?.product?.title ?? ''}
                />

                <UiLabel>
                  <UiTitle>{item.title}</UiTitle>
                  <UiText color="light">{item.variant?.title}</UiText>
                </UiLabel>

                <div q:slot="end" class="flex flex-col items-end">
                  <div class="flex gap-x-1">
                    <UiText color="light">{item.quantity}x</UiText>
                    <LineItemUnitPrice
                      item={item}
                      region={order.region}
                      style="tight"
                    />
                  </div>
                  <LineItemPrice
                    item={item}
                    region={order.region}
                    style="tight"
                  />
                </div>
              </UiItem>
            );
          })}
      </UiList>
    </div>
  );
});
