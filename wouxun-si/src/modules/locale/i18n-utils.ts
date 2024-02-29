import '@angular/localize/init';
import { loadTranslations } from '@angular/localize';
import { $, getLocale, useOnDocument, withLocale } from '@builder.io/qwik';
import type { RenderOptions } from '@builder.io/qwik/server';
import type { RequestEvent, RequestEventLoader } from '@builder.io/qwik-city';

// You must declare all your locales here
import EN from '../../locales/message.en.json';
import SL from '../../locales/message.sl.json';
import { config } from '~/config';

// Make sure it's obvious when the default locale was selected
const DEFAULT_LOCALE = 'en';

/**
 * This file is left for the developer to customize to get the behavior they want for localization.
 */

/// Declare location where extra types will be stored.
const $localizeFn = $localize as any as {
  TRANSLATIONS: Record<string, any>;
  TRANSLATION_BY_LOCALE: Map<string, Record<string, any>>;
};

/**
 * This solution uses the `@angular/localize` package for translations, however out of the box
 * `$localize` works with a single translation only. This code adds support for multiple locales
 * concurrently. It does this by intercepting the `TRANSLATIONS` property read and returning
 * appropriate translation based on the current locale which is store in the `usEnvDate('local')`.
 */

if (!$localizeFn.TRANSLATION_BY_LOCALE) {
  $localizeFn.TRANSLATION_BY_LOCALE = new Map([['', {}]]);
  Object.defineProperty($localize, 'TRANSLATIONS', {
    get: function () {
      const locale = getLocale(DEFAULT_LOCALE);
      let translations = $localizeFn.TRANSLATION_BY_LOCALE.get(locale);
      if (!translations) {
        $localizeFn.TRANSLATION_BY_LOCALE.set(locale, (translations = {}));
      }
      return translations;
    },
  });
}

/**
 * Function used to load all translations variants.
 */
export function initTranslations() {
  [SL, EN].forEach(({ translations, locale }) => {
    // console.log('init translations: ', locale);
    withLocale(locale, () => loadTranslations(translations));
  });
}

// const validateLocale = (locale: string) => {
//   if ($localizeFn.TRANSLATION_BY_LOCALE.has(locale)) return locale;
//   const match = /^([^-;]+)[-;]/.exec(locale);
//   return (
//     (match && match[1] && $localizeFn.TRANSLATION_BY_LOCALE.has(match[1])) ||
//     undefined
//   );
// };

/**
 * Function used to examine the request and determine the locale to use.
 *
 * This function is meant to be used with `RenderOptions.locale` property
 *
 * @returns The locale to use which will be stored in the `useEnvData('locale')`.
 */
export function extractLang(locale: string | undefined): string {
  return locale && $localizeFn.TRANSLATION_BY_LOCALE.has(locale)
    ? locale
    : DEFAULT_LOCALE;
}

/**
 * Function used to determine the base URL to use for loading the chunks in the browser.
 *
 * The function returns `/build` in dev mode or `/build/<locale>` in prod mode.
 *
 * This function is meant to be used with `RenderOptions.base` property
 *
 * @returns The base URL to use for loading the chunks in the browser.
 */
export function extractBase({ serverData }: RenderOptions): string {
  if (import.meta.env.DEV) {
    return '/build';
  } else {
    return '/build/' + serverData!.locale;
  }
}

export function useI18nDEV() {
  if (import.meta.env.DEV) {
    // During development only, load all translations in memory when the app starts on the client.
    // eslint-disable-next-line
    useOnDocument('qinit', $(initTranslations));
  }
}

// We always need the translations on the server
if (import.meta.env.SSR) {
  initTranslations();
}

export const selectLocaleSrv = (event: RequestEvent | RequestEventLoader) => {
  // const acceptLanguage = event.headers.get('accept-language');
  // const [languages] = acceptLanguage?.split(';') || ['?', '?'];
  // const [preferredLanguage] = languages?.split(',') ?? '';

  const paramLocale = event.params.locale
    ? extractLang(event.params.locale)
    : undefined;

  const cookieLocaleObj = event.cookie.get('locale') || undefined;
  const cookieLocale = cookieLocaleObj?.value;

  const userLocale = paramLocale || cookieLocale || config.DEFAULT_LOCALE;
  return userLocale;
};

export const plural = (
  locale: string,
  num: number | undefined,
  options: {
    zero?: string;
    one?: string;
    two?: string;
    few?: string;
    many?: string;
    other?: string;
  },
): string => {
  if (num === undefined) return '';
  const cardinalRules = new Intl.PluralRules(locale);
  const rule = cardinalRules.select(num);

  const str = options[rule];
  if (!str) return '';
  return str;
};
