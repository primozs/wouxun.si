import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { handleError } from '~/modules/logger';
import { getMedusaClient, getSrvSessionHeaders } from '~/modules/medusa';
import { NotFound } from '~/modules/not-found/NotFound';
import { OrderDetails } from '~/modules/orders/OrderDetails';
import { OrderItems } from '~/modules/orders/OrderItems';
import { ShippingDetails } from '~/modules/orders/ShippingDetails';
import { OrderSummary } from '~/modules/orders/OrderSummary';
import { Help } from '~/modules/orders/Help';
import type { Order } from '@medusajs/client-types';
import { PaymentDetails } from '~/modules/orders/PaymentDetails';

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
  return data as Order | null;
});

export default component$(() => {
  const order = useOrder();
  return (
    <section class="w-full max-w-4xl">
      {!order.value ? (
        <NotFound centered={true} />
      ) : (
        <div class="flex flex-col mb-4 gap-y-4">
          <OrderDetails order={order.value} showStatus />
          <OrderItems order={order.value} />
          <OrderSummary order={order.value} />
          <ShippingDetails order={order.value} />
          <PaymentDetails order={order.value} />
          <Help />
        </div>
      )}
    </section>
  );
});

export const head: DocumentHead = () => {
  return {
    title: $localize`Order`,
  };
};
