import {
  type Signal,
  component$,
  useSignal,
  type QwikIntrinsicElements,
  createContextId,
  useContextProvider,
  useContext,
  useStore,
  Slot,
  $,
} from '@builder.io/qwik';
import { Button } from './button';
import { UiTitle } from './UiTitle';
import { UiText } from './UiText';

type ConfirmDialog = {
  title: string;
  subtitle?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  dialog: Signal<HTMLDialogElement | undefined>;
};

const UiConfirmId = createContextId<ConfirmDialog>('ui-confirm');

export const useUiConfirmDialog = () => {
  const store = useContext<ConfirmDialog>(UiConfirmId);

  const uiConfirmDialog = $(
    async ({
      title = '',
      subtitle = '',
      cancelLabel = 'Cancel',
      confirmLabel = 'Confirm',
    }: {
      title: string;
      subtitle?: string;
      cancelLabel?: string;
      confirmLabel?: string;
    }) => {
      store.title = title;
      store.subtitle = subtitle;
      store.cancelLabel = cancelLabel;
      store.confirmLabel = confirmLabel;
      store.dialog.value?.show();

      return new Promise((resolve) => {
        const dialog = store.dialog.value;
        if (!dialog) return resolve(false);

        const handler = () => {
          resolve(dialog.returnValue === 'ok' ? true : false);
          dialog.removeEventListener('close', handler);
        };
        dialog.addEventListener('close', handler);
      });
    },
  );

  return { store, uiConfirmDialog };
};

export const UiConfirmProvider = component$(() => {
  const dialog = useSignal<HTMLDialogElement>();
  const store = useStore<ConfirmDialog>({
    title: '',
    subtitle: '',
    cancelLabel: 'Cancel',
    confirmLabel: 'Confirm',
    dialog: dialog,
  });
  useContextProvider(UiConfirmId, store);

  return (
    <>
      <Slot></Slot>
      <UiConfirmDialog />
    </>
  );
});

export interface UiConfirmDialogProps {
  onClose$?: QwikIntrinsicElements['dialog']['onClose$'];
}

export const UiConfirmDialog = component$<UiConfirmDialogProps>(
  ({ ...rest }) => {
    const { store } = useUiConfirmDialog();
    return (
      <dialog {...rest} ref={store.dialog} class="modal">
        <div class="modal-box rounded-md border border-base-300/50 p-4 max-w-sm w-fit">
          <div class="p-2 flex flex-col items-center">
            <UiTitle>{store.title}</UiTitle>
            <UiText>{store.subtitle}</UiText>
          </div>
          <div class="modal-action">
            <Button
              class="flex-1"
              type="button"
              color="secondary"
              onClick$={() => {
                store.dialog.value?.close('cancel');
              }}
              autofocus
            >
              {store.cancelLabel}
            </Button>
            <Button
              class="flex-1"
              type="button"
              color="primary"
              onClick$={() => {
                store.dialog.value?.close('ok');
              }}
            >
              {store.confirmLabel}
            </Button>
          </div>
        </div>
      </dialog>
    );
  },
);
