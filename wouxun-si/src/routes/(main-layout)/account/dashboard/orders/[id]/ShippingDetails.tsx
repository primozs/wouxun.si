import { component$ } from '@builder.io/qwik';
import type { Order } from '@medusajs/medusa';
import { formatAmount } from '~/modules/common/prices';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';

export interface ShippingDetailsProps {
  order: Order;
}

export const ShippingDetails = component$<ShippingDetailsProps>(({ order }) => {
  const shipping_method = (order.shipping_methods ?? [])[0];
  return (
    <div class="my-4">
      <UiTitle size="lg" as="h2">
        {$localize`Delivery`}
      </UiTitle>
      <div class="flex items-start gap-x-8">
        <div class="flex flex-col w-1/3">
          <UiTitle>{$localize`Shipping address`}</UiTitle>
          <UiText>
            {order.shipping_address.first_name}{' '}
            {order.shipping_address.last_name}
          </UiText>
          <UiText>
            {order.shipping_address.address_1}{' '}
            {order.shipping_address.address_2}
          </UiText>
          <UiText>
            {order.shipping_address.postal_code}, {order.shipping_address.city}
          </UiText>
          <UiText>{order.shipping_address.country_code?.toUpperCase()}</UiText>
        </div>

        <div class="flex flex-col w-1/3 ">
          <UiTitle>{$localize`Contact`}</UiTitle>
          <UiText>{order.shipping_address.phone}</UiText>
          <UiText>{order.email}</UiText>
        </div>

        <div class="flex flex-col w-1/3">
          <UiTitle>{$localize`Method`}</UiTitle>
          <UiText>
            {shipping_method && (
              <>
                {shipping_method?.shipping_option?.name} (
                {formatAmount({
                  amount: shipping_method.price,
                  region: order.region,
                  includeTaxes: false,
                })
                  .replace(/,/g, '')
                  .replace(/\./g, ',')}
                )
              </>
            )}
          </UiText>
        </div>
      </div>
    </div>
  );
});
