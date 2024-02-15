import { Slot, component$ } from '@builder.io/qwik';
import { Button, type ButtonProps } from '../button';
import { LoadingDots } from '../loading-dots';

type FormButtonProps = ButtonProps & {
  loading?: boolean;
};

export const FormButton = component$<FormButtonProps>(
  ({ intent = 'primary', loading = false, ...rest }) => {
    return (
      <Button {...rest} intent={intent}>
        <span class={['relative leading-6']}>
          <span
            class={[
              'transition-[opacity,transform,visibility] duration-200',
              loading
                ? 'invisible translate-x-5 opacity-0'
                : 'visible delay-300',
            ]}
          >
            <Slot />
          </span>

          {loading && (
            <span class="absolute inset-0 -top-0.5">
              <LoadingDots
                class={[
                  intent === 'primary'
                    ? 'bg-white dark:bg-white'
                    : 'bg-secondary-900 dark:bg-secondary-900',
                ]}
              />
            </span>
          )}
        </span>
      </Button>
    );
  },
);