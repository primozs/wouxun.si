import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik/build';
import { Expandable } from '../expendable/Expandable';

type InputErrorProps = {
  name: string;
  error?: string;
};

export const InputError = component$(({ name, error }: InputErrorProps) => {
  // Use frozen error signal
  const frozenError = useSignal<string>();

  // Freeze error while element collapses to prevent UI from jumping
  useTask$(({ track, cleanup }) => {
    const nextError = track(() => error);
    if (isBrowser && !nextError) {
      const timeout = setTimeout(() => (frozenError.value = nextError), 200);
      cleanup(() => clearTimeout(timeout));
    } else {
      frozenError.value = nextError;
    }
  });

  return (
    <Expandable expanded={!!error}>
      <div
        class="pt-4 text-sm text-error-500 dark:text-error-400"
        id={`${name}-error`}
      >
        {frozenError.value}
      </div>
    </Expandable>
  );
});
