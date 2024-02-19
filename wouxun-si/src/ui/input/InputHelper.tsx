import type { QwikIntrinsicElements } from '@builder.io/qwik';
import { component$, Slot } from '@builder.io/qwik';

type Props = QwikIntrinsicElements['p'] & {
  intent?: 'help' | 'error';
  error?: boolean;
};

export const InputHelper = component$(
  ({ intent = 'help', error, ...rest }: Props) => {
    const intents: Record<string, string> = {
      help: 'text-base-content/60',
      error: 'text-error',
    };
    const selectedIntent = intents[error ? 'error' : intent];
    return (
      <p {...rest} class={['mt-2 text-sm h-3', selectedIntent, rest.class]}>
        {error !== false && <Slot />}
      </p>
    );
  },
);
