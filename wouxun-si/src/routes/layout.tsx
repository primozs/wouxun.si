import { component$, Slot } from '@builder.io/qwik';
import { type RequestHandler } from '@builder.io/qwik-city';
import { srvSetLocale } from '~/modules/common/srvGetLocale';

export const onGet: RequestHandler = async (reqEvent) => {
  reqEvent.cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
  srvSetLocale(reqEvent);
};

export default component$(() => {
  return <Slot />;
});
