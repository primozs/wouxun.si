import { Slot, component$, useSignal } from '@builder.io/qwik';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { AddressForm } from './AddressForm';
import { Button } from '~/ui/button';
import {
  IoTrashOutline,
  IoAddOutline,
  IoCreateOutline,
  IoCloseOutline,
} from '@qwikest/icons/ionicons';
import { UiIcon } from '~/ui/UiIcon';
import { UiContent } from '~/ui/UiContent';
import { UiHeader } from '~/ui/UiHeader';
import { UiToolbar } from '~/ui/UiToolbar';

export { useAddressFormLoader } from './AddressForm';

export default component$(() => {
  return (
    <div class="w-full">
      <div class="mb-8 flex flex-col gap-y-4">
        <UiTitle size="xl" as="h1">
          Shipping Addresses
        </UiTitle>
        <UiText wrap class="max-w-xl">
          View and update your shipping addresses, you can add as many as you
          like. Saving your addresses will make them available during checkout.
        </UiText>
      </div>

      <div class="grid grid-cols-3 gap-4  mb-5">
        <AddAddress />

        <AddressCard>
          <div>
            <UiTitle>Primoz Susa</UiTitle>
            <UiText class="text-sm">Gradišče 7</UiText>
            <UiText class="text-sm">1360 Vrhnika</UiText>
            <UiText class="text-sm">SI</UiText>
          </div>

          <Button
            q:slot="actions"
            intent="unstyled"
            color="base"
            class="btn-sm text-xs"
          >
            <UiIcon>
              <IoCreateOutline />
            </UiIcon>
            Uredi
          </Button>

          <Button
            q:slot="actions"
            intent="unstyled"
            color="base"
            class="btn-sm text-xs"
          >
            <UiIcon>
              <IoTrashOutline />
            </UiIcon>
            Odstrani
          </Button>
        </AddressCard>
      </div>
    </div>
  );
});

export const AddAddress = component$(() => {
  return (
    <>
      <AddressCard>
        <div>
          <UiTitle>Dodaj naslov za dostavo</UiTitle>
        </div>

        <AdddressDialog q:slot="actions">
          <Button q:slot="button" intent="unstyled" color="base" class="btn-sm">
            <UiIcon>
              <IoAddOutline />
            </UiIcon>
          </Button>

          <UiTitle q:slot="title">Shipping address</UiTitle>

          <AddressForm q:slot="content" />
        </AdddressDialog>
      </AddressCard>
    </>
  );
});

export interface AddressCardProps {}

export const AddressCard = component$<AddressCardProps>(() => {
  return (
    <div class="card card-compact card-bordered bg-base-100 border-base-300 min-h-56 rounded-lg">
      <div class="card-body justify-between">
        <Slot></Slot>

        <div class="card-actions">
          <Slot name="actions"></Slot>
        </div>
      </div>
    </div>
  );
});

export const AdddressDialog = component$(() => {
  const dialog = useSignal<HTMLDialogElement>();

  return (
    <>
      <div
        onClick$={() => {
          dialog.value?.showModal();
        }}
        class="cursor-pointer"
      >
        <Slot name="button" />
      </div>

      <dialog ref={dialog} class="modal">
        <div class="modal-box h-full max-h-[60%] rounded-md p-0">
          <UiContent>
            <UiHeader q:slot="start">
              <UiToolbar>
                <div q:slot="end" class="flex items-center gap-2 mx-2">
                  <Button
                    type="button"
                    onClick$={() => {
                      dialog.value?.close();
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
