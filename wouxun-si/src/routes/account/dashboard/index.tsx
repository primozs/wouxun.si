import { Slot, component$ } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import type { Customer } from '@medusajs/client-types';
import type { Order } from '@medusajs/medusa';
import { useAuthSessionLoader } from '~/routes/plugin@auth';
import { handleError } from '~/modules/logger';
import { getMedusaClient, getSrvSessionHeaders } from '~/modules/medusa';
import { formatAmount } from '~/modules/common/prices';
import { IoChevronForwardOutline } from '@qwikest/icons/ionicons';

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
      <div class="text-xl leading-[36px] font-semibold flex justify-between items-center mb-4">
        <span>Hello: {customer.value?.first_name}</span>
        <span class="text-sm leading-5 font-medium">
          Signed in: {customer.value?.email}
        </span>
      </div>
      <div class="flex flex-col py-8 border-t border-base-300">
        <div class="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
          <div class="flex items-start gap-x-16 mb-6">
            <Item
              title="Profile"
              value={getProfileCompletion(customer.value) + '%'}
              type="Completed"
            />

            <Item
              title="Profile"
              value={(customer.value?.shipping_addresses?.length || 0) + ''}
              type="Saved"
            />
          </div>

          <Item title="Recent orders" value="" type="">
            <ul class="flex flex-col gap-y-4">
              {orders.value?.length ?? 0 > 0 ? (
                orders.value?.slice(0, 5).map((order) => {
                  return (
                    <li key={order.id}>
                      <OrderItem order={order} />
                    </li>
                  );
                })
              ) : (
                <span>No recent orders</span>
              )}
            </ul>
          </Item>
        </div>
      </div>
    </>
  );
});

export interface OrderItemProps {
  order: Order;
}

export const OrderItem = component$<OrderItemProps>(({ order }) => {
  return (
    <Link href={`/account/dashboard/orders/details/${order.id}`}>
      <div class="bg-base-200 flex justify-between items-center p-4">
        <div class="grid grid-cols-3 grid-rows-2 text-xs leading-5 font-normal gap-x-4 flex-1">
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
        <button class="flex items-center justify-between">
          <span class="sr-only">Go to order #{order.display_id}</span>
          <IoChevronForwardOutline />
        </button>
      </div>
    </Link>
  );
});

export interface ItemProps {
  title: string;
  value: string;
  type: string;
}

export const Item = component$<ItemProps>((props) => {
  return (
    <div class="flex flex-col gap-y-1">
      <h3 class="text-base leading-6 font-semibold">{props.title}</h3>
      <div class="flex items-baseline gap-x-2">
        <span class="text-[32px] leading-[44px] font-semibold">
          {props.value}
        </span>
        <span class="uppercase text-sm leading-6 font-normal text-ui-fg-subtle">
          {props.type}
        </span>
      </div>
      <Slot />
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
