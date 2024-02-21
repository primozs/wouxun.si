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
import { PackageIcon } from '~/ui/icons/package-icon';
import { HiUserCircleOutline } from '@qwikest/icons/heroicons';
import { IoLogOutOutline, IoLocationOutline } from '@qwikest/icons/ionicons';
import { NavLink } from '~/ui/button';

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
        <UiItem detail to="/account/dashboard/profile">
          <UiIcon q:slot="start">
            <HiUserCircleOutline />
          </UiIcon>
          <UiLabel>Profile</UiLabel>
        </UiItem>

        <UiItem detail to="/account/dashboard/addresses">
          <UiIcon q:slot="start">
            <IoLocationOutline />
          </UiIcon>
          <UiLabel>Addresses</UiLabel>
        </UiItem>

        <UiItem detail to="/account/dashboard/orders">
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
            <IoLogOutOutline />
          </UiIcon>
          <UiLabel>Logout</UiLabel>
        </UiItem>
      </UiList>

      <UiList class="hidden sm:block">
        <UiItem lines="none">
          <NavLink href="/account/dashboard">Account</NavLink>
        </UiItem>

        <UiItem lines="none">
          <NavLink href="/account/dashboard/profile">Profile</NavLink>
        </UiItem>

        <UiItem lines="none">
          <NavLink href="/account/dashboard/addresses">Addresses</NavLink>
        </UiItem>

        <UiItem lines="none">
          <NavLink href="/account/dashboard/orders">Orders</NavLink>
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
