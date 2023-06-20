import type { QwikIntrinsicElements } from '@builder.io/qwik';
import { component$, Slot } from '@builder.io/qwik';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export type ButtonStyleProps = VariantProps<typeof button>;
export type ButtonProps = QwikIntrinsicElements['button'] & ButtonStyleProps;

export const button = cva(
  [
    'focus-visible:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-1',
    'focus-visible:ring-primary-500 dark:focus-visible:ring-white',
    'tracking-wide',
  ],
  {
    variants: {
      intent: {
        unstyled: [],
        primary: [
          'py-2',
          'px-4',
          'inline-flex',
          'items-center',
          'font-medium',
          'border',
          'rounded-md',
          'shadow-sm',
          'border-transparent',
          'bg-primary-600',
          'hover:bg-primary-700 ',
          'text-white',
          'shadow-sm',
        ],
        red: [
          'py-2',
          'px-4',
          'inline-flex',
          'items-center',
          'font-medium',
          'border',
          'rounded-md',
          'shadow-sm',
          'border-transparent',
          'bg-error-600',
          'hover:bg-error-700 ',
          'text-white',
          'shadow-sm',
        ],
        success: [
          'py-2',
          'px-4',
          'inline-flex',
          'items-center',
          'font-medium',
          'border',
          'rounded-md',
          'shadow-sm',
          'border-transparent',
          'bg-green-600',
          'hover:bg-green-700 ',
          'text-white',
          'shadow-sm',
        ],
        secondary: [
          'py-2',
          'px-4',
          'inline-flex', // flex w-full justify-center
          'items-center',
          'text-primary-800',
          'shadow-sm',
          'rounded-md',
          'bg-primary-100',
          'hover:bg-primary-200',
        ],
        ternary: [
          'py-2',
          'px-4',
          'inline-flex',
          'items-center',
          'border',
          'rounded-md',
          'shadow-sm',
          'border-transparent',
          'bg-secondary-600',
          'hover:bg-secondary-700 dark:hover:bg-secondary-800',
          'text-white',
          'shadow-sm',
        ],
        headerMenu: [
          'py-2 px-3',
          'inline-flex',
          'items-center gap-x-1',
          'rounded-md',
          'hover:text-gray-900 dark:hover:text-white',
          'hover:bg-gray-50 dark:hover:bg-gray-700',
          'text-gray-800 dark:text-gray-300',
        ],
        mobileMenu: [
          'block',
          'rounded-md',
          'py-2 px-4 dark:px-3',
          'text-base font-medium leading-6',
          'hover:bg-gray-100 dark:hover:bg-gray-700',
          'hover:text-gray-800 dark:hover:text-white',
          'text-gray-800 dark:text-gray-300',
        ],
        mobileMenuSub: [
          'block w-full',
          'rounded-md',
          'text-left',
          'py-2 px-4 dark:px-3',
          'text-base font-medium leading-6',
          'hover:bg-gray-100 dark:hover:bg-gray-700',
          'hover:text-gray-800 dark:hover:text-white',
          'text-gray-500 dark:text-gray-400',
        ],
        outline: [
          'py-2',
          'px-4',
          'inline-flex',
          'items-center',
          'border',
          'rounded-md',
          'shadow-sm',
          'border-gray-300 dark:border-gray-100',
          'bg-white dark:bg-transparent',
          'text-gray-700 dark:text-white',
          'hover:bg-gray-50 dark:hover:bg-gray-800',
        ],
        dropDownMenuButton: [
          'group flex w-full items-center rounded-md px-4 sm:px-3 py-4 sm:py-2',
          'text-sm text-gray-800 dark:text-white hover:bg-primary-500 hover:text-white',
        ],
        icon: [
          'p-2',
          'inline-flex items-center justify-center',
          'rounded-md',
          'text-gray-700 dark:text-white',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          'hover:text-gray-500 dark:hover:text-white',
        ],
        iconRounded: [
          'py-1.5 px-1.5',
          'inline-flex',
          'items-center',
          'border',
          'rounded-full',
          'shadow-sm',
          'aspect-square',
          'border-gray-300',
        ],
      },
      fontSize: {
        small: ['text-sm'],
        medium: ['text-base'],
        unstyled: [],
      },
      bold: {
        medium: ['font-medium'],
        semibold: ['font-semibold leading-6'],
        unstyled: [],
      },
      active: {
        headerMenu: ['bg-gray-100 dark:bg-gray-900 dark:text-white'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      bold: 'semibold',
      fontSize: 'small',
    },
  },
);

export const Button = component$<ButtonProps>(
  ({ intent, bold, fontSize, active, ...rest }) => {
    return (
      <button
        {...rest}
        class={{
          [button({
            intent: intent,
            bold: bold,
            fontSize: fontSize,
            active: active,
            class: typeof rest.class === 'string' ? rest.class : null,
          })]: true,
          ...(typeof rest.class === 'object' && { ...rest.class }),
        }}
      >
        <Slot />
      </button>
    );
  },
);
