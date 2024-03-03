import { routeAction$, routeLoader$, z, zod$ } from '@builder.io/qwik-city';
import { selectLocaleSrv } from '~/modules/locale/i18n-utils';

export const useLocaleLoader = routeLoader$(async (event) => {
  // const locale = event.locale();
  const userLocale = selectLocaleSrv(event);
  event.locale(userLocale);

  return userLocale;
});

export const useChangeLocaleAction = routeAction$(
  async (data, event) => {
    const locale = data.locale;

    event.cookie.set('locale', locale, {
      expires: new Date(Date.now() + 60 * 60 * 1000 * 356),
      path: '/',
      secure: true,
      sameSite: 'Strict',
      httpOnly: true,
    });
    event.locale(locale);

    return {
      status: 'success',
      data: { locale },
    };
  },
  zod$({
    locale: z.string(),
  }),
);

// runs first before useLocaleLoader but after
// routeAcction it does not run
// export const onGet: RequestHandler = async (event) => {
//   const userLocale = selectLocaleSrv(event);
//   event.locale(userLocale);
// };
