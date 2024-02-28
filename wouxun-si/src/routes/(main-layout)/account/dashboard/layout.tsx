import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { protectedRoute } from '~/modules/auth';
import { AccountNav } from './AccountNav';
import { useAuthSessionLoader } from '~/routes/plugin@auth';
import { NavLink } from '~/ui/button';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { UiContent } from '~/ui/UiContent';

export const onGet: RequestHandler = async (event) => {
  await protectedRoute(event);
};

export default component$(() => {
  const customer = useAuthSessionLoader();

  return (
    <UiContent overflowYAuto={false}>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-[240px_1fr]">
        <div>{customer.value && <AccountNav customer={customer.value} />}</div>
        <div class="flex-1">
          <Slot></Slot>
        </div>
      </div>

      <div class="flex flex-col justify-between py-4 gap-4" q:slot="end">
        <div>
          <UiTitle size="lg">{$localize`Got questions?`}</UiTitle>
          <UiText wrap>
            {$localize`You can find frequently asked questions and answers on our customer
            service page.`}
          </UiText>
        </div>
        <div>
          <NavLink href="/podpora">{$localize`Customer Service`}</NavLink>
        </div>
      </div>
    </UiContent>
  );
});
