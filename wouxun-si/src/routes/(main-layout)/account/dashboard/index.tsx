import { component$ } from '@builder.io/qwik';
import type { Customer } from '@medusajs/medusa';
import type { Order } from '@medusajs/medusa';
import { formatAmount } from '~/modules/common/prices';
import { UiList } from '~/ui/UiList';
import { UiItem } from '~/ui/UiItem';
import { UiTitle } from '~/ui/UiTitle';
import { UiText } from '~/ui/UiText';
import { UiListHeader } from '~/ui/UiListHeader';
import { useCustomer, useCutomerOrders } from './layout';
import { UiNote } from '~/ui/UiNote';
import { formatDate } from '~/ui/common/formatDate';
import type { DocumentHead } from '@builder.io/qwik-city';
import { useLocale } from '~/modules/locale/LocaleProvider';

export default component$(() => {
  const customer = useCustomer();
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
          <UiItem lines="none">
            <UiNote>{$localize`No recent orders`}</UiNote>
          </UiItem>
        )}
      </UiList>
    </>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Account`,
});

export interface OrderItemProps {
  order: Order;
}

export const OrderItem = component$<OrderItemProps>(({ order }) => {
  const locale = useLocale();
  return (
    <UiItem
      to={`/account/dashboard/orders/${order.id}`}
      detail
      class="bg-base-200"
    >
      <div class="grid grid-cols-3 grid-rows-2 text-sm p-2 leading-5 font-normal gap-x-4 flex-1">
        <span class="font-semibold">{$localize`Date placed`}</span>
        <span class="font-semibold">{$localize`Order number`}</span>
        <span class="font-semibold">{$localize`Total amount`}</span>
        <span>{formatDate(new Date(order.created_at), locale.value)}</span>
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
