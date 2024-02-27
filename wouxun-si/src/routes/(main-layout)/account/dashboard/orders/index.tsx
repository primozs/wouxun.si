import { component$ } from '@builder.io/qwik';
import { UiItem } from '~/ui/UiItem';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';

export default component$(() => {
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
      {/* <OrderOverview orders={orders} /> */}
    </>
  );
});
