import { component$ } from '@builder.io/qwik';
import { LineItem, Region } from '@medusajs/medusa';
import { getPercentageDiff } from '~/modules/common/getPercentageDiff';
import { formatAmount } from '~/modules/common/prices';
import { CalculatedVariant } from '~/modules/medusa/types';
import { UiText } from '~/ui/UiText';

export interface LineItemUnitPriceProps {
  item: Omit<LineItem, 'beforeInsert'>;
  region: Region;
  style?: 'default' | 'tight';
}

export const LineItemUnitPrice = component$<LineItemUnitPriceProps>(
  ({ item, region, style = 'default' }) => {
    const originalPrice = (item.variant as CalculatedVariant).original_price;
    const hasReducedPrice = (originalPrice * item.quantity || 0) > item.total!;
    const reducedPrice = (item.total || 0) / item.quantity!;

    return (
      <div class="flex flex-col justify-center h-full text-right">
        {hasReducedPrice && (
          <>
            <p>
              {style === 'default' && (
                <UiText as="span" color="light">
                  {$localize`Original`}:{' '}
                </UiText>
              )}
              <UiText as="span" color="light" class="line-through">
                {formatAmount({
                  amount: originalPrice,
                  region: region,
                  includeTaxes: false,
                })}
              </UiText>
            </p>
            {style === 'default' && (
              <UiText color="primary">
                -{getPercentageDiff(originalPrice, reducedPrice || 0)}%
              </UiText>
            )}
          </>
        )}
        <UiText color={hasReducedPrice ? 'primary' : 'light'}>
          {formatAmount({
            amount: reducedPrice || item.unit_price || 0,
            region: region,
            includeTaxes: false,
          })}
        </UiText>
      </div>
    );
  },
);

export interface LineItemPriceProps {
  item: Omit<LineItem, 'beforeInsert'>;
  region: Region;
  style?: 'default' | 'tight';
}

export const LineItemPrice = component$<LineItemPriceProps>(
  ({ item, region, style = 'default' }) => {
    const originalPrice =
      (item.variant as CalculatedVariant).original_price * item.quantity;
    const hasReducedPrice = (item.total || 0) < originalPrice;

    return (
      <div class="flex flex-col gap-x-2 items-end">
        <div class="text-left">
          {hasReducedPrice && (
            <>
              <p>
                {style === 'default' && (
                  <UiText as="span" color="light">
                    {$localize`Original`}:{' '}
                  </UiText>
                )}
                <span class="line-through text-ui-fg-muted">
                  {formatAmount({
                    amount: originalPrice,
                    region: region,
                    includeTaxes: false,
                  })}
                </span>
              </p>
              {style === 'default' && (
                <span class="text-ui-fg-interactive">
                  -{getPercentageDiff(originalPrice, item.total || 0)}%
                </span>
              )}
            </>
          )}

          <UiText color={hasReducedPrice ? 'primary' : 'base'}>
            {formatAmount({
              amount: item.total || 0,
              region: region,
              includeTaxes: false,
            })}
          </UiText>
        </div>
      </div>
    );
  },
);
