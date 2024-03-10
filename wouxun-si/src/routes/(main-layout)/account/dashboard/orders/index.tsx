import { component$ } from '@builder.io/qwik';
import { UiItem } from '~/ui/UiItem';
import { UiList } from '~/ui/UiList';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { useCutomerOrders } from '../layout';
import { UiNote } from '~/ui/UiNote';
import type { DocumentHead } from '@builder.io/qwik-city';
import { OrderCard } from '~/modules/orders/OrderCard';

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

export const head: DocumentHead = () => ({
  title: $localize`Orders`,
});
