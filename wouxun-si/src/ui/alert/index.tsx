import { component$, Slot } from '@builder.io/qwik';

import {
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
  IoAlertCircleSharp,
} from '@qwikest/icons/ionicons';

import { HiExclamationTriangleSolid } from '@qwikest/icons/heroicons';

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
            'bg-info/5': intent === 'information',
          },
          {
            'bg-success/5': intent === 'success',
          },
          {
            'bg-error/5': intent === 'error',
          },
          {
            'bg-warning/5': intent === 'warning',
          },
          rest.class,
        ]}
      >
        <div class="flex items-center">
          <div class="flex-shrink-0">
            {intent === 'information' && (
              <IoAlertCircleSharp class="h-5 w-5 text-info" />
            )}
            {intent === 'success' && (
              <IoCheckmarkCircleSharp class="h-5 w-5 text-success" />
            )}
            {intent === 'error' && (
              <IoCloseCircleSharp class="h-5 w-5 text-error" />
            )}
            {intent === 'warning' && (
              <HiExclamationTriangleSolid class="h-5 w-5 text-warning" />
            )}
          </div>
          <div class="ml-3">
            <AlertTitle intent={intent}>{rest.title}</AlertTitle>
            {rest.description && (
              <AlertDescription intent={intent}>
                {rest.description}
              </AlertDescription>
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
            'text-info': intent === 'information',
          },
          {
            'text-success': intent === 'success',
          },
          {
            'text-error': intent === 'error',
          },
          {
            'text-warning': intent === 'warning',
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
            'text-info': intent === 'information',
          },
          {
            'text-success': intent === 'success',
          },
          {
            'text-error': intent === 'error',
          },
          {
            'text-warning': intent === 'warning',
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
