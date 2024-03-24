import { routeLoader$ } from '@builder.io/qwik-city';
import { readSingleton } from '@directus/sdk';
import { getDirectusClient } from '~/modules/directus';
import { handleError } from '~/modules/logger';

// eslint-disable-next-line qwik/loader-location
export const useWebsiteContent = routeLoader$(async (event) => {
  const locale = event.locale();
  try {
    const directus = getDirectusClient();
    const result = await directus.request(
      readSingleton('wouxun_website', {
        fields: ['id', 'translations.*'],
        // @ts-ignore
        deep: {
          translations: {
            _filter: {
              languages_code: {
                _eq: locale,
              },
            },
          },
        },
      }),
    );

    const item = result ? result.translations[0] ?? null : null;
    return item;
  } catch (error: any) {
    handleError(error, 'Get website content');
    return null;
  }
});
