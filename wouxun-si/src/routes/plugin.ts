import { routeAction$, routeLoader$, z, zod$ } from '@builder.io/qwik-city';

export const useLocaleLoader = routeLoader$((event) => {
  const locale = event.locale();
  return locale;
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
