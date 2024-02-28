import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import type { Customer } from '@medusajs/client-types';
import type { Order } from '@medusajs/medusa';
import { useAuthSessionLoader } from '~/routes/plugin@auth';
import { handleError } from '~/modules/logger';
import { getMedusaClient, getSrvSessionHeaders } from '~/modules/medusa';
import { formatAmount } from '~/modules/common/prices';
import { UiList } from '~/ui/UiList';
import { UiItem } from '~/ui/UiItem';
import { UiTitle } from '~/ui/UiTitle';
import { UiText } from '~/ui/UiText';
import { UiListHeader } from '~/ui/UiListHeader';

export const useCutomerOrders = routeLoader$(async (event) => {
  const client = getMedusaClient();
  const limit = 5;
  const offset = 0;
  return client.customers
    .listOrders({ limit, offset }, getSrvSessionHeaders(event))
    .then(({ orders }) => orders)
    .catch((err) => handleError(err));
});

export default component$(() => {
  const customer = useAuthSessionLoader();
  const orders = useCutomerOrders();

  return (
    <>
      <UiItem pad={false} classCenter="flex flex-col mb-4 gap-y-4">
        <UiTitle size="xl" as="h1">
          {$localize`Hello ${customer.value?.first_name}`}
        </UiTitle>
        <UiText class="text-sm" q:slot="end">
          <p class="font-medium">{$localize`Signed in:`}</p>
          <p class="truncate">{customer.value?.email}</p>
        </UiText>
      </UiItem>

      <UiItem pad={false} classCenter="flex flex-row flex-wrap">
        <div>
          <StatItem
            title={$localize`Profile`}
            value={getProfileCompletion(customer.value) + '%'}
            desc={$localize`Completed`}
          />
        </div>

        <div>
          <StatItem
            title={$localize`Shipping addresses`}
            value={(customer.value?.shipping_addresses?.length || 0) + ''}
            desc={$localize`Saved`}
          />
        </div>
      </UiItem>

      <UiList>
        <UiListHeader>{$localize`Recent orders`}</UiListHeader>

        {orders.value?.length ?? 0 > 0 ? (
          orders.value?.slice(0, 5).map((order) => {
            return <OrderItem order={order} key={order.id} />;
          })
        ) : (
          <UiItem>{$localize`No recent orders`}</UiItem>
        )}
      </UiList>
    </>
  );
});

export interface OrderItemProps {
  order: Order;
}

export const OrderItem = component$<OrderItemProps>(({ order }) => {
  return (
    <UiItem
      to={`/account/dashboard/orders/details/${order.id}`}
      detail
      class="bg-base-200"
    >
      <div class="grid grid-cols-3 grid-rows-2 text-xs p-4 leading-5 font-normal gap-x-4 flex-1">
        <span class="font-semibold">Date placed</span>
        <span class="font-semibold">Order number</span>
        <span class="font-semibold">Total amount</span>
        <span>{new Date(order.created_at).toDateString()}</span>
        <span>#{order.display_id}</span>
        <span>
          {order.total &&
            order.region &&
            formatAmount({
              amount: order.total,
              region: order.region,
              includeTaxes: false,
            })}
        </span>
      </div>
    </UiItem>
  );
});

export interface StatItemProps {
  title: string;
  value: string;
  desc: string;
}

export const StatItem = component$<StatItemProps>((props) => {
  return (
    <div class="stat">
      <div class="stat-title">{props.title}</div>
      <div class="stat-value">{props.value}</div>
      <div class="stat-desc">{props.desc}</div>
    </div>
  );
});

export const getProfileCompletion = (
  customer: Omit<Customer, 'password_hash'> | null,
) => {
  let count = 0;

  if (!customer) {
    return 0;
  }

  if (customer.email) {
    count++;
  }

  if (customer.first_name && customer.last_name) {
    count++;
  }

  if (customer.phone) {
    count++;
  }

  if (customer.billing_address) {
    count++;
  }

  return (count / 4) * 100;
};
