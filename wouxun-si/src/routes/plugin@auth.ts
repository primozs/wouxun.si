import {
  type RequestHandler,
  routeAction$,
  routeLoader$,
} from '@builder.io/qwik-city';
import type { Customer } from '@medusajs/client-types';
import {
  SESSION_COOKIE_KEY,
  getMedusaClient,
  getSrvSessionHeaders,
} from '~/modules/medusa';
import { getServerSession } from '~/modules/auth';

export const useAuthSessionLoader = routeLoader$(async (event) => {
  // server
  let session = (await event.sharedMap.get('session')) as Customer | null;
  if (!session) {
    session = await getServerSession(event);
  }
  return session;
});

export const useAuthSignoutAction = routeAction$(async (_, event) => {
  const client = getMedusaClient();
  await client.auth.deleteSession(getSrvSessionHeaders(event));
  event.cookie.delete(SESSION_COOKIE_KEY, {
    path: '/',
  });
  throw event.redirect(302, '/');
});

export const onGet: RequestHandler = async (event) => {
  await getServerSession(event);
};
