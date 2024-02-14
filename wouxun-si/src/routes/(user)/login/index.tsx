import { component$ } from '@builder.io/qwik';
import { routeLoader$, z } from '@builder.io/qwik-city';
import { authSignIn, useAuthSignoutAction } from '~/routes/plugin@auth';
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
import { TextInput } from '~/ui/input/TextInput';
import { Response } from '~/ui/input/Response';
import { FormButton } from '~/ui/input/FormButton';
import { FormHeader } from '~/ui/input/FormHeader';

export default component$(() => {
  return (
    <div class="flex flex-1 flex-col justify-center px-4 py-6">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <LoginForm />
      </div>
    </div>
  );
});

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
      } else {
        return event.redirect(302, '/');
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

export const LoginForm = component$(() => {
  const [loginForm, { Field, Form }] = useForm<LoginForm>({
    loader: useFormLoader(),
    validate: valiForm$(LoginSchema),
    action: useFormAction(),
  });

  const signout = useAuthSignoutAction();

  return (
    <div class="space-y-4">
      <FormHeader heading="Prijava" />
      <Form id="login-form">
        <Field name="email">
          {(field, props) => (
            <TextInput
              {...props}
              type="email"
              label="E-naslov"
              placeholder="Vpišite email"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>

        <Field name="password">
          {(field, props) => (
            <TextInput
              {...props}
              type="password"
              label="Geslo"
              placeholder="Vpišite geslo"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>

        <div class="flex flex-row-reverse justify-start gap-4">
          <FormButton type="submit" loading={loginForm.submitting}>
            Prijava
          </FormButton>

          {/* <FormButton
            type="button"
            intent="secondary"
            onClick$={() => {
              signout.submit();
            }}
            loading={signout.isRunning}
          >
            Odjava
          </FormButton> */}
        </div>

        <Response of={loginForm} />
      </Form>
    </div>
  );
});
