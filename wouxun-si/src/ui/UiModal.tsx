import {
  Slot,
  component$,
  createContextId,
  useSignal,
  type Signal,
  useContext,
  useContextProvider,
} from '@builder.io/qwik';
import { UiContent } from './UiContent';
import { UiHeader } from './UiHeader';
import { UiToolbar } from './UiToolbar';
import { Button } from './button';
import { IoCloseOutline } from '@qwikest/icons/ionicons';

type UiModalType = Signal<HTMLDialogElement | undefined>;
const UiModalContext = createContextId<UiModalType>('ui-modal');

export const useUiModal = () => {
  const modal = useContext(UiModalContext);
  return modal;
};

export const useUiModalProvider = () => {
  const modal = useSignal<HTMLDialogElement>();
  useContextProvider<UiModalType>(UiModalContext, modal);
};

type UiModalProps = {
  modal: Signal<HTMLDialogElement | undefined>;
};

export const UiModal = component$<UiModalProps>((props) => {
  return (
    <>
      <Slot name="button" />

      <dialog ref={props.modal} class="modal">
        <div class="modal-box h-full max-h-[60%] rounded-md p-0">
          <UiContent>
            <UiHeader q:slot="start">
              <UiToolbar>
                <div q:slot="end" class="flex items-center gap-2 mx-2">
                  <Button
                    type="button"
                    onClick$={() => {
                      props.modal.value?.close();
                    }}
                    intent="square"
                    color="neutral"
                    class="btn-sm"
                  >
                    <IoCloseOutline class="h-5 w-5" />
                  </Button>
                  <kbd class="kbd kbd-sm text-base-content/60 text-xs">esc</kbd>
                </div>

                <Slot name="title"></Slot>
              </UiToolbar>
            </UiHeader>

            <div class="p-4">
              <Slot name="content"></Slot>
            </div>
          </UiContent>
        </div>
      </dialog>
    </>
  );
});
