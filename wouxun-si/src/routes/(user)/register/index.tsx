import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead, Link } from '@builder.io/qwik-city';
import {
  type InitialValues,
  formAction$,
  useForm,
  valiForm$,
  FormError,
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
        <RegisterView />
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Registracija',
};

type RegisterForm = v.Input<typeof RegisterSchema>;

const RegisterSchema = v.object({
  first_name: v.string([v.minLength(1, 'Prosimo vpišite ime')]),
  last_name: v.string([v.minLength(1, 'Prosimo vpišite priimek')]),
  email: v.string([
    v.minLength(5, 'Prosimo vpišite email'),
    v.email('E-naslov ni pravilen'),
  ]),
  password: v.string([
    v.minLength(1, 'Prosimo vpišite geslo'),
    v.minLength(8, 'Geslo mora vsebovati 8 znakov ali več'),
  ]),
});

export const useFormLoader = routeLoader$<InitialValues<RegisterForm>>(
  async () => {
    return {
      first_name: '',
      last_name: '',
      email: '',
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
        email: 'Uporabnik s tem e-naslovom že obstaja.',
      });
    }

    try {
      await client.customers.create(user);
      return event.redirect(302, '/login');
    } catch (error: any) {
      handleError(error);
      throw new FormError<RegisterForm>('Registracija ni bila uspešna.');
    }
  },
  valiForm$(RegisterSchema),
);

export const RegisterView = component$(() => {
  const [registerForm, { Form, Field }] = useForm<RegisterForm>({
    loader: useFormLoader(),
    validate: valiForm$(RegisterSchema),
    action: useFormAction(),
  });

  return (
    <div class="space-y-4">
      <FormHeader heading="Ustvarite nov račun" />

      <Form id="register-form" class="space-y-4">
        <Field name="first_name">
          {(field, props) => (
            <TextInput
              {...props}
              type="text"
              label="Ime"
              placeholder="Vpišite ime"
              auto-complete="name"
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
              label="Priimek"
              placeholder="Vpišite priimek"
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
              placeholder="Vpišite geslo"
              value={field.value}
              error={field.error}
              required
            />
          )}
        </Field>

        <div class="flex items-center justify-end">
          <div class="text-sm">
            <Link href="/sl/terms-and-conditions">
              Varstvo osebnih podatkov
            </Link>
          </div>
        </div>

        <div class="flex flex-col">
          <FormButton type="submit" loading={registerForm.submitting}>
            Ustvari račun
          </FormButton>
        </div>

        <div>
          <Response of={registerForm} />
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
