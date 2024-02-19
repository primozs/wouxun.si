import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { protectedRoute } from '~/modules/auth';
import { AccountNav } from './AccountNav';
import { useAuthSessionLoader } from '~/routes/plugin@auth';

export const onGet: RequestHandler = async (event) => {
  await protectedRoute(event);
};

export default component$(() => {
  const customer = useAuthSessionLoader();

  return (
    <div class="grid grid-cols-1 sm:grid-cols-[240px_1fr] h-full">
      <div>{customer.value && <AccountNav customer={customer.value} />}</div>
      <div class="flex-1">
        <Slot></Slot>
      </div>
    </div>
  );
});
