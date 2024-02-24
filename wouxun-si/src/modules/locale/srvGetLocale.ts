import type { RequestEvent, RequestEventLoader } from '@builder.io/qwik-city';
import { config } from '~/config';

const getUserLocaleSrv = (event: RequestEvent | RequestEventLoader) => {
  // const acceptLanguage = event.headers.get('accept-language');
  // const [languages] = acceptLanguage?.split(';') || ['?', '?'];
  // const [preferredLanguage] = languages?.split(',') ?? '';

  const cookieLocaleObj = event.cookie.get('locale') || undefined;
  const cookieLocale = cookieLocaleObj?.value;

  const userLocale = cookieLocale || config.DEFAULT_LOCALE;
  return userLocale;
};

export const srvSetLocale = (event: RequestEvent | RequestEventLoader) => {
  const userLocale = getUserLocaleSrv(event);

  // set entry.ssr locale
  event.locale(userLocale);

  return userLocale;
};
