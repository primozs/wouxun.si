import { component$, Slot } from '@builder.io/qwik';
import { type RequestHandler } from '@builder.io/qwik-city';
import { useI18nDEV } from '~/modules/locale/i18n-utils';

export const onGet: RequestHandler = async (event) => {
  if (
    !event.url.pathname.includes('account') &&
    !event.url.pathname.includes('checkout') &&
    !event.url.pathname.includes('cart')
  ) {
    event.cacheControl({
      // Always serve a cached response by default, up to a week stale
      staleWhileRevalidate: 60 * 60 * 24 * 7,
      // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
      maxAge: 5,
    });
  }
};

export default component$(() => {
  useI18nDEV();
  return <Slot />;
});
