import {
  type RequestEventLoader,
  type RequestEvent,
  type RequestHandler,
  routeLoader$,
} from '@builder.io/qwik-city';
import type { Customer } from '@medusajs/client-types';

import {
  SESSION_COOKIE_KEY,
  getMedusaClient,
  getSrvSessionHeaders,
} from '~/modules/medusa';

export const getServerSession = (
  event: RequestEventLoader | RequestEvent,
): Promise<Customer | null> => {
  const promise = event.sharedMap.get('session');

  if (promise) {
    return promise;
  }

  const client = getMedusaClient();
  const shared = client.auth
    .getSession(getSrvSessionHeaders(event))
    .then((res) => {
      return res.customer;
    })
    .catch(() => {
      // handleError(error, 'Get server session');
      return null;
    });
  event.sharedMap.set('session', shared);
  return shared as unknown as Promise<Customer>;
};

// eslint-disable-next-line qwik/loader-location
export const useAuthSessionLoader = routeLoader$(async (event) => {
  const session = await getServerSession(event);
  return session;
});

export const protectedRoute: RequestHandler = async (event) => {
  const sessionCookie = event.cookie.has(SESSION_COOKIE_KEY);
  if (!sessionCookie) {
    throw event.redirect(
      302,
      `/account/login?callbackUrl=${event.url.pathname}`,
    );
  }
};
