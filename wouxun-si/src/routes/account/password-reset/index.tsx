import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import {
  formAction$,
  FormError,
  valiForm$,
  type InitialValues,
  useForm,
} from '@modular-forms/qwik';
import * as v from 'valibot';
import { handleError } from '~/modules/logger';
import { getMedusaClient } from '~/modules/medusa';
import { UiTitle } from '~/ui/UiTitle';
import { InputDivider } from '~/ui/input/InputDivider';
import { Response } from '~/ui/input/Response';
import { TextInput } from '~/ui/input/TextInput';
import { Button, NavLink } from '~/ui/button';

export default component$(() => {
  return (
    <div class="mx-auto w-full max-w-sm lg:w-96">
      <PasswordResetView />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Password reset',
};

type ResetPasswordForm = v.Input<typeof ResetPasswordSchema>;

const ResetPasswordSchema = v.object({
  email: v.string([
    v.minLength(5, 'Prosimo vpišite email'),
    v.email('E-naslov ni pravilen'),
  ]),
});

export const useFormLoader = routeLoader$<InitialValues<ResetPasswordForm>>(
  async () => {
    return {
      email: '',
    };
  },
);

type ResponseType = any;

export const useFormAction = formAction$<ResetPasswordForm, ResponseType>(
  async (data) => {
    const client = getMedusaClient();

    const existRes = await client.auth.exists(data.email);
    if (!existRes.exists) {
      throw new FormError<ResetPasswordForm>({
        email: 'Uporabnik s tem e-naslovom ne obstaja.',
      });
    }

    try {
      await client.customers.generatePasswordToken({
        email: data.email,
      });

      return {
        status: 'success',
        message: 'Please check your email for reset instructions',
      };
    } catch (error: any) {
      handleError(error);
      throw new FormError<ResetPasswordForm>('Napaka pri zahtevi.');
    }
  },
  valiForm$(ResetPasswordSchema),
);

export const PasswordResetView = component$(() => {
  const [resetPasswordForm, { Form, Field }] = useForm<ResetPasswordForm>({
    loader: useFormLoader(),
    validate: valiForm$(ResetPasswordSchema),
    action: useFormAction(),
  });

  return (
    <div class="space-y-4">
      <UiTitle size="2xl">Password reset</UiTitle>
      <Form id="reset-password-form" class="space-y-4">
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

        <div>
          <Response of={resetPasswordForm} />
        </div>

        <div class="flex flex-col">
          <Button type="submit" loading={resetPasswordForm.submitting}>
            Pošlji zahtevo
          </Button>
        </div>

        <InputDivider>Ali</InputDivider>

        <div class="flex flex-col">
          <NavLink intent="button" color="secondary" href="/account/login">
            Prijava
          </NavLink>
        </div>
      </Form>
    </div>
  );
});
