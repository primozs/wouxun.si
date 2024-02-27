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
import { SectionContainerSmall } from '~/modules/layout/PageContainer';

export default component$(() => {
  return (
    <SectionContainerSmall>
      <LoginForm />
    </SectionContainerSmall>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Signin`,
});

type LoginForm = v.Input<typeof LoginSchema>;

const LoginSchema = v.object({
  email: v.string([
    v.minLength(5, $localize`Enter email`),
    v.email($localize`Email not valid`),
  ]),
  password: v.string([
    v.minLength(1, $localize`Enter password`),
    v.minLength(8, $localize`Password must have 8 characters or more`),
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
        $localize`Signin was not successfull. Check email and password.`,
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
        $localize`Signin was not successfull. Session not found.`,
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
      <UiTitle size="lg">{$localize`Signin`}</UiTitle>
      <Form id="login-form" class="space-y-4">
        <Field name="email">
          {(field, props) => (
            <TextInput
              {...props}
              type="email"
              label={$localize`Email`}
              placeholder={$localize`Enter email`}
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
            {$localize`Signin`}
          </Button>
        </div>

        <UiDivider>{$localize`Or`}</UiDivider>

        <div class="flex flex-col">
          <NavLink intent="button" color="secondary" href="/account/register">
            {$localize`Create account`}
          </NavLink>
        </div>
      </Form>
    </div>
  );
});
