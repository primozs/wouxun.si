import { type ActionStore, Form } from '@builder.io/qwik-city';
import { type FormStore, reset } from '@modular-forms/qwik';
import { FormButton } from './FormButton';

type FormFooterProps = {
  of: FormStore<any, any>;
  resetAction?: ActionStore<{}, Record<string, any>, true>;
  form?: string;
};

export function FormFooter({
  of: formStore,
  resetAction,
  form,
}: FormFooterProps) {
  return (
    <footer class="flex flex-row-reverse justify-start gap-4">
      <FormButton
        intent="primary"
        type="submit"
        loading={formStore.submitting}
        form={form}
      >
        Pošlji
      </FormButton>
      {resetAction ? (
        <Form action={resetAction}>
          <FormButton
            intent="secondary"
            type="submit"
            preventdefault:click
            onClick$={() => reset(formStore)}
          >
            Ponastavi
          </FormButton>
        </Form>
      ) : (
        <FormButton
          intent="secondary"
          type="button"
          preventdefault:click
          onClick$={() => reset(formStore)}
        >
          Ponastavi
        </FormButton>
      )}
    </footer>
  );
}
