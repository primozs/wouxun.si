import { component$ } from '@builder.io/qwik';
import { UiTitle } from '~/ui/UiTitle';
import type { Order } from '@medusajs/medusa';
import { formatDate } from '~/ui/common/formatDate';
import { formatAmount } from '~/modules/common/prices';
import { Image } from '@unpic/qwik';
import { NavLink } from '~/ui/button';
import { plural } from '~/modules/locale/i18n-utils';
import { useLocale } from '~/modules/locale/LocaleProvider';

export interface OrderCardProps {
  order: Order;
}

export const OrderCard = component$<OrderCardProps>(({ order }) => {
  const locale = useLocale();

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
          href={`/account/dashboard/orders/${order.id}`}
        >
          {$localize`See details`}
        </NavLink>
      </div>
    </div>
  );
});
