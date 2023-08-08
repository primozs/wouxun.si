import {
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useStore,
} from '@builder.io/qwik';
import type { Region } from '@medusajs/client-types';
import { config } from '~/config';
import { useGetRegion } from '~/routes/layout';

export interface AppGlobalStore {
  country: string | null;
  locale: string;
  region: Region | null;
}

export const AppGlobalState =
  createContextId<AppGlobalStore>('app-global-state');

export const useAppGlobal = () => {
  return useContext(AppGlobalState);
};

export const AppGlobalProvider = component$(() => {
  const region = useGetRegion();
  const store = useStore<AppGlobalStore>(
    {
      country: config.DEFAULT_COUNTRY,
      locale: config.DEFAULT_LOCALE,
      region: region.value,
    },
    {
      deep: true,
    },
  );

  useContextProvider<AppGlobalStore>(AppGlobalState, store);

  return (
    <>
      <Slot />
    </>
  );
});
