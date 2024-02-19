import {
  type RequestEventLoader,
  type RequestEvent,
  type RequestHandler,
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

export const protectedRoute: RequestHandler = async (event) => {
  const session = (await event.sharedMap.get('session')) as Customer | null;
  const sessionCookie = event.cookie.get(SESSION_COOKIE_KEY);
  if (!sessionCookie?.value || !session) {
    throw event.redirect(
      302,
      `/account/login?callbackUrl=${event.url.pathname}`,
    );
  }
};
