import { component$ } from '@builder.io/qwik';
import { UiItem } from '~/ui/UiItem';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { ProfileNameForm } from './ProfileNameForm';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getMedusaClient, getSrvSessionHeaders } from '~/modules/medusa';
import { ProfileEmailForm } from './ProfileEmailForm';
import { ProfilePhoneForm } from './ProfilePhoneForm';
import { ProfilePasswordForm } from './ProfilePasswordForm';
import { ProfileBillingForm } from './ProfileBillingForm';

export const useCustomer = routeLoader$(async (event) => {
  try {
    const client = getMedusaClient();
    const res = await client.customers.retrieve(getSrvSessionHeaders(event));
    return res.customer;
  } catch (error) {
    return null;
  }
});

export default component$(() => {
  const customer = useCustomer();
  return (
    <>
      <UiItem pad={false} classCenter="flex flex-col mb-8 gap-y-4" lines="none">
        <UiTitle size="xl" as="h1">
          {$localize`Profile`}
        </UiTitle>
        <UiText wrap class="max-w-xl">
          {$localize`View and update your profile information, including your name, email,
          and phone number. You can also update your billing address, or change
          your password.`}
        </UiText>
      </UiItem>

      <div class="flex flex-col w-full max-w-2xl space-y-6">
        <ProfileNameForm customer={customer} />
        <ProfileEmailForm customer={customer} />
        <ProfilePhoneForm customer={customer} />
        <ProfilePasswordForm customer={customer} />
        <ProfileBillingForm customer={customer} />
      </div>
    </>
  );
});
