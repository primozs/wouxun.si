import { type Signal, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik/build';
import type { FormResponse, FormStore } from '@modular-forms/qwik';
import { Expandable } from '../expendable/Expandable';

type ResponseProps = {
  of: FormStore<any, any>;
  class?: string;
  modal?: Signal<HTMLDialogElement | undefined>;
};

export const Response = component$(({ of: form, ...props }: ResponseProps) => {
  // Use frozen response signal
  const frozenResponse = useSignal<FormResponse<any>>();
  const modal = props.modal;

  // Freeze response while element collapses to prevent UI from jumping
  useTask$(({ track, cleanup }) => {
    const nextResponse = track(() => form.response);
    if (isBrowser && !nextResponse) {
      const timeout = setTimeout(
        () => (frozenResponse.value = nextResponse),
        200,
      );
      cleanup(() => clearTimeout(timeout));
    } else {
      frozenResponse.value = nextResponse;
    }

    if (isBrowser && frozenResponse.value?.status === 'success' && modal) {
      console.log('should close');
      modal.value?.close();
    }
  });

  return (
    <Expandable expanded={!!form.response.message}>
      <div
        class={[
          'text-sm',
          frozenResponse.value?.status === 'success' && 'text-base-content',
          frozenResponse.value?.status === 'error' && 'text-error',
          props.class,
        ]}
      >
        {frozenResponse.value?.message}
      </div>
    </Expandable>
  );
});
