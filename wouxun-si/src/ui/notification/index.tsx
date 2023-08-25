import { component$ } from '@builder.io/qwik';
import { XCircle } from '../icons/x-circle';
import { CheckCircle } from '../icons/check-circle';
import { XMark } from '../icons/x-mark';
import { useNotifications, type NotificationType } from './notificationsState';

type Props = {
  notification: NotificationType | null;
  class?: string;
};

export const Notification = component$<Props>(({ notification, ...rest }) => {
  const { removeNotification } = useNotifications();

  return (
    <div
      class={[
        `      
        pointer-events-auto w-full max-w-xs sm:max-w-sm overflow-hidden rounded-lg 
        bg-white shadow-lg ring-1 ring-black ring-opacity-5        
      `,
        `
        absolute        
        transition ease-in duration-300 transform opacity-0
      `,
        { 'right-5 bottom-5': notification?.position === 'bottom-right' },
        { 'right-5 top-5': notification?.position === 'top-right' },
        { 'top-5 left-auto': notification?.position === 'top' },
        {
          'transform opacity-0 -z-50': notification === null,
          'transform opacity-100 visible z-50': notification !== null,
        },
        rest.class,
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
