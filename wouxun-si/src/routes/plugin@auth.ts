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
} from '~/services/medusa';
import { getServerSession } from '~/store/auth';

export const useAuthSessionLoader = routeLoader$(async (event) => {
  const session = (await event.sharedMap.get('session')) as Customer | null;
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
