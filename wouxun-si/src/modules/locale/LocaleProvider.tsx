import {
  type Signal,
  Slot,
  component$,
  createContextId,
  useContext,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';
import { useLocaleLoader } from '~/routes/plugin';

type LocaleType = Signal<string>;
const LocaleCtx = createContextId<LocaleType>('locale');

export const useLocale = () => {
  const locale = useContext(LocaleCtx);
  return locale;
};

export const LocaleProvider = component$(() => {
  const locale = useLocaleLoader();
  const localeSig = useSignal(locale.value);
  useContextProvider<LocaleType>(LocaleCtx, localeSig);

  return (
    <>
      <Slot />
    </>
  );
});
