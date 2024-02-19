import { component$ } from '@builder.io/qwik';
import { Button } from '~/ui/button';
import { useNotifications } from '~/ui/notification/notificationsState';

export interface CheckoutButtonsProps {}

export const CheckoutButtons = component$<CheckoutButtonsProps>(() => {
  const { addNotification } = useNotifications();
  return (
    <div class="border-t border-base-300 p-8 flex flex-col md:flex-row justify-between gap-4 z-0">
      <Button
        class="md:w-1/2 w-100"
        intent="primary"
        onClick$={() =>
          addNotification({
            type: 'error',
            title: 'This action is not part of the demo.',
            description:
              'You can learn how to set up payment plugins with Medusa:  https://docs.medusajs.com/plugins/payment',
          })
        }
      >
        Pay with Apple Pay
      </Button>
      <Button
        class="md:w-1/2 w-100"
        intent="secondary"
        onClick$={() =>
          addNotification({
            type: 'error',
            title: 'This action is not part of the demo.',
            description:
              'You can learn how to set up payment plugins with Medusa:  https://docs.medusajs.com/plugins/payment',
          })
        }
      >
        Go to Payment
      </Button>
    </div>
  );
});
