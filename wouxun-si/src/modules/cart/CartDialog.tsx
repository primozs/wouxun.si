import {
  component$,
  Slot,
  $,
  useStylesScoped$,
  createContextId,
  type Signal,
  useContext,
  useSignal,
  useContextProvider,
} from '@builder.io/qwik';

type Props = {};

type TCartDialog = Signal<HTMLDialogElement | undefined>;

export const CartDialogContext = createContextId<TCartDialog>(
  'cart-dialog-context',
);

export const useCartDialogProvider = () => {
  const cartDialog = useSignal<HTMLDialogElement>();
  useContextProvider(CartDialogContext, cartDialog);
};

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
          outline-none shadow-lg
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
        <Slot />
      </dialog>
    </>
  );
});
