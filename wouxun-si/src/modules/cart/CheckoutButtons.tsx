import { component$ } from '@builder.io/qwik';
import { Button } from '~/ui/button';
import { useNotifications } from '~/ui/notification/notificationsState';

export interface CheckoutButtonsProps {}

export const CheckoutButtons = component$<CheckoutButtonsProps>(() => {
  const { addNotification } = useNotifications();
  return (
    <>
      <Button
        color="primary"
        class="flex-1"
        onClick$={() =>
          addNotification({
            type: 'error',
            title: 'This action is not part of the demo.',
            description:
              'You can learn how to set up payment plugins with Medusa:  https://docs.medusajs.com/plugins/payment',
          })
        }
      >
        <span>Pay with Apple Pay</span>
      </Button>

      <Button
        color="secondary"
        class="flex-1"
        onClick$={() =>
          addNotification({
            type: 'error',
            title: 'This action is not part of the demo.',
            description:
              'You can learn how to set up payment plugins with Medusa:  https://docs.medusajs.com/plugins/payment',
          })
        }
      >
        <span>Go to Payment</span>
      </Button>
    </>
  );
});
