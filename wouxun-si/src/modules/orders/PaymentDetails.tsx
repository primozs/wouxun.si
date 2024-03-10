import { component$ } from '@builder.io/qwik';
import type { Order } from '@medusajs/client-types';
import type { FulfillmentStatus, PaymentStatus } from '@medusajs/medusa';
import { useLocale } from '~/modules/locale/LocaleProvider';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';
import { formatDate } from '~/ui/common/formatDate';

export interface PaymentDetailsProps {
  order: Order;
}

export const PaymentDetails = component$<PaymentDetailsProps>((props) => {
  return <div class="my-4">payment details</div>;
});
