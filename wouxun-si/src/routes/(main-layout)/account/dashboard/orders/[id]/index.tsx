import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { handleError } from '~/modules/logger';
import { getMedusaClient, getSrvSessionHeaders } from '~/modules/medusa';
import { NotFound } from '~/modules/not-found/NotFound';
import { OrderDetails } from './OrderDetails';
import { OrderItems } from './OrderItems';
import { ShippingDetails } from './ShippingDetails';
import { OrderSummary } from './OrderSummary';
import { Help } from './Help';

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
          <OrderItems order={order.value} />
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
