import {
  type PropFunction,
  type QwikIntrinsicElements,
  component$,
  noSerialize,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import { useStripe } from './StripeProvider';
import type {
  StripeCardElement,
  StripeCardElementChangeEvent,
} from '@stripe/stripe-js';

export interface CardElementProps {
  class?: QwikIntrinsicElements['div']['class'];
  onChange$?: PropFunction<(e: StripeCardElementChangeEvent) => void>;
}

export const CardElement = component$<CardElementProps>(
  ({ onChange$, ...props }) => {
    const ref = useSignal<HTMLElement>();
    const cardElement = useSignal<StripeCardElement>();
    const { elements } = useStripe();

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      track(elements);

      if (!ref.value) return;

      // aleready setup
      if (cardElement.value) return;

      const ce = elements.value?.create('card', {
        style: {
          base: {
            fontFamily: 'Inter, sans-serif',
          },
        },
        classes: {
          base: 'pt-3 pb-1 block w-full h-11 px-4 mt-0 bg-base-100 border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-primary border-base-300 hover:bg-base-200 transition-all duration-300 ease-in-out',
        },
      });
      cardElement.value = noSerialize(ce);
      cardElement.value?.mount(ref.value);

      if (onChange$) {
        cardElement.value?.on('change', (event) => {
          onChange$(event);
        });
      }

      return () => {
        cardElement.value?.destroy();
      };
    });

    return <div ref={ref} class={[props.class]}></div>;
  },
);
