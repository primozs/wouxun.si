import { routeAction$, routeLoader$, z, zod$ } from '@builder.io/qwik-city';
import {
  SESSION_COOKIE_KEY,
  getMedusaClient,
  getSrvSessionHeaders,
} from '~/services/medusa';
import { getServerSession } from '~/store/auth';

export const useAuthSessionLoader = routeLoader$(async (event) => {
  const customer = await getServerSession(event);
  return customer;
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

// export const useAuthSigninAction = routeAction$(
//   async (user, event) => {
//     try {
//       const res = await authSignIn(user);
//       if (res.response.status !== 200) {
//         return event.fail(res.response.status, {
//           message: 'Not signed in',
//         });
//       }

//       return {
//         success: true,
//         customer: res.customer,
//       };
//     } catch (error: any) {
//       return event.fail(error.response.status, {
//         message: error.response.statusText,
//       });
//     }
//   },
//   zod$({
//     email: z.string(),
//     password: z.string(),
//   }),
// );
