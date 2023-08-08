import {
  $,
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';
import { Notification } from '.';

type NotificationType = {
  title: string;
  description?: string;
  type: 'success' | 'error';
};

export type NotificationStore = {
  notification: NotificationType | null;
};

const NotificationsState = createContextId<NotificationStore>(
  'notifications-state',
);

export const useNotifications = () => {
  const store = useContext<NotificationStore>(NotificationsState);

  const addNotification = $((notification: NotificationType) => {
    store.notification = notification;
    setTimeout(() => {
      // store.notification = null;
    }, 3500);
  });

  const removeNotification = $(() => {
    store.notification = null;
  });

  return { addNotification, removeNotification };
};

export const NotificationProvider = component$(() => {
  const store = useStore<NotificationStore>(
    {
      notification: null,
    },
    { deep: true },
  );

  useContextProvider(NotificationsState, store);

  return (
    <>
      <Slot />
      <Notification notification={store.notification} />
    </>
  );
});
