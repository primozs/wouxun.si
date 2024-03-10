import {
  type Signal,
  component$,
  useComputed$,
  useSignal,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import type { Cart } from '@medusajs/client-types';
import { IoCheckmarkCircle } from '@qwikest/icons/ionicons';
import { UiIcon } from '~/ui/UiIcon';
import { UiItem } from '~/ui/UiItem';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';
import * as v from 'valibot';
import {
  FormError,
  type InitialValues,
  formAction$,
  useForm,
  valiForm$,
  getValue,
} from '@modular-forms/qwik';
import {
  IoCardOutline,
  IoLogoPaypal,
  IoWalletOutline,
} from '@qwikest/icons/ionicons';
import {
  HiBuildingOfficeOutline,
  HiTruckOutline,
} from '@qwikest/icons/heroicons';
import { handleError } from '../logger';
import { getMedusaClient, getSrvSessionHeaders } from '../medusa';
import { UiRadio } from '~/ui/UiRadio';
import { UiLabel } from '~/ui/UiLabel';
import { InputHelper } from '~/ui/input/InputHelper';
import { Response } from '~/ui/input/Response';
import { FormFooter } from '~/ui/input/FormFooter';
import { Expandable } from '~/ui/expendable/Expandable';
import BankTransfer from '~/content/bankTransfer.mdx';

export interface PaymentProps {
  cart:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'>>>;
}

export const Payment = component$<PaymentProps>(({ cart }) => {
  const location = useLocation();

  const isOpen = useComputed$(() => {
    return location.url.searchParams.get('step') === 'payment';
  });

  const paymentReady = useComputed$(() => {
    return (
      cart.value?.payment_session &&
      (cart.value?.shipping_methods?.length ?? 0) > 0
    );
  });

  return (
    <>
      <UiItem pad={false} lines="none">
        <UiTitle as="h1" size="2xl" class="flex items-center gap-x-2">
          {$localize`Payment`}

          {!isOpen.value && paymentReady.value && (
            <UiIcon color="primary">
              <IoCheckmarkCircle />
            </UiIcon>
          )}
        </UiTitle>

        {!isOpen.value && paymentReady.value && (
          <NavLink
            q:slot="end"
            color="secondary"
            intent="button"
            href={location.url.pathname + '?step=payment'}
          >
            {$localize`Edit`}
          </NavLink>
        )}
      </UiItem>

      {isOpen.value ? (
        <PaymentForm cart={cart} />
      ) : (
        <PaymentDisplay cart={cart} paymentReady={paymentReady} />
      )}
    </>
  );
});

export type FormData = v.Input<typeof FormSchema>;

export const FormSchema = v.object({
  provider_id: v.string([v.minLength(1, $localize`Select payment provider`)]),
  manual_payment_data: v.optional(
    v.object({
      manual_payment: v.optional(v.string()),
    }),
  ),
});

type ResponseType = any;

export const useFormAction = formAction$<FormData, ResponseType>(
  async (data, event) => {
    const client = getMedusaClient();
    const cartId = event.cookie.get('cartid');

    if (!cartId) {
      throw new FormError<FormData>($localize`No cartId cookie found`);
    }

    if (
      data.provider_id === 'stenar-manual' &&
      (data.manual_payment_data?.manual_payment === undefined ||
        data.manual_payment_data?.manual_payment === '')
    ) {
      throw new FormError<FormData>($localize`Select manual payment`);
    }

    await client.carts
      .setPaymentSession(
        cartId.value,
        { provider_id: data.provider_id },
        getSrvSessionHeaders(event),
      )
      .catch((error) => {
        handleError(error);
        throw new FormError<FormData>($localize`Submit was not successfull`);
      });

    if (
      data.provider_id === 'stenar-manual' &&
      data.manual_payment_data?.manual_payment
    ) {
      await client.carts
        .updatePaymentSession(cartId.value, data.provider_id, {
          data: {
            manual_payment: data.manual_payment_data.manual_payment,
          },
        })
        .catch((error) => {
          handleError(error);
          throw new FormError<FormData>($localize`Submit was not successfull`);
        });
    }

    return {
      status: 'success',
      message: $localize`Submitted successfully`,
    };
  },
  valiForm$(FormSchema),
);

export interface PaymentFormProps {
  cart:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'>>>;
}

export const PaymentForm = component$<PaymentFormProps>(({ cart }) => {
  const location = useLocation();

  const initialData = useSignal<InitialValues<FormData>>({
    provider_id: cart.value?.payment_session?.provider_id ?? '',
    manual_payment_data: {
      manual_payment: cart.value?.payment_session?.data?.manual_payment ?? '',
    },
  });

  const [form, { Form, Field }] = useForm<FormData>({
    loader: initialData,
    validate: valiForm$(FormSchema),
    action: useFormAction(),
  });

  const paymentSessions = useComputed$(() => {
    return cart.value?.payment_sessions ?? [];
  });

  // const paymentSession = useComputed$(() => {
  //   return cart.value?.payment_session ?? null;
  // });

  // const isStripe = useComputed$(() => {
  //   return cart.value?.payment_session?.provider_id === 'stripe';
  // });

  const redirectUrl = location.url.pathname + '?step=review';

  return (
    <>
      <Form class="space-y-4">
        <Field name="provider_id">
          {(field, props) => (
            <div>
              {paymentSessions.value
                .sort((a, b) => {
                  return a.provider_id > b.provider_id ? 1 : -1;
                })
                .map((option) => {
                  return (
                    <UiRadio
                      key={option.id}
                      {...props}
                      value={option.provider_id}
                      checked={field.value === option.provider_id}
                    >
                      <PaymentIcon providerId={option.provider_id} />

                      <UiLabel>{getPaymentLabel(option.provider_id)}</UiLabel>
                    </UiRadio>
                  );
                })}

              <InputHelper error={!!field.error} intent="error">
                {field.error}
              </InputHelper>
            </div>
          )}
        </Field>

        <Expandable
          expanded={getValue(form, 'provider_id') === 'stenar-manual'}
        >
          <Field name="manual_payment_data.manual_payment">
            {(field, props) => (
              <div>
                <UiRadio
                  {...props}
                  value="payment-on-delivery"
                  checked={field.value === 'payment-on-delivery'}
                >
                  <PaymentManualIcon type="payment-on-delivery" />
                  <UiLabel>
                    {getManualPaymentLabel('payment-on-delivery')}
                  </UiLabel>
                </UiRadio>
                <UiRadio
                  {...props}
                  value="bank-transfer"
                  checked={field.value === 'bank-transfer'}
                >
                  <PaymentManualIcon type="bank-transfer" />
                  <UiLabel>{getManualPaymentLabel('bank-transfer')}</UiLabel>
                </UiRadio>

                <InputHelper error={!!field.error} intent="error">
                  {field.error}
                </InputHelper>
              </div>
            )}
          </Field>
        </Expandable>

        <div>
          <Response of={form} redirectUrl={redirectUrl} />
        </div>

        <FormFooter
          of={form}
          withoutCancel
          submitLabel={$localize`Continue to review`}
        />
      </Form>
      {/* {isStripe && (
              <div class="mt-5 transition-all duration-150 ease-in-out">
                <Text class="txt-medium-plus text-ui-fg-base mb-1">
                  Enter your card details:
                </Text>

                <CardElement
                  options={useOptions as StripeCardElementOptions}
                  onChange={(e) => {
                    setCardBrand(
                      e.brand &&
                        e.brand.charAt(0).toUpperCase() + e.brand.slice(1)
                    )
                    setError(e.error?.message || null)
                    setCardComplete(e.complete)
                  }}
                />
              </div>
            )} */}
      {/* <ErrorMessage error={error} /> */}
      {/* <Button
              size="large"
              class="mt-6"
              onClick={handleSubmit}
              isLoading={isLoading}
              disabled={(isStripe && !cardComplete) || !cart.payment_session}
            >
              Continue to review
            </Button> */}
    </>
  );
});

export interface PaymentDisplayProps {
  cart:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'>>>;
  paymentReady: Readonly<Signal<boolean | null | undefined>>;
}

export const PaymentDisplay = component$<PaymentDisplayProps>(
  ({ cart, paymentReady }) => {
    return (
      <>
        {cart && paymentReady.value && cart.value?.payment_session && (
          <div class="flex items-start gap-x-1 w-full">
            <div class="flex flex-col w-1/2">
              <UiTitle>{$localize`Payment method`}</UiTitle>
              <div class="flex items-center gap-3">
                <PaymentIcon
                  providerId={cart.value.payment_session.provider_id}
                />
                <UiText>
                  {getPaymentLabel(cart.value.payment_session.provider_id)}
                </UiText>
              </div>
            </div>
            <div class="flex flex-col w-1/2">
              <UiTitle>{$localize`Payment details`}</UiTitle>
              <UiText>
                {getManualPaymentLabel(
                  cart.value?.payment_session?.data?.manual_payment ?? '',
                )}
              </UiText>

              {cart.value?.payment_session?.data?.manual_payment ===
                'bank-transfer' && (
                <div class="mt-3 [&>p]:leading-8">
                  <BankTransfer />
                </div>
              )}
            </div>
          </div>
        )}
      </>
    );
  },
);

export const getPaymentLabel = (providerId: string | undefined) => {
  if (!providerId) return '';
  switch (providerId) {
    case 'stripe':
      return $localize`Credit card`;
    case 'stripe-ideal':
      return 'iDeal';
    case 'stripe-bancontact':
      return 'Bancontact';
    case 'paypal':
      return 'PayPal';
    case 'manual':
    case 'stenar-manual':
      return $localize`Manual payment`;
    // Payment at pickup, delivery / Bank transfer
    default:
      return providerId;
  }
};

export interface PaymentIconProps {
  providerId: string | undefined;
}

export const PaymentIcon = component$<PaymentIconProps>(({ providerId }) => {
  return (
    <UiIcon class="text-base-content/70">
      {providerId === 'stripe' && <IoCardOutline />}
      {providerId === 'stripe-ideal' && <IoCardOutline />}
      {providerId === 'stripe-bancontact' && <IoCardOutline />}
      {providerId === 'paypal' && <IoLogoPaypal />}
      {providerId === 'manual' && <IoWalletOutline />}
      {providerId === 'stenar-manual' && <IoWalletOutline />}
    </UiIcon>
  );
});

export const getManualPaymentLabel = (type: string | undefined) => {
  if (!type) return '';
  switch (type) {
    case 'payment-on-delivery':
      return $localize`Payment on delivery`;
    case 'bank-transfer':
      return $localize`Bank transfer`;
    default:
      return type;
  }
};

export interface PaymentManualIconProps {
  type: string | undefined;
}

export const PaymentManualIcon = component$<PaymentManualIconProps>(
  ({ type }) => {
    return (
      <UiIcon class="text-base-content/70">
        {type === 'payment-on-delivery' && <HiTruckOutline />}
        {type === 'bank-transfer' && <HiBuildingOfficeOutline />}
      </UiIcon>
    );
  },
);
