import { component$ } from '@builder.io/qwik';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';

export default component$(() => {
  return (
    <div class="w-full">
      <div class="mb-8 flex flex-col gap-y-4">
        <UiTitle>Profile</UiTitle>
        <UiText wrap>
          View and update your profile information, including your name, email,
          and phone number. You can also update your billing address, or change
          your password.
        </UiText>
      </div>
      <div class="flex flex-col gap-y-8 w-full">
        {/* <ProfileName customer={customer} />
        <Divider />
        <ProfileEmail customer={customer} />
        <Divider />
        <ProfilePhone customer={customer} />
        <Divider />
        <ProfilePassword customer={customer} />
        <Divider />
        <ProfileBillingAddress customer={customer} regions={regions} /> */}
      </div>
    </div>
  );
});
