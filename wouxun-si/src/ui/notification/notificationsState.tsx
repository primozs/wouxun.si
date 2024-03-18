import {
  $,
  type Signal,
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';
import { NotificationDialog } from '.';

export type NotificationType = {
  type: 'success' | 'error';
  position?: 'top' | 'bottom-right' | 'top-right';
  title: string;
  description?: string;
};

export type NotificationCtxType = Signal<NotificationType | null>;

const NotificationsCtx = createContextId<NotificationCtxType>(
  'notifications-state',
);

export const useNotifications = () => {
  const store = useContext<NotificationCtxType>(NotificationsCtx);

  const addNotification = $((notification: NotificationType) => {
    store.value = notification;
    setTimeout(() => {
      store.value = null;
    }, 3500);
  });

  return { store, addNotification };
};

export const NotificationProvider = component$(() => {
  const store = useSignal<NotificationType | null>(null);
  useContextProvider(NotificationsCtx, store);

  return (
    <>
      <Slot />
      <NotificationDialog position="bottom-right" />
    </>
  );
});
