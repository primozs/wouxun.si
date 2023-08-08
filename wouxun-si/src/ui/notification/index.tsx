import { component$ } from '@builder.io/qwik';
import { XCircle } from '../icons/x-circle';
import { CheckCircle } from '../icons/check-circle';
import { XMark } from '../icons/x-mark';
import { useNotifications } from './notificationsState';

interface NotificationProps {
  type: 'success' | 'error';
  title: string;
  description?: string;
}

type Props = {
  notification: NotificationProps | null;
};

export const Notification = component$<Props>(({ notification }) => {
  const { removeNotification } = useNotifications();

  return (
    <div
      class={[
        `
      fixed bottom-5 z-50
      pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5
      animate-fadeOut
      transition ease-in duration-200 transform opacity-0      
    `,
        {
          'transform opacity-0 -right-full': notification === null,
          'transform opacity-100 right-5': notification !== null,
        },
      ]}
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            {notification && (
              <>
                {notification.type === 'success' ? (
                  <CheckCircle class="h-6 w-6 text-success-400" />
                ) : (
                  <XCircle class="h-6 w-6 text-error-400" />
                )}
              </>
            )}
          </div>
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium text-neutral-900">
              {notification?.title}
            </p>
            {notification?.description && (
              <p class="mt-1 text-sm text-neutral-500">
                {notification.description}
              </p>
            )}
          </div>
          {!!removeNotification && (
            <div class="ml-4 flex flex-shrink-0">
              <button
                type="button"
                class="inline-flex rounded-md bg-white text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                onClick$={() => removeNotification()}
              >
                <span class="sr-only">Zapri</span>
                <XMark class="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
