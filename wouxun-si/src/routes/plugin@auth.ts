import {
  RequestHandler,
  routeAction$,
  routeLoader$,
  z,
  zod$,
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

export const authSignIn = async (user: { email: string; password: string }) => {
  const client = getMedusaClient();

  const res = await client.auth.authenticate({
    email: user.email,
    password: user.password,
  });
  return res;
};

export const useAuthSignUpAction = routeAction$(
  async (user) => {
    const client = getMedusaClient();
    const res = await client.customers.create(user);
    return res.customer;
  },
  zod$({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.optional(z.string()),
  }),
);

export const onGet: RequestHandler = async (event) => {
  await getServerSession(event);
};
