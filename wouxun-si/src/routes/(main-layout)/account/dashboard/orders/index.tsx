import { component$ } from '@builder.io/qwik';
import { UiItem } from '~/ui/UiItem';
import { UiList } from '~/ui/UiList';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { useCutomerOrders } from '../layout';
import { Order } from '@medusajs/medusa';
import { useLocaleLoader } from '~/routes/plugin';
import { formatDate } from '~/ui/common/formatDate';
import { formatAmount } from '~/modules/common/prices';
import { Image } from '@unpic/qwik';
import { NavLink } from '~/ui/button';
import { plural } from '~/modules/locale/i18n-utils';
import { UiNote } from '~/ui/UiNote';

export default component$(() => {
  const orders = useCutomerOrders();

  return (
    <>
      <UiItem pad={false} classCenter="flex flex-col mb-8 gap-y-4" lines="none">
        <UiTitle size="xl" as="h1">
          {$localize`Orders`}
        </UiTitle>
        <UiText wrap class="max-w-xl">
          {$localize`View your previous orders and their status. You can also create
          returns or exchanges for your orders if needed.`}
        </UiText>
      </UiItem>

      <UiList>
        {orders.value?.length ?? 0 > 0 ? (
          orders.value?.slice(0, 5).map((order) => {
            return <OrderCard order={order} key={order.id} />;
          })
        ) : (
          <UiItem lines="none" pad={false}>
            <UiNote>{$localize`No recent orders`}</UiNote>
          </UiItem>
        )}
      </UiList>
    </>
  );
});

export interface OrderCardProps {
  order: Order;
}

export const OrderCard = component$<OrderCardProps>(({ order }) => {
  const locale = useLocaleLoader();

  const numberOfLines = order.items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  const numberOfProducts = order.items.length;

  return (
    <div class="flex flex-col w-full max-w-4xl space-y-6 border-b border-base-300 pb-4">
      <div>
        <UiTitle># {order.display_id}</UiTitle>
        <div class="flex items-center divide-x divide-base-300 font-medium text-sm">
          <span class="pr-2">
            {formatDate(new Date(order.created_at), locale.value)}
          </span>
          <span class="px-2">
            {formatAmount({
              amount: order.total,
              region: order.region,
              includeTaxes: false,
            })}
          </span>
          <span class="pl-2">
            {plural(locale.value, numberOfLines, {
              one: $localize`1 item`,
              two: $localize`2 items`,
              few: `${numberOfLines} ${$localize`items`}`,
              other: $localize`${numberOfLines} items`,
            })}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 my-4">
        {order.items.slice(0, 3).map((item) => {
          return (
            <div
              key={item.id}
              class="card card-compact w-full lg:w-52 bg-base-100 shadow-lg"
            >
              <figure>
                <Image
                  width={208}
                  height={264}
                  src={item.thumbnail}
                  alt={item.variant?.product?.title ?? ''}
                />
              </figure>
              <div class="card-body">
                <UiTitle>
                  {item.title} x{item.quantity}
                </UiTitle>
              </div>
            </div>
          );
        })}
      </div>

      {numberOfProducts > 4 && (
        <div class="w-full h-full flex flex-col items-center justify-center">
          <span class="text-sm">{$localize`+ ${numberOfLines - 4} more`}</span>
        </div>
      )}

      <div class="flex justify-end">
        <NavLink
          intent="button"
          color="secondary"
          href={`/account/orders/details/${order.id}`}
        >
          {$localize`See details`}
        </NavLink>
      </div>
    </div>
  );
});
