import { noDivisionCurrencies } from './constants';
import { isEmpty } from './isEmpty';

import type { Region } from '@medusajs/client-types';

export type RegionInfo = Pick<
  Region,
  'currency_code' | 'tax_code' | 'tax_rate'
>;

type FormatAmountParams = {
  amount: number;
  region: RegionInfo | undefined | null;
  includeTaxes?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  locale?: string;
};

/**
 * Takes an amount and a region, and converts the amount to a localized decimal format
 */
export const formatAmount = ({
  amount,
  region,
  includeTaxes = true,
  ...rest
}: FormatAmountParams) => {
  const taxAwareAmount = computeAmount({
    amount,
    region,
    includeTaxes,
  });

  return convertToLocale({
    amount: taxAwareAmount,
    currency_code: region?.currency_code ?? 'eur',
    ...rest,
  });
};

type ComputeAmountParams = {
  amount: number;
  region: RegionInfo | undefined | null;
  includeTaxes?: boolean;
};

/**
 * Takes an amount, a region, and returns the amount as a decimal including or excluding taxes
 */
export const computeAmount = ({
  amount,
  region,
  includeTaxes = true,
}: ComputeAmountParams) => {
  const toDecimal = convertToDecimal(amount, region);

  const taxRate = includeTaxes ? getTaxRate(region) : 0;

  const amountWithTaxes = toDecimal * (1 + taxRate);

  return amountWithTaxes;
};

const convertToDecimal = (
  amount: number,
  region: RegionInfo | undefined | null,
) => {
  const divisor = noDivisionCurrencies.includes(
    region?.currency_code?.toLowerCase() ?? '',
  )
    ? 1
    : 100;

  return Math.floor(amount) / divisor;
};

const getTaxRate = (region?: RegionInfo | null) => {
  return region && !isEmpty(region) ? region?.tax_rate / 100 : 0;
};

const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = 'en-US',
}: ConvertToLocaleParams) => {
  return currency_code && !isEmpty(currency_code)
    ? new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency_code,
        minimumFractionDigits,
        maximumFractionDigits,
      }).format(amount)
    : amount.toString();
};

type ConvertToLocaleParams = {
  amount: number;
  currency_code: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  locale?: string;
};
