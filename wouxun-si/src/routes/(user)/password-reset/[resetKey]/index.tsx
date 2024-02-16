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
import { handleError } from '~/services/logger';
import { getMedusaClient } from '~/services/medusa';
import { FormHeader } from '~/ui/input/FormHeader';
import { TextInput } from '~/ui/input/TextInput';
import { FormButton } from '~/ui/input/FormButton';
import { Response } from '~/ui/input/Response';
import { InputDivider } from '~/ui/input/InputDivider';
import { LinkButton } from '~/ui/link-button';

export default component$(() => {
  return (
    <div class="flex flex-1 flex-col justify-center px-4 py-6">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <ChangePasswordView />
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Change password',
};

type ChangePasswordForm = v.Input<typeof ChangePasswordSchema>;

const ChangePasswordSchema = v.object({
  email: v.string([
    v.minLength(5, 'Prosimo vpišite email'),
    v.email('E-naslov ni pravilen'),
  ]),
  password: v.string([
    v.minLength(1, 'Prosimo vpišite geslo'),
    v.minLength(8, 'Geslo mora vsebovati 8 znakov ali več'),
  ]),
  password2: v.string([
    v.minLength(1, 'Prosimo vpišite geslo'),
    v.minLength(8, 'Geslo mora vsebovati 8 znakov ali več'),
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
      throw new FormError<ChangePasswordForm>('No token');
    }

    if (data.password !== data.password2) {
      throw new FormError<ChangePasswordForm>({
        password: 'Passwords are not equal',
        password2: 'Passwords are not equal',
      });
    }

    try {
      const client = getMedusaClient();
      await client.customers.resetPassword({
        email: data.email,
        password: data.password,
        token,
      });
      return event.redirect(302, '/login');
    } catch (error: any) {
      handleError(error);
      throw new FormError<ChangePasswordForm>('Password reset failed');
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
      <FormHeader heading="Change password" />
      <Form id="change-password-form" class="space-y-4">
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
            <TextInput
              {...props}
              type="password"
              label="Geslo"
              placeholder="Vpišite novo geslo"
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
              label="Geslo 2"
              placeholder="Ponovno vpišite geslo"
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
          <FormButton type="submit" loading={changePasswordForm.submitting}>
            Zamenjaj geslo
          </FormButton>
        </div>

        <InputDivider>Ali</InputDivider>

        <div class="flex flex-col">
          <LinkButton intent="secondary" href="/login">
            Prijava
          </LinkButton>
        </div>
      </Form>
    </div>
  );
});
