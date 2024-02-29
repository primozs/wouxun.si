import { component$ } from '@builder.io/qwik';
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
import {
  IoLogOutOutline,
  IoLocationOutline,
  IoHomeOutline,
} from '@qwikest/icons/ionicons';
import { NavLink } from '~/ui/button';

export const AccountNav = component$(() => {
  const customer = useAuthSessionLoader();
  const signout = useAuthSignoutAction();

  return (
    <>
      <UiList class="sm:hidden">
        <UiListHeader>{$localize`Hello ${customer.value?.first_name}`}</UiListHeader>

        <UiItem detail to="/account/dashboard">
          <UiIcon q:slot="start">
            <IoHomeOutline />
          </UiIcon>
          <UiLabel>{$localize`Account`}</UiLabel>
        </UiItem>

        <UiItem detail to="/account/dashboard/profile">
          <UiIcon q:slot="start">
            <HiUserCircleOutline />
          </UiIcon>
          <UiLabel>{$localize`Profile`}</UiLabel>
        </UiItem>

        <UiItem detail to="/account/dashboard/addresses">
          <UiIcon q:slot="start">
            <IoLocationOutline />
          </UiIcon>
          <UiLabel>{$localize`Addresses`}</UiLabel>
        </UiItem>

        <UiItem detail to="/account/dashboard/orders">
          <UiIcon q:slot="start">
            <PackageIcon />
          </UiIcon>
          <UiLabel>{$localize`Orders`}</UiLabel>
        </UiItem>

        <UiItem
          onClick$={() => {
            signout.submit();
          }}
        >
          <UiIcon q:slot="start">
            <IoLogOutOutline />
          </UiIcon>
          <UiLabel>{$localize`Signout`}</UiLabel>
        </UiItem>
      </UiList>

      <UiList class="hidden sm:block">
        <UiItem lines="none">
          <NavLink
            href="/account/dashboard"
            activeClass="font-semibold text-accent"
          >
            {$localize`Account`}
          </NavLink>
        </UiItem>

        <UiItem lines="none">
          <NavLink
            href="/account/dashboard/profile"
            activeClass="font-semibold text-accent"
          >
            {$localize`Profile`}
          </NavLink>
        </UiItem>

        <UiItem lines="none">
          <NavLink
            href="/account/dashboard/addresses"
            activeClass="font-semibold text-accent"
          >
            {$localize`Addresses`}
          </NavLink>
        </UiItem>

        <UiItem lines="none">
          <NavLink
            href="/account/dashboard/orders"
            activeClass="font-semibold text-accent"
          >
            {$localize`Orders`}
          </NavLink>
        </UiItem>

        <UiItem
          lines="none"
          onClick$={() => {
            signout.submit();
          }}
        >
          <UiLabel color="primary" weight="font-medium">
            {$localize`Signout`}
          </UiLabel>
        </UiItem>
      </UiList>
    </>
  );
});
