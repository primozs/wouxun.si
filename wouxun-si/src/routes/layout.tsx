import { component$, Slot } from '@builder.io/qwik';
import { type RequestHandler } from '@builder.io/qwik-city';
import { selectLocaleSrv, useI18nDEV } from '~/modules/locale/i18n-utils';

export const onGet: RequestHandler = async (event) => {
  event.cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });

  const userLocale = selectLocaleSrv(event);
  event.locale(userLocale);
};

export default component$(() => {
  useI18nDEV();
  return <Slot />;
});
