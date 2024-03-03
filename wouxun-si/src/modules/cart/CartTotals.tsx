import { component$ } from '@builder.io/qwik';
import type { Cart, Order } from '@medusajs/client-types';
import { formatAmount } from '../common/prices';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { UiIcon } from '~/ui/UiIcon';
import { IoInformationCircle } from '@qwikest/icons/ionicons';
import { UiTooltip } from '~/ui/UiTooltip';

export interface CartTotalsProps {
  data: Omit<Cart, 'refundable_amount' | 'refunded_total'> | Order;
}

export const CartTotals = component$<CartTotalsProps>(({ data }) => {
  const {
    subtotal,
    discount_total,
    gift_card_total,
    tax_total,
    shipping_total,
    total,
  } = data;

  const getAmount = (amount: number | null | undefined) => {
    return formatAmount({
      amount: amount || 0,
      region: data.region,
      includeTaxes: false,
    });
  };

  return (
    <div>
      <div class="flex flex-col gap-y-2 font-medium">
        <div class="flex items-center justify-between">
          <UiText color="light" class="flex gap-x-1 items-center">
            {$localize`Subtotal`}
            <UiTooltip
              tip={$localize`Cart total excluding shipping and taxes.`}
            >
              <UiIcon size="sm">
                <IoInformationCircle />
              </UiIcon>
            </UiTooltip>
          </UiText>
          <UiText color="light">{getAmount(subtotal)}</UiText>
        </div>
        {!!discount_total && (
          <div class="flex items-center justify-between">
            <UiText color="light">{$localize`Discount`}</UiText>
            <UiText color="primary">- {getAmount(discount_total)}</UiText>
          </div>
        )}
        {!!gift_card_total && (
          <div class="flex items-center justify-between">
            <UiText color="light">{$localize`Gift card`}</UiText>
            <UiText color="primary">- {getAmount(gift_card_total)}</UiText>
          </div>
        )}
        <div class="flex items-center justify-between">
          <UiText color="light">{$localize`Shipping`}</UiText>
          <UiText color="light">{getAmount(shipping_total)}</UiText>
        </div>
        <div class="flex justify-between">
          <UiText color="light">{$localize`Taxes`}</UiText>
          <UiText color="light">{getAmount(tax_total)}</UiText>
        </div>
      </div>
      <div class="h-px w-full border-b border-base-300 my-4" />
      <div class="flex items-center justify-between text-ui-fg-base mb-2 txt-medium ">
        <UiTitle>{$localize`Total`}</UiTitle>
        <UiTitle>{getAmount(total)}</UiTitle>
      </div>
    </div>
  );
});
