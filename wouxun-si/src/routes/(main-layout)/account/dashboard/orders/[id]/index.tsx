import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import type { FulfillmentStatus, Order, PaymentStatus } from '@medusajs/medusa';
import { formatAmount } from '~/modules/common/prices';
import { handleError } from '~/modules/logger';
import { getMedusaClient, getSrvSessionHeaders } from '~/modules/medusa';
import { NotFound } from '~/modules/not-found/NotFound';
import { useLocaleLoader } from '~/routes/plugin';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';
import { formatDate } from '~/ui/common/formatDate';

export const useOrder = routeLoader$(async (event) => {
  const client = getMedusaClient();

  const id = event.params.id;
  if (!id) {
    event.status(404);
    return null;
  }

  const data = await client.orders
    .retrieve(id, getSrvSessionHeaders(event))
    .then(({ order }) => order)
    .catch((err) => {
      handleError(err);
      return null;
    });

  if (!data) event.status(404);
  return data;
});

export default component$(() => {
  const order = useOrder();
  return (
    <>
      {!order.value ? (
        <NotFound centered={true} />
      ) : (
        <div class="flex flex-col mb-4 gap-y-4">
          <OrderDetails order={order.value} showStatus />

          <UiTitle size="lg" as="h2">
            {$localize`Summary`}
          </UiTitle>

          <ShippingDetails order={order.value} />
          <OrderSummary order={order.value} />
          <Help />
        </div>
      )}
    </>
  );
});

export const head: DocumentHead = () => {
  return {
    title: $localize`Order`,
  };
};

type OrderDetailsProps = {
  order: Order;
  showStatus?: boolean;
};

export const OrderDetails = component$<OrderDetailsProps>(
  ({ order, showStatus }) => {
    const locale = useLocaleLoader();
    return (
      <div class="my-4">
        <div class="flex items-center justify-between w-full">
          <UiTitle size="xl" as="h1">
            {$localize`Order details`}
          </UiTitle>

          <NavLink href="/account/dashboard/orders">
            {$localize`Back to overview`}
          </NavLink>
        </div>

        <UiText>
          {$localize`We have sent the order confirmation details to`}{' '}
          <span class="font-medium">{order.email}</span>
        </UiText>
        <UiText class="mt-2">
          {$localize`Order date: ${formatDate(new Date(order.created_at), locale.value)}`}
        </UiText>
        <UiTitle class="mt-2">
          {$localize`Order number: ${order.display_id}`}
        </UiTitle>

        {showStatus && (
          <div class="flex items-center gap-x-4 mt-2">
            <UiText>
              {$localize`Order status`}:{' '}
              <UiText as="span" color="light">
                {fulfilmentStatusI18n(order.fulfillment_status)}
              </UiText>
            </UiText>
            <UiText>
              {$localize`Payment status`}:{' '}
              <UiText as="span" color="light">
                {paymentStatusI18n(order.payment_status)}
              </UiText>
            </UiText>
          </div>
        )}
      </div>
    );
  },
);

const fulfilmentStatusI18n = (status: FulfillmentStatus) => {
  const rec: Record<string, string> = {
    not_fulfilled: $localize`Not fulfilled`,
    partially_fulfilled: $localize`Partially fulfilled`,
    fulfilled: $localize`Fulfilled`,
    partially_shipped: $localize`Partially shipped`,
    shipped: $localize`Shipped`,
    partially_returned: $localize`Partially returned`,
    returned: $localize`Returned`,
    canceled: $localize`Canceled`,
    requires_action: 'Requires action',
  };
  return rec[status] ?? '';
};

const paymentStatusI18n = (status: PaymentStatus) => {
  const rec: Record<string, string> = {
    not_paid: $localize`Not paid`,
    awaiting: $localize`Awaiting`,
    captured: $localize`Captured`,
    partially_refunded: $localize`Partially refunded`,
    refunded: $localize`Refunded`,
    canceled: $localize`Canceled`,
    requires_action: 'Requires action',
  };
  return rec[status] ?? '';
};

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

export interface OrderSummaryProps {
  order: Order;
}

export const OrderSummary = component$<OrderSummaryProps>(({ order }) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return;
    }

    return formatAmount({ amount, region: order.region, includeTaxes: false });
  };
  return (
    <div class="my-4 space-y-1">
      <UiTitle size="lg" as="h2">
        {$localize`Order summary`}
      </UiTitle>
      <div class="flex items-center justify-between w-full">
        <UiText>{$localize`Subtotal`}</UiText>
        <UiText>{getAmount(order.subtotal)}</UiText>
      </div>

      {order.discount_total > 0 && (
        <div class="flex items-center justify-between w-full">
          <UiText>{$localize`Discount`}</UiText>
          <UiText>- {getAmount(order.discount_total)}</UiText>
        </div>
      )}
      {order.gift_card_total > 0 && (
        <div class="flex items-center justify-between w-full">
          <UiText>{$localize`Discount`}</UiText>
          <UiText>- {getAmount(order.gift_card_total)}</UiText>
        </div>
      )}

      <div class="flex items-center justify-between">
        <UiText>{$localize`Shipping`}</UiText>
        <UiText>{getAmount(order.shipping_total)}</UiText>
      </div>
      <div class="flex items-center justify-between">
        <UiText>{$localize`Taxes`}</UiText>
        <UiText>{getAmount(order.tax_total)}</UiText>
      </div>

      <div class="h-px w-full border-b border-base-content/40 border-dashed my-4" />

      <div class="flex items-center justify-between">
        <UiTitle>{$localize`Total`}</UiTitle>
        <UiTitle>{getAmount(order.total)}</UiTitle>
      </div>
    </div>
  );
});

export const Help = component$(() => {
  return (
    <div class="my-4">
      <UiTitle size="lg" as="h2">
        {$localize`Need help?`}
      </UiTitle>
      <NavLink
        href={$localize`/info/contact`}
        class="block"
      >{$localize`Contact`}</NavLink>
      <NavLink
        href={$localize`/info/contact`}
      >{$localize`Returns & Exchanges`}</NavLink>
    </div>
  );
});
