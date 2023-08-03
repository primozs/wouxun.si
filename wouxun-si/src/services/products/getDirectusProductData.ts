import { type Query, readItems } from '@directus/sdk';
import { getDirectusClient } from '~/services/directus';
import { handleError } from '~/services/logger';
import type { DirectusSchema, Product } from '../directus/schema';

export type ProductItem = {
  id: string;
  drupal_id: string;
  website: string;
  medusa_id: string;
  status: string;
  title: string;
  subtitle: string;
  handle: string;
  material: string;
  description: string;
  thumbnail: string | null;
  media: string[];
  date_created: string | Date;
  date_updated: string | Date;
};

export const getProductByHandle = async (handle: string, locale = 'en') => {
  try {
    const directus = getDirectusClient();
    const result = await directus.request(
      readItems<DirectusSchema, 'Product', Query<DirectusSchema, Product>>(
        'Product',
        {
          limit: 2,
          // @ts-ignore
          fields: ['*', 'media.directus_files_id', 'translations.*'],
          filter: {
            translations: {
              // @ts-ignore
              handle: {
                _eq: handle,
              },
            },
          },
          deep: {
            // @ts-ignore
            translations: {
              _filter: {
                languages_code: {
                  _eq: locale,
                },
              },
            },
          },
        },
      ),
    );

    if (result.length === 0) return null;

    const item = result[0];
    const { translations, media, ...rest } = item;
    const translation = translations[0];
    const {
      title,
      subtitle,
      material,
      handle: tHandle,
      description,
    } = translation;

    const transformed: ProductItem = {
      ...rest,
      media: media.map((item) => item.directus_files_id),
      title,
      subtitle,
      material,
      handle: tHandle,
      description,
    };

    return transformed;
  } catch (error: any) {
    handleError(error, 'Get product by handle');
    return null;
  }
};

export const getProductList = async (locale = 'en'): Promise<ProductItem[]> => {
  const directus = getDirectusClient();

  const result = await directus.request(
    readItems('Product', {
      // @ts-ignore
      fields: ['*', 'media.directus_files_id', 'translations.*'],
      deep: {
        // @ts-ignore
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

  const transformed: ProductItem[] = (result ?? []).map(
    ({ translations, media, ...rest }) => {
      const translation = translations[0];

      const { title, subtitle, material, handle, description } = translation;
      return {
        ...rest,
        media: media.map((item) => item.directus_files_id),
        title,
        subtitle,
        material,
        handle,
        description,
      };
    },
  );

  return transformed;
};

type ProductIds = {
  id: string;
  drupal_id: string;
  medusa_id: string;
  handle: string;
};

export const getProductsIds = async (locale = 'en'): Promise<ProductIds[]> => {
  const directus = getDirectusClient();

  const result = await directus.request(
    readItems('Product', {
      // @ts-ignore
      fields: ['*', 'translations.handle'],
      deep: {
        // @ts-ignore
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

  const transformed = result ?? [];
  return transformed.map((item) => {
    return {
      id: item.id,
      drupal_id: item.drupal_id,
      medusa_id: item.medusa_id,
      handle: item.translations[0].handle,
    };
  });
};
