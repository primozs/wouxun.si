import { type ActionStore, Form } from '@builder.io/qwik-city';
import { type FormStore, reset } from '@modular-forms/qwik';
import { Button } from '../button';

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
      <Button
        color="primary"
        type="submit"
        loading={formStore.submitting}
        form={form}
      >
        Pošlji
      </Button>
      {resetAction ? (
        <Form action={resetAction}>
          <Button
            color="secondary"
            type="submit"
            preventdefault:click
            onClick$={() => reset(formStore)}
          >
            Ponastavi
          </Button>
        </Form>
      ) : (
        <Button
          color="secondary"
          type="button"
          preventdefault:click
          onClick$={() => reset(formStore)}
        >
          Ponastavi
        </Button>
      )}
    </footer>
  );
}
