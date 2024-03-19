import { routeAction$, routeLoader$ } from '@builder.io/qwik-city';
import {
  SESSION_COOKIE_KEY,
  getMedusaClient,
  getSrvSessionHeaders,
} from '~/modules/medusa';

export const useIsAuthenticatedLoader = routeLoader$(async (event) => {
  return event.cookie.has(SESSION_COOKIE_KEY);
});

export const useAuthSignoutAction = routeAction$(async (_, event) => {
  const client = getMedusaClient();
  await client.auth.deleteSession(getSrvSessionHeaders(event));
  event.cookie.delete(SESSION_COOKIE_KEY, {
    path: '/',
  });
  throw event.redirect(302, '/');
});
