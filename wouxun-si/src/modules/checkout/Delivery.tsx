import {
  type Signal,
  component$,
  useComputed$,
  useSignal,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import type { Cart } from '@medusajs/client-types';
import type { PricedShippingOption } from '@medusajs/medusa/dist/types/pricing';
import { IoCheckmarkCircle } from '@qwikest/icons/ionicons';
import { UiIcon } from '~/ui/UiIcon';
import { UiItem } from '~/ui/UiItem';
import { UiLabel } from '~/ui/UiLabel';
import { UiRadio } from '~/ui/UiRadio';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { NavLink } from '~/ui/button';
import { formatAmount } from '../common/prices';
import * as v from 'valibot';
import {
  FormError,
  type InitialValues,
  formAction$,
  useForm,
  valiForm$,
} from '@modular-forms/qwik';
import { handleError } from '../logger';
import { getMedusaClient, getSrvSessionHeaders } from '../medusa';
import { Response } from '~/ui/input/Response';
import { FormFooter } from '~/ui/input/FormFooter';
import { InputHelper } from '~/ui/input/InputHelper';

export interface DeliveryProps {
  cart:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'>>>;
  availableShippingMethods:
    | Readonly<Signal<null>>
    | Readonly<Signal<PricedShippingOption[]>>;
}

export const Delivery = component$<DeliveryProps>(
  ({ cart, availableShippingMethods }) => {
    const location = useLocation();

    const isOpen = useComputed$(() => {
      return location.url.searchParams.get('step') === 'delivery';
    });

    const shippingMethods = useComputed$(() => {
      return cart.value?.shipping_methods ?? [];
    });

    const shippingMethod = useComputed$(() => {
      const method = shippingMethods.value[0];

      const selected = availableShippingMethods.value?.find(
        (item) => item.id === method?.shipping_option_id,
      );
      return selected;
    });

    return (
      <>
        <UiItem pad={false} lines="none">
          <UiTitle as="h1" size="2xl" class="flex items-center gap-x-2">
            {$localize`Delivery`}

            {!isOpen.value && shippingMethods.value.length > 0 && (
              <UiIcon color="primary">
                <IoCheckmarkCircle />
              </UiIcon>
            )}
          </UiTitle>

          {!isOpen.value &&
            cart.value?.shipping_address &&
            cart.value?.billing_address &&
            cart.value?.email && (
              <NavLink
                q:slot="end"
                color="secondary"
                intent="button"
                href={location.url.pathname + '?step=delivery'}
              >
                {$localize`Edit`}
              </NavLink>
            )}
        </UiItem>

        {isOpen.value ? (
          <DeliveryForm
            cart={cart}
            availableShippingMethods={availableShippingMethods}
          />
        ) : (
          <>
            {cart.value && shippingMethods.value.length > 0 && (
              <div>
                <UiTitle>{$localize`Method`}</UiTitle>
                <UiText>
                  {getOptionLabel(shippingMethod.value, cart)} (
                  {formatAmount({
                    amount: shippingMethod.value?.amount ?? 0,
                    region: cart.value.region,
                    includeTaxes: false,
                  })
                    .replace(/,/g, '')
                    .replace(/\./g, ',')}
                  )
                </UiText>
              </div>
            )}
          </>
        )}
      </>
    );
  },
);

export type FormData = v.Input<typeof FormSchema>;

export const FormSchema = v.object({
  option_id: v.string([v.minLength(1, $localize`Select delivery`)]),
});

type ResponseType = any;

export const useFormAction = formAction$<FormData, ResponseType>(
  async (data, event) => {
    const client = getMedusaClient();
    const cartId = event.cookie.get('cartid');

    if (!cartId) {
      throw new FormError<FormData>($localize`No cartId cookie found`);
    }

    await client.carts
      .addShippingMethod(cartId.value, data, getSrvSessionHeaders(event))
      .catch((error) => {
        handleError(error);
        throw new FormError<FormData>($localize`Submit was not successfull`);
      });

    return {
      status: 'success',
      message: $localize`Submitted successfully`,
    };
  },
  valiForm$(FormSchema),
);

export interface DeliveryFormProps {
  cart:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'>>>;
  availableShippingMethods:
    | Readonly<Signal<null>>
    | Readonly<Signal<PricedShippingOption[]>>;
}

export const DeliveryForm = component$<DeliveryFormProps>(
  ({ cart, availableShippingMethods }) => {
    const location = useLocation();
    const shipping_methods = cart.value?.shipping_methods ?? [];

    const initialData = useSignal<InitialValues<FormData>>({
      option_id: shipping_methods[0]?.shipping_option_id ?? '',
    });

    const [form, { Form, Field }] = useForm<FormData>({
      loader: initialData,
      validate: valiForm$(FormSchema),
      action: useFormAction(),
    });

    const redirectUrl = location.url.pathname + '?step=payment';

    return (
      <Form class="space-y-4">
        <Field name="option_id">
          {(field, props) => (
            <div>
              {availableShippingMethods.value?.map((option) => {
                return (
                  <UiRadio
                    key={option.id}
                    {...props}
                    value={option.id}
                    checked={field.value === option.id}
                  >
                    <UiLabel q:slot="end">
                      {getOptionLabel(option, cart)}
                    </UiLabel>

                    <UiText q:slot="end">
                      {formatAmount({
                        amount: option.amount!,
                        region: cart.value?.region,
                        includeTaxes: false,
                      })}
                    </UiText>
                  </UiRadio>
                );
              })}

              <InputHelper error={!!field.error} intent="error">
                {field.error}
              </InputHelper>
            </div>
          )}
        </Field>

        <div>
          <Response of={form} redirectUrl={redirectUrl} />
        </div>

        <FormFooter
          of={form}
          withoutCancel
          submitLabel={$localize`Continue to payment`}
        />
      </Form>
    );
  },
);

const getOptionLabel = (
  option: PricedShippingOption | undefined,
  cart:
    | Readonly<Signal<null>>
    | Readonly<Signal<Omit<Cart, 'refundable_amount' | 'refunded_total'>>>,
) => {
  if (!option) return '';

  const localeKey = option.metadata?.name;
  const requirement = (option.requirements ?? []).find(
    (item) => item.type === 'min_subtotal',
  );

  switch (localeKey) {
    case 'personal-pickup':
      return $localize`Personal pickup`;
    case 'free-shipping':
      return $localize`Free shipping above ${formatAmount({
        amount: requirement?.amount ?? 0,
        region: cart.value?.region,
        includeTaxes: false,
      })}`;
    case 'post-express':
      return $localize`Post express`;
    case 'post-standard':
      return $localize`Post standard`;
    default:
      return option.name;
  }
};
