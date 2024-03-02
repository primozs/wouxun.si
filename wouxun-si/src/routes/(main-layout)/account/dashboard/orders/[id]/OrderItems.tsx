import { component$ } from '@builder.io/qwik';
import type { Order } from '@medusajs/medusa';
import { UiItem } from '~/ui/UiItem';
import { UiLabel } from '~/ui/UiLabel';
import { UiList } from '~/ui/UiList';
import { UiTitle } from '~/ui/UiTitle';

export interface OrderItemsProps {
  order: Order;
}

export const OrderItems = component$<OrderItemsProps>(({ order }) => {
  // items={order.items} region={order.region}
  return (
    <div class="my-4 space-y-1">
      <UiTitle size="lg" as="h2">
        {$localize`Summary`}
      </UiTitle>

      <UiList>
        {order.items
          .sort((a, b) => {
            return a.created_at > b.created_at ? -1 : 1;
          })
          .map((item) => {
            return (
              <UiItem key={item.id}>
                <div class="flex w-16" q:slot="start">
                  {/* <Thumbnail thumbnail={item.thumbnail} size="square" /> */}
                </div>
                <UiLabel>
                  <UiTitle></UiTitle>
                </UiLabel>
                {/* <Item key={item.id} item={item} region={order.region} /> */}
              </UiItem>
            );
          })}
      </UiList>
    </div>
  );
});
