import type { QwikIntrinsicElements } from '@builder.io/qwik';
import { component$, Slot } from '@builder.io/qwik';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { CheckCircle } from '~/ui/icons/check-circle';
import { ExclamationTriangle } from '~/ui/icons/exclamation-triangle';
import { InformationCircle } from '~/ui/icons/information-circle';
import { XCircle } from '~/ui/icons/x-circle';
import { XMark } from '~/ui/icons/x-mark';

type AlertClassesProps = VariantProps<typeof alert>;

type AlertProps = {
  title: string;
  description?: string;
  class?: string;
  textList?: string[];
} & AlertClassesProps;

export const alert = cva(['rounded-md', 'p-4'], {
  variants: {
    intent: {
      information: ['bg-info-50'],
      success: ['bg-success-50 '],
      error: ['bg-error-50'],
      warning: ['bg-warning-50'],
    },
  },
  defaultVariants: {
    intent: 'information',
  },
});

export const Alert = component$<AlertProps>(({ intent, ...rest }) => {
  return (
    <div class={alert({ intent, class: rest.class })}>
      <div class="flex">
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
});

export const alertTitle = cva('text-sm font-medium', {
  variants: {
    intent: {
      information: ['text-info-800'],
      success: ['text-success-800 '],
      error: ['text-error-800'],
      warning: ['text-warning-800'],
    },
  },
  defaultVariants: {
    intent: 'information',
  },
});

type AlertTitleProps = VariantProps<typeof alertTitle>;

export const AlertTitle = component$(({ intent }: AlertTitleProps) => {
  return (
    <h3 class={alertTitle({ intent })}>
      <Slot />
    </h3>
  );
});

export const alertDescription = cva('mt-2 text-sm', {
  variants: {
    intent: {
      information: ['text-info-700'],
      success: ['text-success-700 '],
      error: ['text-error-700'],
      warning: ['text-warning-700'],
    },
  },
  defaultVariants: {
    intent: 'information',
  },
});

type AlertDescriptionProps = VariantProps<typeof alertDescription>;

export const AlertDescription = component$(
  ({ intent }: AlertDescriptionProps) => {
    return (
      <div class={alertDescription({ intent })}>
        <p>
          <Slot />
        </p>
      </div>
    );
  },
);

export const alertTextList = cva('mt-2 text-sm', {
  variants: {
    intent: {
      information: ['text-info-700'],
      success: ['text-success-700 '],
      error: ['text-error-700'],
      warning: ['text-warning-700'],
    },
  },
  defaultVariants: {
    intent: 'information',
  },
});

type AlertTextListProps = VariantProps<typeof alertTextList> & {
  textList: string[];
};

export const AlertTextList = component$(
  ({ intent, textList }: AlertTextListProps) => {
    return (
      <div class={alertTextList({ intent })}>
        <ul role="list" class="list-disc space-y-1 pl-5">
          {textList.map((item) => {
            return <li key={item}>{item}</li>;
          })}
        </ul>
      </div>
    );
  },
);

export const alertCloseButton = cva(
  [
    'inline-flex rounded-md',
    'p-1.5  focus:outline-none focus:ring-2',
    'focus:ring-offset-2',
  ],
  {
    variants: {
      intent: {
        information: [
          'bg-info-50',
          'text-info-500',
          'hover:bg-info-100',
          'focus:ring-info-600',
          'focus:ring-offset-info-50',
        ],
        success: [
          'bg-success-50',
          'text-success-500',
          'hover:bg-success-100',
          'focus:ring-success-600',
          'focus:ring-offset-success-50',
        ],
        error: [
          'bg-error-50',
          'text-error-500',
          'hover:bg-error-100',
          'focus:ring-error-600',
          'focus:ring-offset-error-50',
        ],
        warning: [
          'bg-warning-50',
          'text-warning-500',
          'hover:bg-warning-100',
          'focus:ring-warning-600',
          'focus:ring-offset-warning-50',
        ],
      },
    },
    defaultVariants: {
      intent: 'information',
    },
  },
);

type AlertCloseButtonProps = VariantProps<typeof alertCloseButton> &
  QwikIntrinsicElements['button'];

export const AlertCloseButton = component$(
  ({ intent, ...rest }: AlertCloseButtonProps) => {
    return (
      <div class="ml-auto pl-3">
        <div class="-mx-1.5 -my-1.5">
          <button
            type="button"
            {...rest}
            class={alertCloseButton({ intent, class: rest.class as string })}
          >
            <span class="sr-only">Dismiss</span>
            <XMark class="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  },
);
