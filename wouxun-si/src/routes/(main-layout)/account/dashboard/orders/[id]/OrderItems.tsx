import { component$ } from '@builder.io/qwik';
import type { Order } from '@medusajs/medusa';
import { Image } from '@unpic/qwik';
import { UiItem } from '~/ui/UiItem';
import { UiLabel } from '~/ui/UiLabel';
import { UiList } from '~/ui/UiList';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { LineItemPrice, LineItemUnitPrice } from './LineItemUnitPrice';

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
          .sort((a, b) => {
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
                  <UiText color="light">{item.variant.title}</UiText>
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

export interface ItemImageProps {
  src: string | null;
  alt: string;
}

export const ItemImage = component$<ItemImageProps>((props) => {
  return (
    <div
      class={[
        `
        card card-compact card-bordered w-16 
        bg-base-200 
        border-base-300 rounded-lg shadow-sm
        `,
      ]}
    >
      <figure class="aspect-square">
        <Image width={208} height={264} src={props.src} alt={props.alt} />
      </figure>
    </div>
  );
});
