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
import { handleError } from '~/services/logger';
import { getMedusaClient } from '~/services/medusa';
import { FormButton } from '~/ui/input/FormButton';
import { FormHeader } from '~/ui/input/FormHeader';
import { InputDivider } from '~/ui/input/InputDivider';
import { Response } from '~/ui/input/Response';
import { TextInput } from '~/ui/input/TextInput';
import { LinkButton } from '~/ui/link-button';

export default component$(() => {
  return (
    <div class="flex flex-1 flex-col justify-center px-4 py-6">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <PasswordResetView />
      </div>
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
      <FormHeader heading="Password reset" />
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

        <div class="flex flex-col">
          <FormButton type="submit" loading={resetPasswordForm.submitting}>
            Pošlji zahtevo
          </FormButton>
        </div>

        <div>
          <Response of={resetPasswordForm} />
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
