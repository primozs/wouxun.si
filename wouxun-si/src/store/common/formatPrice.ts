type FormatPriceOptions = {
  currency: string;
  locale: string;
};

export const formatPrice = (
  price: number | null,
  { currency = 'usd', locale = 'en-US' }: FormatPriceOptions,
) => {
  const formatter = Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });

  if (!price) {
    return formatter.format(0);
  }

  return formatter.format(price / 100);
};
