import { component$, Slot } from '@builder.io/qwik';
import { CheckCircle } from '~/ui/icons/check-circle';
import { ExclamationTriangle } from '~/ui/icons/exclamation-triangle';
import { InformationCircle } from '~/ui/icons/information-circle';
import { XCircle } from '~/ui/icons/x-circle';
import { XMark } from '~/ui/icons/x-mark';

type AlertProps = {
  title: string;
  description?: string;
  class?: string;
  textList?: string[];
  intent?: 'information' | 'success' | 'error' | 'warning';
};

export const Alert = component$<AlertProps>(
  ({ intent = 'information', ...rest }) => {
    return (
      <div
        class={[
          'rounded-md p-4',
          {
            'bg-info-50': intent === 'information',
          },
          {
            'bg-success-50': intent === 'success',
          },
          {
            'bg-error-50': intent === 'error',
          },
          {
            'bg-warning-50': intent === 'warning',
          },
          rest.class,
        ]}
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            {intent === 'information' && (
              <InformationCircle class="h-5 w-5 text-info-400" />
            )}
            {intent === 'success' && (
              <CheckCircle class="h-5 w-5 text-success-400" />
            )}
            {intent === 'error' && <XCircle class="h-5 w-5 text-error-400" />}
            {intent === 'warning' && (
              <ExclamationTriangle class="h-5 w-5 text-warning-400" />
            )}
          </div>
          <div class="ml-3">
            <AlertTitle intent={intent}>{rest.title}</AlertTitle>
            {rest.description && (
              <AlertDescription intent={intent}>
                {rest.description}
              </AlertDescription>
            )}
            {rest.textList && (
              <AlertTextList intent={intent} textList={rest.textList} />
            )}
          </div>

          <Slot name="close-button" />
        </div>
      </div>
    );
  },
);

type AlertTitleProps = {
  intent?: 'information' | 'success' | 'error' | 'warning';
};

export const AlertTitle = component$(
  ({ intent = 'information' }: AlertTitleProps) => {
    return (
      <span
        class={[
          'text-sm font-medium',
          {
            'text-info-800': intent === 'information',
          },
          {
            'text-success-800': intent === 'success',
          },
          {
            'text-error-800': intent === 'error',
          },
          {
            'text-warning-800': intent === 'warning',
          },
        ]}
      >
        <Slot />
      </span>
    );
  },
);

type AlertDescriptionProps = {
  intent?: 'information' | 'success' | 'error' | 'warning';
};

export const AlertDescription = component$(
  ({ intent = 'information' }: AlertDescriptionProps) => {
    return (
      <div
        class={[
          'text-sm font-medium',
          {
            'text-info-700': intent === 'information',
          },
          {
            'text-success-700': intent === 'success',
          },
          {
            'text-error-700': intent === 'error',
          },
          {
            'text-warning-700': intent === 'warning',
          },
        ]}
      >
        <p>
          <Slot />
        </p>
      </div>
    );
  },
);

type AlertTextListProps = {
  textList: string[];
  intent?: 'information' | 'success' | 'error' | 'warning';
};

export const AlertTextList = component$(
  ({ intent = 'information', textList }: AlertTextListProps) => {
    return (
      <div
        class={[
          'text-sm font-medium',
          {
            'text-info-700': intent === 'information',
          },
          {
            'text-success-700': intent === 'success',
          },
          {
            'text-error-700': intent === 'error',
          },
          {
            'text-warning-700': intent === 'warning',
          },
        ]}
      >
        <ul role="list" class="list-disc space-y-1 pl-5">
          {textList.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    );
  },
);

type AlertCloseButtonProps = {
  intent?: 'information' | 'success' | 'error' | 'warning';
  class?: string;
};

export const AlertCloseButton = component$(
  ({ intent = 'information', ...rest }: AlertCloseButtonProps) => {
    return (
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            {...rest}
            class={[
              'inline-flex rounded-md',
              'p-1.5  focus:outline-none focus:ring-2',
              'focus:ring-offset-2',
              {
                'bg-info-50 text-info-500 hover:bg-info-100 focus:ring-info-600 focus:ring-offset-info-50':
                  intent === 'information',
              },
              {
                'bg-success-50 text-success-500 hover:bg-success-100 focus:ring-success-600 focus:ring-offset-success-50':
                  intent === 'success',
              },
              {
                'bg-error-50 text-error-500 hover:bg-error-100 focus:ring-error-600 focus:ring-offset-error-50':
                  intent === 'error',
              },
              {
                'bg-warning-50 text-warning-500 hover:bg-warning-100 focus:ring-warning-600 focus:ring-offset-warning-50':
                  intent === 'warning',
              },
              rest.class,
            ]}
          >
            <span class="sr-only">Dismiss</span>
            <XMark class="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  },
);
