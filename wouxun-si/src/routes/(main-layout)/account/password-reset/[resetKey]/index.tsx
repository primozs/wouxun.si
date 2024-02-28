import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import * as v from 'valibot';
import {
  FormError,
  type InitialValues,
  formAction$,
  useForm,
  valiForm$,
} from '@modular-forms/qwik';
import { handleError } from '~/modules/logger';
import { getMedusaClient } from '~/modules/medusa';
import { TextInput } from '~/ui/input/TextInput';
import { Response } from '~/ui/input/Response';
import { UiDivider } from '~/ui/UiDivider';
import { Button, NavLink } from '~/ui/button';
import { UiTitle } from '~/ui/UiTitle';
import { SectionContainerSmall } from '~/modules/layout/PageContainer';

export default component$(() => {
  return (
    <SectionContainerSmall>
      <ChangePasswordView />
    </SectionContainerSmall>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Change password`,
});

type ChangePasswordForm = v.Input<typeof ChangePasswordSchema>;

const ChangePasswordSchema = v.object({
  email: v.string([
    v.minLength(5, $localize`Enter email`),
    v.email($localize`Email not valid`),
  ]),
  password: v.string([
    v.minLength(1, $localize`Enter password`),
    v.minLength(8, $localize`Password must have 8 characters or more`),
  ]),
  password2: v.string([
    v.minLength(1, $localize`Enter password`),
    v.minLength(8, $localize`Password must have 8 characters or more`),
  ]),
});

export const useFormLoader = routeLoader$<InitialValues<ChangePasswordForm>>(
  async () => {
    return {
      email: '',
      password: '',
      password2: '',
    };
  },
);

type ResponseType = any;

export const useFormAction = formAction$<ChangePasswordForm, ResponseType>(
  async (data, event) => {
    const token = event.params['resetKey'];
    if (!token) {
      throw new FormError<ChangePasswordForm>($localize`No token`);
    }

    if (data.password !== data.password2) {
      throw new FormError<ChangePasswordForm>({
        password: $localize`Passwords do not match`,
        password2: $localize`Passwords do not match`,
      });
    }

    try {
      const client = getMedusaClient();
      await client.customers.resetPassword({
        email: data.email,
        password: data.password,
        token,
      });
      return event.redirect(302, '/account/login');
    } catch (error: any) {
      handleError(error);
      throw new FormError<ChangePasswordForm>($localize`Password reset failed`);
    }
  },
  valiForm$(ChangePasswordSchema),
);

export const ChangePasswordView = component$(() => {
  const [changePasswordForm, { Form, Field }] = useForm<ChangePasswordForm>({
    loader: useFormLoader(),
    validate: valiForm$(ChangePasswordSchema),
    action: useFormAction(),
  });

  return (
    <div class="space-y-4">
      <UiTitle size="2xl">{$localize`Change password`}</UiTitle>
      <Form id="change-password-form" class="space-y-4">
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
            <TextInput
              {...props}
              type="password"
              label={$localize`Password`}
              placeholder={$localize`Enter password`}
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>
        <Field name="password2">
          {(field, props) => (
            <TextInput
              {...props}
              type="password"
              label={$localize`Password 2`}
              placeholder={$localize`Enter password again`}
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>

        <div>
          <Response of={changePasswordForm} />
        </div>

        <div class="flex flex-col">
          <Button type="submit" loading={changePasswordForm.submitting}>
            {$localize`Change password`}
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
