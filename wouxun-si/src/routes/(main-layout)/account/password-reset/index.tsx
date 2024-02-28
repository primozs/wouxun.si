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
import { UiDivider } from '~/ui/UiDivider';
import { Response } from '~/ui/input/Response';
import { TextInput } from '~/ui/input/TextInput';
import { Button, NavLink } from '~/ui/button';
import { SectionContainerSmall } from '~/modules/layout/PageContainer';

export default component$(() => {
  return (
    <SectionContainerSmall>
      <PasswordResetView />
    </SectionContainerSmall>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Password reset`,
});

type ResetPasswordForm = v.Input<typeof ResetPasswordSchema>;

const ResetPasswordSchema = v.object({
  email: v.string([
    v.minLength(5, $localize`Enter email`),
    v.email($localize`Email not valid`),
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
        email: $localize`User with this email does not exists.`,
      });
    }

    try {
      await client.customers.generatePasswordToken({
        email: data.email,
      });

      return {
        status: 'success',
        message: $localize`Please check your email for reset instructions`,
      };
    } catch (error: any) {
      handleError(error);
      throw new FormError<ResetPasswordForm>($localize`Request error`);
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
      <UiTitle size="2xl">{$localize`Password reset`}</UiTitle>
      <Form id="reset-password-form" class="space-y-4">
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

        <div>
          <Response of={resetPasswordForm} />
        </div>

        <div class="flex flex-col">
          <Button type="submit" loading={resetPasswordForm.submitting}>
            {$localize`Send request`}
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
