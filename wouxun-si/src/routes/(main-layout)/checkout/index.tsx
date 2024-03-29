import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import type { Cart, Customer } from '@medusajs/client-types';
import { Addresses } from '~/modules/checkout/Addresses';
import { Delivery } from '~/modules/checkout/Delivery';
import { CheckoutSummary } from '~/modules/checkout/CheckoutSummary';
import { handleError } from '~/modules/logger';
import { getMedusaClient, getSrvSessionHeaders } from '~/modules/medusa';
import { NotFound } from '~/modules/not-found/NotFound';
import { useCartLoader } from '~/routes/plugin@store';
import { Payment } from '~/modules/checkout/Payment';
import { Review } from '~/modules/checkout/Review';
import { UiDivider } from '~/ui/UiDivider';

export const usePaymentSession = routeLoader$(async (event) => {
  const cartId = event.cookie.get('cartid');
  const client = getMedusaClient();
  if (!cartId?.value) return null;

  return client.carts
    .createPaymentSessions(cartId.value, getSrvSessionHeaders(event))
    .then(({ cart }) => cart as unknown as Cart)
    .catch((error) => {
      handleError(error, 'Payment session');
      return null;
    });
});

export const useShippingMetods = routeLoader$(async (event) => {
  const cart = await event.resolveValue(usePaymentSession);

  const client = getMedusaClient();
  if (!cart) return null;

  return client.shippingOptions
    .list(
      {
        region_id: cart.region_id,
        product_ids: undefined, // string[] | undefined productIds?.join(",")
      },
      getSrvSessionHeaders(event),
    )
    .then(({ shipping_options }) => shipping_options)
    .catch((error) => {
      handleError(error, 'Shipping options');
      return null;
    });
});

export const useCustomer = routeLoader$(async (event) => {
  try {
    const client = getMedusaClient();
    const res = await client.customers.retrieve(getSrvSessionHeaders(event));
    return res.customer as unknown as Customer;
  } catch (error) {
    return null;
  }
});

export default component$(() => {
  const cart = useCartLoader();

  return (
    <>
      {cart.value ? (
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_416px] lg:gap-x-20 xl:gap-x-40">
          <CheckoutForms />
          <CheckoutSummary cart={cart} />
        </div>
      ) : (
        <NotFound centered={true} />
      )}
    </>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Checkout`,
});

export interface CheckoutFormsProps {}

export const CheckoutForms = component$<CheckoutFormsProps>(() => {
  const cart = usePaymentSession();
  const customer = useCustomer();
  const availableShippingMethods = useShippingMetods();

  return (
    <>
      <div class="space-y-4">
        <div>
          <Addresses cart={cart} customer={customer} />
        </div>
        <UiDivider />
        <div>
          <Delivery
            cart={cart}
            availableShippingMethods={availableShippingMethods}
          />
        </div>
        <UiDivider />
        <div>
          <Payment cart={cart} />
        </div>
        <UiDivider />
        <div>
          <Review cart={cart} />
        </div>
      </div>
    </>
  );
});
