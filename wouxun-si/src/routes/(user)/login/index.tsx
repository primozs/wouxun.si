import { component$ } from '@builder.io/qwik';
import { RequestHandler, routeLoader$ } from '@builder.io/qwik-city';
import { authSignIn, useAuthSignoutAction } from '~/routes/plugin@auth';
import { Button } from '~/ui/button';
import * as v from 'valibot';
import {
  useForm,
  valiForm$,
  formAction$,
  type InitialValues,
  FormError,
} from '@modular-forms/qwik';
import { Customer } from '@medusajs/client-types';
import setCookie from 'set-cookie-parser';
import { SESSION_COOKIE_KEY } from '~/services/medusa';

type LoginForm = v.Input<typeof LoginSchema>;

const LoginSchema = v.object({
  email: v.string([
    v.minLength(5, 'Prosimo vpišite email'),
    v.email('E-naslov ni pravilen'),
  ]),
  password: v.string([
    v.minLength(1, 'Prosimo vpišite geslo'),
    v.minLength(8, 'Geslo mora vsebovati 8 znakov ali več'),
  ]),
});

export const useFormLoader = routeLoader$<InitialValues<LoginForm>>(() => {
  return {
    email: '',
    password: '',
  };
});

type ResponseType = any; // Customer
export const useFormAction = formAction$<LoginForm, ResponseType>(
  async (user, event) => {
    try {
      const res = await authSignIn(user);
      const customer = res.customer as unknown as Customer;

      // get medusa session cookie
      // @ts-ignore
      const cookies = setCookie.parse(res.response.headers['set-cookie'], {
        map: true,
      });

      const sessionCookie = cookies[SESSION_COOKIE_KEY];
      if (!sessionCookie) {
        throw new FormError<LoginForm>(
          'Prijava ni bila uspešna. Seja ni bila najdena.',
        );
      }

      event.cookie.set(SESSION_COOKIE_KEY, sessionCookie.value, {
        expires: sessionCookie.expires,
        httpOnly: true,
        path: sessionCookie.path,
        secure: true,
        sameSite: 'Strict',
      });

      const callbackUrl = event.query.get('callbackUrl');
      if (callbackUrl) {
        return event.redirect(302, callbackUrl);
      }

      return {
        status: 'success',
        message: 'Prijava je bila uspešna.',
        data: customer,
      };
    } catch (error: any) {
      throw new FormError<LoginForm>(
        'Prijava ni bila uspešna. Preverite email in geslo.',
      );
      // return event.fail(error.response.status, {
      //   status: 'error',
      //   code: error.response.status,
      //   message: error.response.statusText,
      // });
    }
  },
  valiForm$(LoginSchema),
);

export default component$(() => {
  const [loginForm, { Field, Form }] = useForm<LoginForm>({
    loader: useFormLoader(),
    validate: valiForm$(LoginSchema),
    action: useFormAction(),
  });

  const signout = useAuthSignoutAction();

  return (
    <>
      <Form>
        <Field name="email">
          {(field, props) => (
            <label class="block">
              <span class="text-gray-700">E-naslov</span>
              <input
                {...props}
                type="email"
                class="mt-1 block w-full"
                placeholder="janez@example.com"
                value={field.value}
              />
              {field.error && <div>{field.error}</div>}
            </label>
          )}
        </Field>

        <Field name="password">
          {(field, props) => (
            <label class="block">
              <span class="text-gray-700">Geslo</span>
              <input
                {...props}
                type="password"
                class="form-input mt-1 block w-full"
                placeholder="Vpišite geslo"
                value={field.value}
              />
              {field.error && <div>{field.error}</div>}
            </label>
          )}
        </Field>

        <Button type="submit">Prijava</Button>
      </Form>

      <div class="text-blue-500">
        {/* bug modular forms  */}
        {JSON.parse(JSON.stringify(loginForm.response, null, 2)).message}
      </div>

      {loginForm.submitting && <p>submitting...</p>}

      <Button
        type="button"
        onClick$={() => {
          signout.submit();
        }}
      >
        Logout
      </Button>
    </>
  );
});
