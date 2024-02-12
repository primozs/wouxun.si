import {
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useSignal,
  useStore,
} from '@builder.io/qwik';
import type { Customer } from '@medusajs/client-types';
import { config } from '~/config';
import { useAuthSessionLoader } from '~/routes/plugin@auth';
// import { useGetRegionLoader } from '~/routes/plugin@store';
import { CartDialogContext } from '~/store/cart/CartDialog';

export interface AppGlobalStore {
  country: string | null;
  locale: string;
  // region: Region | null;
  customer: Customer | null;
}

export const AppGlobalState =
  createContextId<AppGlobalStore>('app-global-state');

export const useAppGlobal = () => {
  return useContext(AppGlobalState);
};

export const AppGlobalProvider = component$(() => {
  const customer = useAuthSessionLoader();
  // const region = useGetRegionLoader();
  const store = useStore<AppGlobalStore>(
    {
      country: config.DEFAULT_COUNTRY,
      locale: config.DEFAULT_LOCALE,
      // region: region.value,
      customer: customer.value,
    },
    {
      deep: true,
    },
  );

  useContextProvider<AppGlobalStore>(AppGlobalState, store);

  const cartDialog = useSignal<HTMLDialogElement>();
  useContextProvider(CartDialogContext, cartDialog);

  return (
    <>
      <Slot />
    </>
  );
});
