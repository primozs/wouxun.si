import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import * as v from 'valibot';
import {
  useForm,
  valiForm$,
  formAction$,
  type InitialValues,
  FormError,
} from '@modular-forms/qwik';
import setCookie from 'set-cookie-parser';
import { SESSION_COOKIE_KEY, getMedusaClient } from '~/modules/medusa';
import { TextInput } from '~/ui/input/TextInput';
import { Response } from '~/ui/input/Response';
import { Button, NavLink } from '~/ui/button';
import { InputPassword } from '~/ui/input/InputPassword';
import { UiTitle } from '~/ui/UiTitle';
import { UiDivider } from '~/ui/UiDivider';

export default component$(() => {
  return (
    <div class="mx-auto w-full max-w-sm lg:w-96">
      <LoginForm />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Prijava',
};

type LoginForm = v.Input<typeof LoginSchema>;

const LoginSchema = v.object({
  email: v.string([
    v.minLength(5, $localize`Please enter email`),
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
    const client = getMedusaClient();

    let res: Awaited<ReturnType<typeof client.auth.authenticate>>;
    try {
      res = await client.auth.authenticate({
        email: user.email,
        password: user.password,
      });
    } catch (error) {
      throw new FormError<LoginForm>(
        'Prijava ni bila uspešna. Preverite email in geslo.',
      );
    }

    // const customer = res.customer as unknown as Customer;

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
  },
  valiForm$(LoginSchema),
);

export const LoginForm = component$(() => {
  const [loginForm, { Field, Form }] = useForm<LoginForm>({
    loader: useFormLoader(),
    validate: valiForm$(LoginSchema),
    action: useFormAction(),
  });

  return (
    <div class="space-y-4">
      <UiTitle size="lg">Prijava</UiTitle>
      <Form id="login-form" class="space-y-4">
        <Field name="email">
          {(field, props) => (
            <TextInput
              {...props}
              type="email"
              label="E-naslov"
              placeholder="Vpišite email"
              auto-complete="email"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>

        <Field name="password">
          {(field, props) => (
            <InputPassword
              {...props}
              type="password"
              label={$localize`Password`}
              placeholder={$localize`Enter password`}
              auto-complete="current-password"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>

        <div class="flex items-center justify-end">
          <NavLink size="sm" href="/account/password-reset">
            {$localize`Forgot password?`}
          </NavLink>
        </div>

        <div>
          <Response of={loginForm} />
        </div>

        <div class="flex flex-col">
          <Button type="submit" loading={loginForm.submitting}>
            Prijava
          </Button>
        </div>

        <UiDivider>Ali</UiDivider>

        <div class="flex flex-col">
          <NavLink intent="button" color="secondary" href="/account/register">
            Ustvari račun
          </NavLink>
        </div>
      </Form>
    </div>
  );
});
