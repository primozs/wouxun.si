import { component$ } from '@builder.io/qwik';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';

export default component$(() => {
  return (
    <div class="w-full">
      <div class="mb-8 flex flex-col gap-y-4">
        <UiTitle>Orders</UiTitle>
        <UiText wrap>
          View your previous orders and their status. You can also create
          returns or exchanges for your orders if needed.
        </UiText>
      </div>
      <div>{/* <OrderOverview orders={orders} /> */}</div>
    </div>
  );
});
