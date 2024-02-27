import { component$ } from '@builder.io/qwik';
import { UiItem } from '~/ui/UiItem';
import { UiLabel } from '~/ui/UiLabel';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { Button } from '~/ui/button';
import { Expandable } from '~/ui/expendable/Expandable';

export default component$(() => {
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

      <div class="flex flex-col gap-y-8 w-full">
        <UiItem>
          <div class="flex flex-col flex-1">
            <div class="flex justify-between">
              <UiLabel>
                <UiText class="uppercase">{$localize`Name`}</UiText>
                <UiTitle>Primož Suša</UiTitle>
              </UiLabel>

              <Button color="neutral" q:slot="end">
                {$localize`Edit`}
                {/* {$localize`Cancel`} */}
              </Button>
            </div>
            <Expandable expanded={true}>ddd</Expandable>
          </div>
        </UiItem>

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
    </>
  );
});
