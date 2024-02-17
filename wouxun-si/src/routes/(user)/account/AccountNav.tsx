import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import type { Customer } from '@medusajs/client-types';
import {
  useAuthSessionLoader,
  useAuthSignoutAction,
} from '~/routes/plugin@auth';
import { UiIcon } from '~/ui/UiIcon';
import { UiItem } from '~/ui/UiItem';
import { UiLabel } from '~/ui/UiLabel';
import { UiList } from '~/ui/UiList';
import { UiListHeader } from '~/ui/UiListHeader';
import { LogoutIcon } from '~/ui/icons/logout-icon';
import { MapPinIcon } from '~/ui/icons/map-pin-icon';
import { PackageIcon } from '~/ui/icons/package-icon';
import { UserIcon } from '~/ui/icons/user-icon';

type Props = {
  customer: Customer;
};

export const AccountNav = component$<Props>(() => {
  const customer = useAuthSessionLoader();
  const signout = useAuthSignoutAction();
  const location = useLocation();

  return (
    <>
      <UiList class="sm:hidden">
        <UiListHeader>Hello {customer.value?.first_name}</UiListHeader>
        <UiItem detail to="/account/profile">
          <UiIcon q:slot="start">
            <UserIcon />
          </UiIcon>
          <UiLabel>Profile</UiLabel>
        </UiItem>

        <UiItem detail to="/account/addresses">
          <UiIcon q:slot="start">
            <MapPinIcon />
          </UiIcon>
          <UiLabel>Addresses</UiLabel>
        </UiItem>

        <UiItem detail to="/account/orders">
          <UiIcon q:slot="start">
            <PackageIcon />
          </UiIcon>
          <UiLabel>Orders</UiLabel>
        </UiItem>

        <UiItem
          onClick$={() => {
            signout.submit();
          }}
        >
          <UiIcon q:slot="start">
            <LogoutIcon />
          </UiIcon>
          <UiLabel>Logout</UiLabel>
        </UiItem>
      </UiList>

      <UiList class="hidden sm:block">
        <UiItem lines="none" to="/account">
          <UiLabel
            color="primary"
            weight={
              location.url.pathname === '/account/'
                ? 'font-semibold'
                : 'font-medium'
            }
          >
            Account
          </UiLabel>
        </UiItem>

        <UiItem lines="none" to="/account/profile">
          <UiLabel
            color="primary"
            weight={
              location.url.pathname === '/account/profile/'
                ? 'font-semibold'
                : 'font-medium'
            }
          >
            Profile
          </UiLabel>
        </UiItem>

        <UiItem lines="none" to="/account/addresses">
          <UiLabel
            color="primary"
            weight={
              location.url.pathname === '/account/addresses/'
                ? 'font-semibold'
                : 'font-medium'
            }
          >
            Addresses
          </UiLabel>
        </UiItem>

        <UiItem lines="none" to="/account/orders">
          <UiLabel
            color="primary"
            weight={
              location.url.pathname === '/account/orders/'
                ? 'font-semibold'
                : 'font-medium'
            }
          >
            Orders
          </UiLabel>
        </UiItem>

        <UiItem
          lines="none"
          onClick$={() => {
            signout.submit();
          }}
        >
          <UiLabel color="primary" weight="font-medium">
            Logout
          </UiLabel>
        </UiItem>
      </UiList>
    </>
  );
});
