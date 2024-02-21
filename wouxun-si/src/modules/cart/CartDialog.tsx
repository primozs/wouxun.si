import {
  component$,
  Slot,
  $,
  useStylesScoped$,
  createContextId,
  type Signal,
  useContext,
} from '@builder.io/qwik';
import { IoCloseOutline } from '@qwikest/icons/ionicons';
import { Button } from '~/ui/button';
import { Tag } from '~/ui/tag';

type Props = {};

type TCartDialog = Signal<HTMLDialogElement | undefined>;

export const CartDialogContext = createContextId<TCartDialog>(
  'cart-dialog-context',
);

export const useCartDialog = () => {
  const dialog = useContext<TCartDialog>(CartDialogContext);

  const closeCardDialog = $(() => {
    dialog.value?.classList.add('hide');

    const animationEndHandler = () => {
      dialog.value?.classList.remove('hide');
      dialog.value?.close();
      dialog.value?.removeEventListener(
        'animationend',
        animationEndHandler,
        false,
      );
    };

    dialog.value?.addEventListener('animationend', animationEndHandler, false);
  });

  const openCartDialog = $(() => {
    dialog.value?.showModal();
  });

  return { dialog, closeCardDialog, openCartDialog };
};

export const CartDialog = component$<Props>(() => {
  const { dialog, closeCardDialog, openCartDialog } = useCartDialog();

  useStylesScoped$(`
    dialog {      
      min-inline-size: min(90vw, 750px);

      transition: opacity 0.5s cubic-bezier(.70, 0, 1, 1);
          
      margin-inline-end: 0;      
    
      max-block-size: 100%;
      height: 100%;
    }

    dialog::backdrop {
      /*backdrop-filter: blur(20px);*/
      /*display: none;*/
    }    

    dialog[open] {
      animation: slide-in-left .5s cubic-bezier(.25, 0, .3, 1) forwards;
    }

    dialog.hide {
      animation: slide-out-right .5s cubic-bezier(.25, 0, .3, 1) forwards;
    }

    dialog:not([open]) {
      pointer-events: none;
      opacity: 0;
    }
  
    @keyframes slide-in-left {
      from { transform: translateX(100%) }
    }

    @keyframes slide-out-right {
      to { transform: translateX(200%) }
    }

    .content {
      height: calc(100% - 47px);
    }
  `);

  return (
    <>
      <div onClick$={openCartDialog} class="cursor-pointer">
        <Slot name="button" />
      </div>

      <dialog
        ref={dialog}
        class={[
          `
          outline-none rounded-l-md shadow-lg
           p-0
          overflow-hidden
        `,
        ]}
        preventdefault:keydown
        onKeyDown$={(e) => {
          if (e.key === 'Escape') {
            closeCardDialog();
          }
        }}
      >
        <div class="h-full">
          <div
            class="`
          bg-base-200
          border-base-300
          p-2 px-3 border-b
          grid grid-cols-2
        `"
          >
            <h3 class="text-xl text-base-content">Nakupna vrečka</h3>

            <div class="flex items-center justify-end gap-3">
              <Button
                type="button"
                onClick$={closeCardDialog}
                intent="square"
                color="neutral"
                class="btn-sm"
              >
                <IoCloseOutline class="h-5 w-5" />
              </Button>
              <Tag class="hidden md:block" size="small" variant="neutral">
                esc
              </Tag>
            </div>
          </div>

          <div class="overflow-x-hidden overflow-y-auto content">
            <Slot />
          </div>
        </div>
      </dialog>
    </>
  );
});
