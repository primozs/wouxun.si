import { Slot, component$ } from '@builder.io/qwik';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { AddressForm } from './AddressForm';
import { Button } from '~/ui/button';
import {
  IoTrashOutline,
  IoAddOutline,
  IoCreateOutline,
} from '@qwikest/icons/ionicons';
import { UiIcon } from '~/ui/UiIcon';
import { useDeleteShippingAddressAction } from '~/routes/plugin@store';
import { useNotifications } from '~/ui/notification/notificationsState';
import { useAuthSessionLoader } from '~/routes/plugin@auth';
import type { Address } from '@medusajs/client-types';
import { UiConfirm, useUiConfirm } from '~/ui/UiConfirm';
import { UiModal, useUiModal, useUiModalProvider } from '~/ui/UiModal';
import { UiItem } from '~/ui/UiItem';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  const session = useAuthSessionLoader();

  return (
    <>
      <UiItem pad={false} classCenter="flex flex-col mb-8 gap-y-4" lines="none">
        <UiTitle size="xl" as="h1">
          {$localize`Shipping addresses`}
        </UiTitle>
        <UiText wrap class="max-w-xl">
          {$localize`View and update your shipping addresses, you can add as many as you
          like. Saving your addresses will make them available during checkout.`}
        </UiText>
      </UiItem>

      <AddressList addresses={session.value?.shipping_addresses ?? []} />
    </>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Addresses`,
});

export interface AddressListProps {
  addresses: Address[];
}

export const AddressList = component$<AddressListProps>((props) => {
  return (
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4  mb-5">
      <AddShippingAddress />

      {props.addresses?.map((address) => {
        return <AddressListItem key={address.id} address={address} />;
      })}
    </div>
  );
});

export interface AddressListItemProps {
  address: Address;
}

export const AddressListItem = component$<AddressListItemProps>(
  ({ address }) => {
    const { uiConfirm } = useUiConfirm();
    const deleteAction = useDeleteShippingAddressAction();
    const { addNotification } = useNotifications();
    useUiModalProvider();
    const modal = useUiModal();

    return (
      <AddressCardWrapper>
        <div>
          <UiTitle>
            {address.first_name} {address.last_name}
          </UiTitle>

          {address.company && (
            <UiText class="text-sm mb-2">{address.company}</UiText>
          )}

          <UiText class="text-sm">
            <span>
              {address.address_1}
              {address.address_2 && <span>, {address.address_2}</span>}
            </span>
          </UiText>

          <UiText class="text-sm">
            <span>
              {address.postal_code}, {address.city}
            </span>
          </UiText>

          <UiText class="text-sm">
            <span>
              {address.province && `${address.province}, `}
              {address.country_code?.toUpperCase()}
            </span>
          </UiText>
        </div>

        <UiModal q:slot="actions" modal={modal}>
          <Button
            q:slot="button"
            intent="unstyled"
            color="base"
            class="btn-sm text-xs"
            onClick$={() => {
              modal.value?.showModal();
            }}
          >
            <UiIcon>
              <IoCreateOutline />
            </UiIcon>
            {$localize`Edit`}
          </Button>

          <UiTitle q:slot="title">{$localize`Edit shipping address`}</UiTitle>

          <AddressForm
            q:slot="content"
            modal={modal}
            initial={{
              id: address.id,
              first_name: address.first_name ?? '',
              last_name: address.last_name ?? '',
              company: address.company ?? '',
              address_1: address.address_1 ?? '',
              address_2: address.address_2 ?? '',
              postal_code: address.postal_code ?? '',
              city: address.city ?? '',
              province: address.province ?? '',
              country_code: address.country_code ?? '',
              phone: address.phone ?? '',
            }}
          />
        </UiModal>

        <UiConfirm></UiConfirm>
        <Button
          q:slot="actions"
          intent="unstyled"
          color="base"
          class="btn-sm text-xs"
          loading={deleteAction.isRunning}
          onClick$={async () => {
            const confirmed = await uiConfirm({
              title: $localize`Delete shipping address`,
              subtitle: $localize`Are you sure, data will be lost?`,
            });

            if (!confirmed) return;

            const result = await deleteAction.submit({
              addressId: address.id,
            });

            if (result.value.failed) {
              addNotification({
                type: 'error',
                title: $localize`Error while deleting shipping address`,
              });
            }
          }}
        >
          <UiIcon>
            <IoTrashOutline />
          </UiIcon>
          {$localize`Delete`}
        </Button>
      </AddressCardWrapper>
    );
  },
);

export const AddShippingAddress = component$(() => {
  useUiModalProvider();
  const modal = useUiModal();

  return (
    <>
      <AddressCardWrapper>
        <div>
          <UiTitle>{$localize`Add shipping address`}</UiTitle>
        </div>

        <UiModal q:slot="actions" modal={modal}>
          <Button
            q:slot="button"
            intent="unstyled"
            color="base"
            class="btn-sm"
            onClick$={() => {
              modal.value?.showModal();
            }}
          >
            <UiIcon>
              <IoAddOutline />
            </UiIcon>
          </Button>

          <UiTitle q:slot="title">{$localize`Add shipping address`}</UiTitle>

          <AddressForm
            q:slot="content"
            modal={modal}
            initial={{
              id: undefined,
              first_name: '',
              last_name: '',
              company: '',
              address_1: '',
              address_2: '',
              postal_code: '',
              city: '',
              province: '',
              country_code: '',
              phone: '',
            }}
          />
        </UiModal>
      </AddressCardWrapper>
    </>
  );
});

export const AddressCardWrapper = component$(() => {
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
