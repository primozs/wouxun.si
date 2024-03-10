import { component$ } from '@builder.io/qwik';
import type { Order } from '@medusajs/client-types';
import { formatAmount } from '~/modules/common/prices';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';

export interface OrderSummaryProps {
  order: Order;
}

export const OrderSummary = component$<OrderSummaryProps>(({ order }) => {
  const getAmount = (amount?: number | null) => {
    if (!amount) {
      return;
    }

    return formatAmount({ amount, region: order.region, includeTaxes: false });
  };
  return (
    <div class="my-4 space-y-1">
      <UiTitle size="lg" as="h2">
        {$localize`Order summary`}
      </UiTitle>
      <div class="flex items-center justify-between w-full">
        <UiText>{$localize`Subtotal`}</UiText>
        <UiText>{getAmount(order.subtotal)}</UiText>
      </div>

      {(order.discount_total ?? 0) > 0 && (
        <div class="flex items-center justify-between w-full">
          <UiText>{$localize`Discount`}</UiText>
          <UiText>- {getAmount(order.discount_total)}</UiText>
        </div>
      )}
      {(order.gift_card_total ?? 0) > 0 && (
        <div class="flex items-center justify-between w-full">
          <UiText>{$localize`Discount`}</UiText>
          <UiText>- {getAmount(order.gift_card_total)}</UiText>
        </div>
      )}

      <div class="flex items-center justify-between">
        <UiText>{$localize`Shipping`}</UiText>
        <UiText>{getAmount(order.shipping_total)}</UiText>
      </div>
      <div class="flex items-center justify-between">
        <UiText>{$localize`Taxes`}</UiText>
        <UiText>{getAmount(order.tax_total)}</UiText>
      </div>

      <div class="h-px w-full border-b border-base-content/40 border-dashed my-4" />

      <div class="flex items-center justify-between">
        <UiTitle>{$localize`Total`}</UiTitle>
        <UiTitle>{getAmount(order.total)}</UiTitle>
      </div>
    </div>
  );
});
