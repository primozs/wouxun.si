import { component$, useComputed$ } from '@builder.io/qwik';
import type { Order } from '@medusajs/client-types';
import { useLocale } from '~/modules/locale/LocaleProvider';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { formatDate } from '~/ui/common/formatDate';
import {
  PaymentIcon,
  getManualPaymentLabel,
  getPaymentLabel,
} from '../checkout/Payment';
import BankTransfer from '~/content/bankTransfer.mdx';
import { formatAmount } from '../common/prices';
import { paymentStatusI18n } from './OrderDetails';
import { UiDivider } from '~/ui/UiDivider';

export interface PaymentDetailsProps {
  order: Order;
}

export const PaymentDetails = component$<PaymentDetailsProps>(({ order }) => {
  const locale = useLocale();
  const payment = useComputed$(() => {
    const payments = order.payments ?? [];
    const payment = payments[0];
    return payment;
  });
  return (
    <div class="my-4">
      <UiTitle size="lg" as="h2">
        {$localize`Payment`}
      </UiTitle>

      {payment.value && (
        <div class="flex items-start gap-x-8">
          <div class="flex flex-col w-1/2">
            <UiTitle>{$localize`Payment method`}</UiTitle>

            <div class="flex items-center gap-3">
              <PaymentIcon providerId={payment.value.provider_id} />
              <UiText>{getPaymentLabel(payment.value.provider_id)}</UiText>
            </div>
          </div>

          <div class="flex flex-col w-1/2">
            <UiTitle>{$localize`Payment details`}</UiTitle>
            <UiText>
              {$localize`Payment status`}:{' '}
              <UiText as="span" color="light">
                {paymentStatusI18n(order.payment_status)}
              </UiText>
            </UiText>

            {payment.value.data?.manual_payment && (
              <UiText>
                {$localize`Manual payment type`}:{' '}
                <UiText as="span" color="light">
                  {getManualPaymentLabel(
                    payment.value.data?.manual_payment ?? '',
                  )}
                </UiText>
              </UiText>
            )}

            <UiDivider />

            {payment.value.provider_id === 'stripe' &&
              payment.value.data.card_last4 && (
                <UiText>
                  {`**** **** **** ${payment.value.data.card_last4}`}
                </UiText>
              )}

            {payment.value.provider_id === 'paypal' && (
              <UiText>
                {`${formatAmount({
                  amount: payment.value.amount,
                  region: order.region,
                  includeTaxes: false,
                })} paid at ${formatDate(new Date(payment.value.created_at), locale.value)}`}
              </UiText>
            )}

            {(payment.value.provider_id === 'manual' ||
              payment.value.provider_id === 'stenar-manual') && (
              <UiText>
                {`${formatAmount({
                  amount: payment.value.amount,
                  region: order.region,
                  includeTaxes: false,
                })} order at ${formatDate(new Date(payment.value.created_at), locale.value)}`}
              </UiText>
            )}

            {payment.value.data?.manual_payment === 'bank-transfer' && (
              <>
                <UiDivider />
                <div class="[&>p]:leading-8">
                  <BankTransfer />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
