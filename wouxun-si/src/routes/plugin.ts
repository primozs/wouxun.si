import { routeLoader$ } from '@builder.io/qwik-city';

export const useLocaleLoader = routeLoader$((event) => {
  const locale = event.locale();
  return locale;
});
