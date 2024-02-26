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
import { UiHeader } from './UiHeader';
import { UiToolbar } from './UiToolbar';
import { UiItem } from './UiItem';
import { UiFooter } from './UiFooter';

type ConfirmDialog = {
  title: string;
  subtitle?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  dialog: Signal<HTMLDialogElement | undefined>;
};

const UiConfirmId = createContextId<ConfirmDialog>('ui-confirm');

export const useUiConfirm = () => {
  const dialog = useSignal<HTMLDialogElement>();
  const store = useStore<ConfirmDialog>({
    title: '',
    subtitle: '',
    cancelLabel: 'Cancel',
    confirmLabel: 'Confirm',
    dialog: dialog,
  });
  useContextProvider(UiConfirmId, store);

  const uiConfirm = $(
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
      // store.dialog.value?.show();
      store.dialog.value?.showModal();

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

  return { store, uiConfirm };
};

export interface UiConfirmDialogProps {
  onClose$?: QwikIntrinsicElements['dialog']['onClose$'];
}

export const UiConfirm = component$<UiConfirmDialogProps>(({ ...rest }) => {
  const store = useContext<ConfirmDialog>(UiConfirmId);
  return (
    <dialog {...rest} ref={store.dialog} class="modal p-4">
      <div class="modal-box rounded-md border border-base-300/70 p-0 max-w-xs w-full">
        <UiHeader color="transparent">
          <UiToolbar>
            <UiTitle>{store.title}</UiTitle>
          </UiToolbar>
        </UiHeader>
        {store.subtitle && (
          <UiItem lines="none" class="py-6">
            <UiText>{store.subtitle}</UiText>
          </UiItem>
        )}

        <Slot></Slot>

        <UiFooter color="transparent">
          <UiToolbar border="top" layout={false}>
            <UiItem class="py-3" classCenter="gap-4" border="top">
              <Button
                class="flex-1"
                type="button"
                color="primary"
                fill="outline"
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
                fill="outline"
                onClick$={() => {
                  store.dialog.value?.close('ok');
                }}
              >
                {store.confirmLabel}
              </Button>
            </UiItem>
          </UiToolbar>
        </UiFooter>
      </div>
    </dialog>
  );
});
