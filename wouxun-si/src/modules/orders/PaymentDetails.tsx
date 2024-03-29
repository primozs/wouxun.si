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
import { computeAmount, formatAmount } from '../common/prices';
import { paymentStatusI18n } from './OrderDetails';
import { UiDivider } from '~/ui/UiDivider';
import {
  BankTransferEPCQrCode,
  BankTransferUPNQrCode,
} from '../checkout/BankTransferQrCode';
import { useWebsiteContent } from '../directus/loaders';
import { mdParse } from '~/ui/md-parse';

export interface PaymentDetailsProps {
  order: Order;
}

export const PaymentDetails = component$<PaymentDetailsProps>(({ order }) => {
  const locale = useLocale();
  const website = useWebsiteContent();
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

            <UiDivider />

            {payment.value.data?.manual_payment === 'bank-transfer' && (
              <div
                class="[&>p]:leading-8"
                dangerouslySetInnerHTML={mdParse(website.value?.bank_transfer)}
              ></div>
            )}
          </div>

          <div class="flex flex-col w-1/2">
            <UiTitle>{$localize`Payment details`}</UiTitle>

            {payment.value.data?.manual_payment && (
              <>
                <UiText>
                  {$localize`Payment status`}:{' '}
                  <UiText as="span" color="light">
                    {paymentStatusI18n(order.payment_status)}
                  </UiText>
                </UiText>
                <UiText>
                  {$localize`Manual payment type`}:{' '}
                  <UiText as="span" color="light">
                    {getManualPaymentLabel(
                      payment.value.data?.manual_payment ?? '',
                    )}
                  </UiText>
                </UiText>

                <UiDivider />
              </>
            )}

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

            {/* {(payment.value.provider_id === 'manual' ||
              payment.value.provider_id === 'stenar-manual') && (
              <UiText>
                {`${formatAmount({
                  amount: payment.value.amount,
                  region: order.region,
                  includeTaxes: false,
                })} order at ${formatDate(new Date(payment.value.created_at), locale.value)}`}
              </UiText>
            )} */}

            {payment.value.data?.manual_payment === 'bank-transfer' && (
              <>
                <div class="flex flex-col sm:flex-row">
                  <BankTransferUPNQrCode
                    amount={computeAmount({
                      amount: payment.value.amount,
                      region: order.region,
                      includeTaxes: false,
                    })}
                    order={'#' + order.display_id}
                  />

                  <BankTransferEPCQrCode
                    amount={computeAmount({
                      amount: payment.value.amount,
                      region: order.region,
                      includeTaxes: false,
                    })}
                    order={'#' + order.display_id}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
