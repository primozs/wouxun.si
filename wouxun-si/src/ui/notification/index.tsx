import {
  $,
  component$,
  useSignal,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import {
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
  IoCloseOutline,
} from '@qwikest/icons/ionicons';
import {
  useNotifications,
  type NotificationType,
  type NotificationStore,
} from './notificationsState';

type Props = {
  notification: NotificationType | null;
  class?: string;
  position?: 'bottom-right' | 'top-right' | 'top';
};

export const Notification = component$<Props>(
  ({ notification, position = 'top', ...rest }) => {
    const { removeNotification } = useNotifications();

    return (
      <div
        class={[
          `
          pointer-events-auto w-full max-w-xs sm:max-w-sm overflow-hidden rounded-lg
          bg-base-100 shadow-lg ring-1 ring-base-content ring-opacity-5
        `,
          `
          fixed
          transition-all ease-in duration-300 opacity-0
        `,
          {
            'right-3 bottom-3': position === 'bottom-right',
          },
          { 'right-5 top-5': position === 'top-right' },
          { 'top-5 left-1/2 -translate-x-1/2': position === 'top' },
          {
            'opacity-0 -z-50': notification === null,
            'opacity-100 visible z-50': notification !== null,
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
                    <IoCheckmarkCircleSharp class="h-6 w-6 text-success" />
                  ) : (
                    <IoCloseCircleSharp class="h-6 w-6 text-error" />
                  )}
                </>
              )}
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-base-content">
                {notification?.title}
              </p>
              {notification?.description && (
                <p class="mt-1 text-sm text-base-content/60">
                  {notification.description}
                </p>
              )}
            </div>
            {!!removeNotification && (
              <div class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  class="inline-flex rounded-md bg-base-100 text-base-content/50 hover:text-base-content/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  onClick$={() => removeNotification()}
                >
                  <span class="sr-only">Zapri</span>
                  <IoCloseOutline class="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);

type NotificationDialogProps = {
  store: NotificationStore;
  class?: string;
  position?: 'bottom-right' | 'top-right' | 'top';
};

export const NotificationDialog = component$<NotificationDialogProps>(
  ({ store, position = 'top' }) => {
    const { removeNotification } = useNotifications();
    const notification = useSignal<HTMLDialogElement>();

    const closeNotification = $(() => {
      notification.value?.classList.add('hide');

      const animationEndHandler = () => {
        notification.value?.classList.remove('hide');
        notification.value?.close();
        notification.value?.removeEventListener(
          'animationend',
          animationEndHandler,
          false,
        );
      };
      notification.value?.addEventListener(
        'animationend',
        animationEndHandler,
        false,
      );
    });

    useTask$(({ track }) => {
      track(store);
      if (store.notification) {
        notification.value?.showModal();
      } else {
        closeNotification();
      }
    });

    useStylesScoped$(`
      dialog {      
        min-inline-size: min(94vw, 420px);        
        transition: opacity 0.5s cubic-bezier(.70, 0, 1, 1);                
      }

      dialog::backdrop {
        display: none;
      }    

      dialog[open] {
        animation: fade-in .5s cubic-bezier(.25, 0, .3, 1) forwards;
      }

      dialog.hide {
        animation: fade-out .5s cubic-bezier(.25, 0, .3, 1) forwards;
      }

      dialog:not([open]) {
        pointer-events: none;
        opacity: 0;
      }
    
      @keyframes fade-in {
        from { opacity: 0; }
      }

      @keyframes fade-out {
        to { opacity: 0; }
      }

      .bottom-right {
        margin-inline-end: 12px;
        margin-block-end: 12px;
      }

      .top-right {
        margin-inline-end: 12px;
        margin-block-start: 12px;
      }

      .top {
        margin-inline: auto;
        margin-block-start: 12px;
      }
  `);

    return (
      <dialog
        ref={notification}
        class={[
          `bg-base-100 shadow-lg ring-1 ring-base-content ring-opacity-5 overflow-hidden rounded-lg`,
          position === 'bottom-right' && 'bottom-right',
          position === 'top-right' && 'top-right',
          position === 'top' && 'top',
        ]}
      >
        <div>
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                {store.notification && (
                  <>
                    {store.notification.type === 'success' ? (
                      <IoCheckmarkCircleSharp class="h-6 w-6 text-success" />
                    ) : (
                      <IoCloseCircleSharp class="h-6 w-6 text-error" />
                    )}
                  </>
                )}
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-base-content">
                  {store.notification?.title}
                </p>
                {store.notification?.description && (
                  <p class="mt-1 text-sm text-base-content/60">
                    {store.notification.description}
                  </p>
                )}
              </div>
              {!!removeNotification && (
                <div class="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    class="inline-flex rounded-md bg-base-100 text-base-content/50 hover:text-base-content/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick$={() => removeNotification()}
                  >
                    <span class="sr-only">Zapri</span>
                    <IoCloseOutline class="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </dialog>
    );
  },
);
