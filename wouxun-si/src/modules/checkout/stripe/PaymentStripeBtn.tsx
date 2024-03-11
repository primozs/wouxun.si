import {
  type Signal,
  component$,
  useSignal,
  useComputed$,
  $,
} from '@builder.io/qwik';
import type { Cart, PaymentSession } from '@medusajs/client-types';
import { InputHelper } from '~/ui/input/InputHelper';
import { useStripe, useStripeProvider } from './StripeProvider';
import { CardElement } from './CardElement';
import { UiTitle } from '~/ui/UiTitle';
import { Button } from '~/ui/button';
import { FormError, formAction$, valiForm$ } from '@modular-forms/qwik';
import * as v from 'valibot';
import { getMedusaClient, getSrvSessionHeaders } from '~/modules/medusa';
import { handleError } from '~/modules/logger';

export type FormData = v.Input<typeof FormSchema>;

export const FormSchema = v.object({});

type ResponseType = any;

export const useFormAction = formAction$<FormData, ResponseType>(
  async (_, event) => {
    const client = getMedusaClient();
    const cartId = event.cookie.get('cartid');

    if (!cartId) {
      throw new FormError<FormData>($localize`No cartId cookie found`);
    }

    const cart = await client.carts
      .complete(cartId.value, getSrvSessionHeaders(event))
      .then((res) => res)
      .catch((error) => {
        handleError(error);
        throw new FormError<FormData>($localize`Submit was not successfull`);
      });

    if (cart?.type === 'order') {
      event.cookie.set('cartid', '', {
        maxAge: -1,
      });
      return event.redirect(302, `/checkout/order/confirmed/${cart?.data.id}`);
    }

    return {
      status: 'success',
      message: $localize`Submitted successfully`,
    };
  },
  valiForm$(FormSchema),
);

export interface PaymentStripeBtnProps {
  notReady: boolean;
  cart:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'>>>;
}

export const PaymentStripeBtn = component$<PaymentStripeBtnProps>(
  ({ notReady, cart }) => {
    const action = useFormAction();
    const submitting = useSignal(false);
    const error = useSignal<string | null>(null);
    const cardCompleted = useSignal(false);
    useStripeProvider(cart, error);
    const { elements, stripe } = useStripe();

    const paymentSession = useComputed$(() => {
      const session = cart.value?.payment_session as PaymentSession;
      return session;
    });

    const isReady = useComputed$(() => {
      return (
        elements.value &&
        stripe.value &&
        !notReady &&
        !error.value &&
        cardCompleted.value
      );
    });

    const handlePayment = $(async () => {
      const card = elements.value?.getElement('card');
      submitting.value = true;

      if (!stripe.value || !elements.value || !card || !cart.value) {
        submitting.value = false;
        return;
      }

      await stripe.value
        .confirmCardPayment(paymentSession.value.data.client_secret as string, {
          payment_method: {
            card: card,
            billing_details: {
              name:
                cart.value?.billing_address?.first_name +
                ' ' +
                cart.value?.billing_address?.last_name,
              address: {
                city: cart.value?.billing_address?.city ?? undefined,
                country: cart.value?.billing_address?.country_code ?? undefined,
                line1: cart.value?.billing_address?.address_1 ?? undefined,
                line2: cart.value?.billing_address?.address_2 ?? undefined,
                postal_code:
                  cart.value?.billing_address?.postal_code ?? undefined,
                state: cart.value?.billing_address?.province ?? undefined,
              },
              email: cart.value?.email ?? '',
              phone: cart.value?.billing_address?.phone ?? undefined,
            },
          },
        })
        .then(async ({ error: err, paymentIntent }) => {
          if (err) {
            const pi = err.payment_intent;

            if (
              (pi && pi.status === 'requires_capture') ||
              (pi && pi.status === 'succeeded')
            ) {
              const result = await action.submit({});
              if (result.value.response.status === 'error') {
                error.value = result.value.response.message ?? null;
              }
            }

            error.value = err.message ?? null;

            return;
          }

          if (
            (paymentIntent && paymentIntent.status === 'requires_capture') ||
            paymentIntent.status === 'succeeded'
          ) {
            const result = await action.submit({});
            if (result.value.response.status === 'error') {
              error.value = result.value.response.message ?? null;
            }
          }

          return;
        })
        .catch(() => {
          submitting.value = false;
        });
    });

    return (
      <div>
        <div class="mt-5 transition-all duration-150 ease-in-out w-1/2">
          <UiTitle class="mb-2">{$localize`Enter your card details:`}</UiTitle>

          <CardElement
            onChange$={(e) => {
              if (e.error?.message) {
                error.value = e.error.message;
              } else {
                error.value = null;
              }

              cardCompleted.value = e.complete;
            }}
          />
        </div>

        <InputHelper error={!!error.value} intent="error">
          {error.value}
        </InputHelper>

        <footer class="flex flex-row-reverse justify-start gap-4">
          <Button
            color="primary"
            type="button"
            loading={submitting.value}
            disabled={!isReady.value}
            onClick$={handlePayment}
          >
            {$localize`Place order`}
          </Button>
        </footer>
      </div>
    );
  },
);
