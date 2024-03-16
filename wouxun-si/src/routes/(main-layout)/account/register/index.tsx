import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import {
  type InitialValues,
  formAction$,
  useForm,
  valiForm$,
  FormError,
} from '@modular-forms/qwik';
import * as v from 'valibot';
import { handleError } from '~/modules/logger';
import { getMedusaClient } from '~/modules/medusa';
import { UiTitle } from '~/ui/UiTitle';
import { UiDivider } from '~/ui/UiDivider';
import { InputPassword } from '~/ui/input/InputPassword';
import { Response } from '~/ui/input/Response';
import { TextInput } from '~/ui/input/TextInput';
import { Button, NavLink } from '~/ui/button';
import { SectionContainerSmall } from '~/modules/layout/PageContainer';
import { useLocale } from '~/modules/locale/LocaleProvider';

export default component$(() => {
  return (
    <SectionContainerSmall>
      <RegisterView />
    </SectionContainerSmall>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Create account`,
});

type RegisterForm = v.Input<typeof RegisterSchema>;

const RegisterSchema = v.object({
  first_name: v.string([v.minLength(1, $localize`Enter name`)]),
  last_name: v.string([v.minLength(1, $localize`Enter surname`)]),
  email: v.string([
    v.minLength(5, $localize`Enter email`),
    v.email($localize`Email not valid`),
  ]),
  phone: v.optional(v.string()),
  password: v.string([
    v.minLength(1, $localize`Enter password`),
    v.minLength(8, $localize`Password must have 8 characters or more`),
  ]),
});

export const useFormLoader = routeLoader$<InitialValues<RegisterForm>>(
  async () => {
    return {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: '',
    };
  },
);

type ResponseType = any;

export const useFormAction = formAction$<RegisterForm, ResponseType>(
  async (user, event) => {
    const client = getMedusaClient();

    const existRes = await client.auth.exists(user.email);
    if (existRes.exists) {
      throw new FormError<RegisterForm>({
        email: $localize`User with this email already exists.`,
      });
    }

    try {
      await client.customers.create(user);
      return event.redirect(302, '/account/login');
    } catch (error: any) {
      handleError(error);
      throw new FormError<RegisterForm>(
        $localize`Registration was not successfull.`,
      );
    }
  },
  valiForm$(RegisterSchema),
);

export const RegisterView = component$(() => {
  const locale = useLocale();
  const [registerForm, { Form, Field }] = useForm<RegisterForm>({
    loader: useFormLoader(),
    validate: valiForm$(RegisterSchema),
    action: useFormAction(),
  });

  return (
    <div class="space-y-4">
      <UiTitle size="2xl">{$localize`Create new account`}</UiTitle>

      <Form id="register-form" class="space-y-4">
        <Field name="first_name">
          {(field, props) => (
            <TextInput
              {...props}
              type="text"
              label={$localize`Name`}
              placeholder={$localize`Enter name`}
              auto-complete="given-name"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>

        <Field name="last_name">
          {(field, props) => (
            <TextInput
              {...props}
              type="text"
              label={$localize`Surname`}
              placeholder={$localize`Enter surname`}
              auto-complete="family-name"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>

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

        <Field name="phone">
          {(field, props) => (
            <TextInput
              {...props}
              type="tel"
              label={$localize`Phone`}
              placeholder={$localize`Enter phone`}
              auto-complete="tel"
              value={field.value}
              error={field.error}
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
              auto-complete="new-password"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>

        <div class="flex items-center justify-end">
          <NavLink size="sm" href={`/${locale.value}/terms-and-conditions`}>
            {$localize`Terms of use, privacy policy`}
          </NavLink>
        </div>

        <div>
          <Response of={registerForm} />
        </div>

        <div class="flex flex-col">
          <Button type="submit" loading={registerForm.submitting}>
            {$localize`Create account`}
          </Button>
        </div>

        <UiDivider>{$localize`Or`}</UiDivider>

        <div class="flex flex-col">
          <NavLink intent="button" color="secondary" href="/account/login">
            {$localize`Signin`}
          </NavLink>
        </div>
      </Form>
    </div>
  );
});
