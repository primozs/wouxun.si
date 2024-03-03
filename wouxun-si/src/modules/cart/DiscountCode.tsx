import { type Signal, component$, useComputed$ } from '@builder.io/qwik';
import type { Cart, Discount } from '@medusajs/client-types';
import { IoInformationCircle, IoTrashOutline } from '@qwikest/icons/ionicons';
import { UiIcon } from '~/ui/UiIcon';
import { UiText } from '~/ui/UiText';
import { UiTooltip } from '~/ui/UiTooltip';
import * as v from 'valibot';
import {
  FormError,
  formAction$,
  useForm,
  valiForm$,
} from '@modular-forms/qwik';
import { getMedusaClient, getSrvSessionHeaders } from '../medusa';
import { handleError } from '../logger';
import { TextInput } from '~/ui/input/TextInput';
import { Response } from '~/ui/input/Response';
import { UiItem } from '~/ui/UiItem';
import { Button } from '~/ui/button';
import { UiTitle } from '~/ui/UiTitle';
import { UiList } from '~/ui/UiList';
import { formatAmount } from '../common/prices';
import { UiLabel } from '~/ui/UiLabel';
import {
  useRemoveDiscountAction,
  useRemoveGiftCardAction,
} from '~/routes/plugin@store';

export interface DiscountCodeProps {
  cart: Signal<Cart | null>;
}

export const DiscountCode = component$<DiscountCodeProps>(({ cart }) => {
  const state = useComputed$(() => {
    const discounts = cart.value?.discounts;

    if (!discounts || !discounts[0]) {
      return { discount: undefined, appliedDiscount: undefined };
    } else {
      const discount = discounts[0];
      let appliedDiscount = '';

      switch (discount.rule?.type) {
        case 'percentage':
          appliedDiscount = `${discount.rule.value}%`;
          break;
        case 'fixed':
          appliedDiscount = `- ${formatAmount({
            amount: discount.rule.value,
            region: cart.value?.region,
          })}`;
          break;
        default:
          appliedDiscount = $localize`Free shipping`;
      }
      return { discount, appliedDiscount };
    }
  });

  return (
    <div>
      {cart.value && <GiftCardsList cart={cart.value} />}

      {state.value.appliedDiscount ? (
        <AppliedDiscount
          discount={state.value.discount}
          appliedDiscount={state.value.appliedDiscount}
        />
      ) : (
        <details class="appearance-none ">
          <summary
            class={[
              `
            cursor-pointer
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-offset-1
            mb-1`,
            ]}
          >
            <UiText color="primary">
              {$localize`Add gift card or discount code`}{' '}
              <UiTooltip
                tip={$localize`You can add multiple gift cards, but only one discount code.`}
              >
                <UiIcon size="sm">
                  <IoInformationCircle />
                </UiIcon>
              </UiTooltip>
            </UiText>
          </summary>

          <DiscountCodeForm></DiscountCodeForm>
        </details>
      )}
    </div>
  );
});

export interface AppliedDiscountProps {
  discount: Discount | undefined;
  appliedDiscount: string | undefined;
}

export const AppliedDiscount = component$<AppliedDiscountProps>(
  ({ appliedDiscount, discount }) => {
    const action = useRemoveDiscountAction();
    return (
      <div class="mb-5">
        <UiList>
          <UiTitle>{$localize`Discount applied`}:</UiTitle>
          <UiItem pad={false} lines="none">
            <UiLabel>
              <UiText class="truncate">
                {$localize`Code`}: {discount?.code}
              </UiText>
              <UiTitle>{appliedDiscount}</UiTitle>
            </UiLabel>

            <Button
              q:slot="end"
              intent="square"
              color="ghost"
              type="button"
              loading={action.isRunning}
              onClick$={() => {
                action.submit({
                  code: discount!.code,
                });
              }}
            >
              <span class="sr-only">
                {$localize`Remove discount code from order`}
              </span>
              <UiIcon size="sm">
                <IoTrashOutline />
              </UiIcon>
            </Button>
          </UiItem>
        </UiList>
      </div>
    );
  },
);

export interface GiftCardsListProps {
  cart: Cart;
}

export const GiftCardsList = component$<GiftCardsListProps>((props) => {
  const action = useRemoveGiftCardAction();
  return (
    <>
      {(props.cart.gift_cards?.length ?? 0) > 0 && (
        <div class="mb-5">
          <UiList>
            <UiTitle>{$localize`Gift card(s) applied`}:</UiTitle>
            {props.cart.gift_cards?.map((gc) => {
              return (
                <UiItem key={gc.code} pad={false}>
                  <UiLabel>
                    <UiText class="truncate">
                      {$localize`Code`}: {gc.code}
                    </UiText>
                    <UiTitle>
                      {formatAmount({
                        region: props.cart.region,
                        amount: gc.balance,
                        includeTaxes: false,
                      })}
                    </UiTitle>
                  </UiLabel>

                  <Button
                    q:slot="end"
                    intent="square"
                    color="ghost"
                    type="button"
                    loading={action.isRunning}
                    onClick$={() => {
                      action.submit({
                        codeToRemove: gc.code,
                        giftCards:
                          props.cart.gift_cards?.map((item) => item.code) ?? [],
                      });
                    }}
                  >
                    <span class="sr-only">
                      {$localize`Remove gift card from order`}
                    </span>
                    <UiIcon size="sm">
                      <IoTrashOutline />
                    </UiIcon>
                  </Button>
                </UiItem>
              );
            })}
          </UiList>
        </div>
      )}
    </>
  );
});

type DiscountCodeFormData = v.Input<typeof DiscountCodeFormSchema>;

const DiscountCodeFormSchema = v.object({
  code: v.string([v.minLength(1, $localize`Enter code`)]),
});

type ResponseType = any;

export const useFormAction = formAction$<DiscountCodeFormData, ResponseType>(
  async (data, event) => {
    const client = getMedusaClient();
    const cartId = event.cookie.get('cartid');

    if (!cartId || !cartId.value) {
      throw new FormError<DiscountCodeFormData>($localize`Cart not found`);
    }

    try {
      // apply discount
      await client.carts
        .update(
          cartId.value,
          { discounts: [{ code: data.code }] },
          getSrvSessionHeaders(event),
        )
        .then(({ cart }) => cart)
        .catch(async (error) => {
          handleError(error);

          // apply gift card
          await client.carts
            .update(
              cartId.value,
              { gift_cards: [{ code: data.code }] },
              getSrvSessionHeaders(event),
            )
            .then(({ cart }) => cart)
            .catch((error) => {
              handleError(error);
              throw error;
            });
        });
      return {
        status: 'success',
        message: $localize`Submitted successfully`,
      };
    } catch (error: any) {
      handleError(error);
      throw new FormError<DiscountCodeFormData>(
        $localize`Submit was not successfull`,
      );
    }
  },
  valiForm$(DiscountCodeFormSchema),
);

export const DiscountCodeForm = component$(() => {
  const [form, { Form, Field }] = useForm<DiscountCodeFormData>({
    loader: { value: { code: '' } },
    validate: valiForm$(DiscountCodeFormSchema),
    action: useFormAction(),
  });

  return (
    <>
      <Form class="space-y-0">
        <UiItem pad={false} lines="none">
          <div class="flex-1 mr-3">
            <Field name="code">
              {(field, props) => (
                <TextInput
                  {...props}
                  type="text"
                  label={$localize`Code`}
                  placeholder={$localize`Enter code`}
                  required
                  value={field.value}
                  error={field.error}
                ></TextInput>
              )}
            </Field>
          </div>

          <div q:slot="end" class="mt-3">
            <Button color="primary" type="submit" loading={form.submitting}>
              {$localize`Apply`}
            </Button>
          </div>
        </UiItem>

        <div>
          <Response of={form} />
        </div>
      </Form>
    </>
  );
});
