import { type ActionStore, Form } from '@builder.io/qwik-city';
import { type FormStore, reset } from '@modular-forms/qwik';
import { Button } from '../button';
import type { Signal } from '@builder.io/qwik';

type FormFooterProps = {
  of: FormStore<any, any>;
  resetAction?: ActionStore<{}, Record<string, any>, true>;
  form?: string;
  modal?: Signal<HTMLDialogElement | undefined>;
};

export function FormFooter({
  of: formStore,
  resetAction,
  form,
  modal,
}: FormFooterProps) {
  return (
    <footer class="flex flex-row-reverse justify-start gap-4">
      <Button
        color="primary"
        type="submit"
        loading={formStore.submitting}
        form={form}
      >
        {$localize`Submit`}
      </Button>
      {resetAction ? (
        <Form action={resetAction}>
          <Button
            color="secondary"
            type="submit"
            preventdefault:click
            onClick$={() => reset(formStore)}
          >
            {$localize`Cancel`}
          </Button>
        </Form>
      ) : (
        <Button
          color="secondary"
          type="button"
          preventdefault:click
          onClick$={() => {
            reset(formStore);
            modal?.value?.close();
          }}
        >
          {$localize`Cancel`}
        </Button>
      )}
    </footer>
  );
}
