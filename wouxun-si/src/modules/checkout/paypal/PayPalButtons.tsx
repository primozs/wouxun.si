import {
  type NoSerialize,
  type PropFunction,
  Slot,
  component$,
  noSerialize,
  useComputed$,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { usePaypal } from './PayPalProvider';
import type { PayPalButtonsComponent, OnInitActions } from '@paypal/paypal-js';
import type { OnApproveActions, OnApproveData } from '@paypal/paypal-js';

export type PayPalButtonsProps = {
  className?: string | string[];
  disabled?: boolean;
  orderId: string;
  style?: {
    color?: 'gold' | 'blue' | 'silver' | 'white' | 'black';
    disableMaxWidth?: boolean;
    height?: number;
    label?:
      | 'paypal'
      | 'checkout'
      | 'buynow'
      | 'pay'
      | 'installment'
      | 'subscribe'
      | 'donate';
    layout?: 'vertical' | 'horizontal';
    shape?: 'rect' | 'pill';
    tagline?: boolean;
  };
  createOrder$?: PropFunction<() => string>;
  onApprove$?: PropFunction<
    (data: OnApproveData, actions: OnApproveActions) => void
  >;
};

export const PayPalButtons = component$<PayPalButtonsProps>(
  ({ className, disabled, style, onApprove$, orderId }) => {
    const { paypal } = usePaypal();
    const buttonsContainerRef = useSignal<HTMLDivElement>();
    const initActions = useSignal<NoSerialize<OnInitActions> | null>(null);
    const isEligible = useSignal(true);
    const buttons = useSignal<NoSerialize<PayPalButtonsComponent | null>>();
    const error = useSignal<string | null>(null);

    const isDisabledStyle = useComputed$(() => {
      const isDisabledStyle = disabled ? { opacity: 0.38 } : {};
      return isDisabledStyle;
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      track(paypal);

      const pp = paypal.value;
      if (!pp) return;
      const Buttons = pp.Buttons;
      if (!Buttons) return;

      const el = buttonsContainerRef.value;
      if (!el) return;

      try {
        buttons.value = noSerialize(
          Buttons({
            style: style,
            // createOrder: createOrder$,
            createOrder: async () => {
              return orderId;
            },
            onApprove: async (data, actions) => {
              onApprove$ && onApprove$(data, actions);
            },
            onInit: (_, actions) => {
              initActions.value = noSerialize(actions);
            },
          }),
        );
      } catch (err) {
        error.value = `Failed to render <PayPalButtons /> component. Failed to initialize:  ${err}`;
      }

      if (buttons.value?.isEligible() === false) {
        isEligible.value = false;
      }

      buttons.value?.render(el).catch((err) => {
        error.value = `Failed to render <PayPalButtons /> component. ${err}`;
      });
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      track(initActions);

      if (initActions.value === null) {
        return;
      }

      if (disabled === true) {
        initActions.value?.disable().catch(() => {
          // ignore errors when disabling the component
        });
      } else {
        initActions.value?.enable().catch(() => {
          // ignore errors when enabling the component
        });
      }
    });

    return (
      <>
        {isEligible.value ? (
          <div
            ref={buttonsContainerRef}
            style={isDisabledStyle.value}
            class={[disabled && 'paypal-buttons-disabled', className]}
          ></div>
        ) : (
          <Slot />
        )}
      </>
    );
  },
);
