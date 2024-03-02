import { component$ } from '@builder.io/qwik';
import type { FulfillmentStatus, Order, PaymentStatus } from '@medusajs/medusa';
import { useLocaleLoader } from '~/routes/plugin';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';
import { formatDate } from '~/ui/common/formatDate';

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
