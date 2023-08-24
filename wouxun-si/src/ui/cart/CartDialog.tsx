import {
  component$,
  useSignal,
  Slot,
  $,
  useStylesScoped$,
} from '@builder.io/qwik';
import { Button } from '../button';
import { XMark } from '../icons/x-mark';
import { Tag } from '../tag';

type Props = {};

export const CartDialog = component$<Props>(() => {
  const dialog = useSignal<HTMLDialogElement>();

  const handleClick = $(() => {
    dialog.value?.show();
  });

  const handleClose = $(() => {
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

  useStylesScoped$(`
    dialog {      
      transform: translateX(50%);
      height: 100vh;
      position: absolute;
      top:0;
    }

    dialog[open] {
      animation: show .3s ease normal;

    }
    dialog.hide {
        animation: hide 0.3s ease normal;
    }
    @keyframes show{
        from {
            opacity: 0;
            transform: translateX(110%);
            backdrop-filter: blur(0.5px);
        }
        to {
            opacity: 1;
            transform: translateX(50%);
            backdrop-filter: blur(0px);
        }
    }
    @keyframes hide{
        to {
            opacity: 0;
            transform: translateX(110%);
        }
    }
  `);

  return (
    <>
      <div onClick$={handleClick} class="cursor-pointer">
        <Slot />
      </div>

      <dialog
        ref={dialog}
        class={[
          `          
          outline-none rounded-md overflow-hidden
          w-1/2
          shadow-lg
        `,
        ]}
        window:onKeyDown$={(e) => {
          if (e.key === 'Escape') {
            handleClose();
          }
        }}
      >
        <div class="w-full h-full rounded-lg flex flex-col items-center">
          <div class="bg-neutral-50 dark:bg-neutral-600 flex flex-row justify-between p-2 border-b w-full border-neutral-200 dark:border-neutral-400">
            <div class="flex items-center justify-between gap-x-2">
              <h3 class="text-headers-h4 text-base-light dark:text-base-dark">
                Nakupna vrečka
              </h3>

              <div class="flex items-center gap-x-1">
                <Button
                  intent="icon"
                  onClick$={handleClose}
                  type="button"
                  class="p-[5px] focus-visible:ring-1 focus-visible:ring-neutral-400"
                >
                  <XMark class="h-5 w-5 text-neutral-400" />
                </Button>
                <Tag class="hidden md:block" size="small" variant="neutral">
                  esc
                </Tag>
              </div>
            </div>
          </div>
          <div class="w-full flex items-center justify-center overflow-y-auto overflow-x-hidden">
            <Slot name="dialog" />
          </div>
        </div>
      </dialog>
    </>
  );
});
