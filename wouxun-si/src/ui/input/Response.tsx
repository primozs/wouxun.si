import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik/build';
import type { FormResponse, FormStore } from '@modular-forms/qwik';
import { Expandable } from '../expendable/Expandable';

type ResponseProps = {
  of: FormStore<any, any>;
  class?: string;
};

export const Response = component$(({ of: form, ...props }: ResponseProps) => {
  // Use frozen response signal
  const frozenResponse = useSignal<FormResponse<any>>();

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
  });

  return (
    <Expandable expanded={!!form.response.message}>
      <div
        class={[
          'text-sm',
          frozenResponse.value?.status === 'success' &&
            'text-primary-500 dark:text-gray-400',
          frozenResponse.value?.status === 'error' &&
            'text-error-500 dark:text-error-400',
          props.class,
        ]}
      >
        {frozenResponse.value?.message}
      </div>
    </Expandable>
  );
});
