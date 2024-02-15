import { component$ } from '@builder.io/qwik';
import { type DocumentHead, Link, routeLoader$ } from '@builder.io/qwik-city';
import * as v from 'valibot';
import {
  useForm,
  valiForm$,
  formAction$,
  type InitialValues,
  FormError,
} from '@modular-forms/qwik';
import setCookie from 'set-cookie-parser';
import { SESSION_COOKIE_KEY, getMedusaClient } from '~/services/medusa';
import { TextInput } from '~/ui/input/TextInput';
import { Response } from '~/ui/input/Response';
import { FormButton } from '~/ui/input/FormButton';
import { FormHeader } from '~/ui/input/FormHeader';
import { InputDivider } from '~/ui/input/InputDivider';
import { LinkButton } from '~/ui/link-button';

export default component$(() => {
  return (
    <div class="flex flex-1 flex-col justify-center px-4 py-6">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <LoginForm />
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Prijava',
};

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
      <FormHeader heading="Prijava" />
      <Form id="login-form" class="space-y-4">
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

        <div class="flex items-center justify-end">
          <div class="text-sm">
            <Link href="/password-reset">Ste pozabili geslo</Link>
          </div>
        </div>

        <div class="flex flex-col">
          <FormButton type="submit" loading={loginForm.submitting}>
            Prijava
          </FormButton>
        </div>

        <div>
          <Response of={loginForm} />
        </div>

        <InputDivider>Ali</InputDivider>

        <div class="flex flex-col">
          <LinkButton intent="secondary" href="/register">
            Ustvari račun
          </LinkButton>
        </div>
      </Form>
    </div>
  );
});
