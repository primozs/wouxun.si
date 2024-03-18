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
import { useNotifications } from './notificationsState';

type NotificationDialogProps = {
  class?: string;
  position?: 'bottom-right' | 'top-right' | 'top';
};

export const NotificationDialog = component$<NotificationDialogProps>(
  ({ position = 'top' }) => {
    const { store } = useNotifications();
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
      if (store.value) {
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
                {store.value && (
                  <>
                    {store.value.type === 'success' ? (
                      <IoCheckmarkCircleSharp class="h-6 w-6 text-success" />
                    ) : (
                      <IoCloseCircleSharp class="h-6 w-6 text-error" />
                    )}
                  </>
                )}
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p class="text-sm font-medium text-base-content">
                  {store.value?.title}
                </p>
                {store.value?.description && (
                  <p class="mt-1 text-sm text-base-content/60">
                    {store.value.description}
                  </p>
                )}
              </div>

              {store.value && (
                <div class="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    class="inline-flex rounded-md bg-base-100 text-base-content/50 hover:text-base-content/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    onClick$={() => {
                      store.value = null;
                    }}
                  >
                    <span class="sr-only">{$localize`Close`}</span>
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
