import {
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useSignal,
  useStore,
} from '@builder.io/qwik';
import { config } from '~/config';
// import { useGetRegionLoader } from '~/routes/plugin@store';
import { CartDialogContext } from '~/modules/cart/CartDialog';

export interface AppGlobalStore {
  country: string | null;
  locale: string;
  // region: Region | null;
}

export const AppGlobalState =
  createContextId<AppGlobalStore>('app-global-state');

export const useAppGlobal = () => {
  return useContext(AppGlobalState);
};

export const AppGlobalProvider = component$(() => {
  // const region = useGetRegionLoader();

  const store = useStore<AppGlobalStore>(
    {
      country: config.DEFAULT_COUNTRY,
      locale: config.DEFAULT_LOCALE,
      // region: region.value,
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
