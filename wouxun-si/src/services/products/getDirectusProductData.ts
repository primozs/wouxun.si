import { directus } from '~/services/directus';
import { handleError } from '~/services/logger';

export type ProductItemData = {
  id: string;
  drupal_id: string;
  website: string;
  medusa_id: string;
  status: string;

  translations: {
    title: string;
    subtitle: string;
    handle: string;
    material: string;
    description: string;
  }[];

  thumbnail: string | null;
  media: { directus_files_id: string }[];
  date_created: string;
  date_updated: string;
};

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
  date_created: string;
  date_updated: string;
};

export const getProductByHandle = async (handle: string, locale = 'en') => {
  try {
    const result = (await directus.items('Product').readByQuery({
      limit: 1,
      fields: [
        'id',
        'drupal_id',
        'medusa_id',
        'status',
        'date_created',
        'date_updated',
        'website',
        'thumbnail',
        'media.directus_files_id',
        'translations.title',
        'translations.subtitle',
        'translations.handle',
        'translations.material',
        'translations.description',
      ],
      filter: {
        translations: {
          handle: {
            _eq: handle,
          },
        },
      },
      deep: {
        translations: {
          _filter: {
            languages_code: {
              _eq: locale,
            },
          },
        },
      },
    })) as { data: ProductItemData[] };

    if (result.data.length === 0) return null;

    const item = result.data[0];
    const { translations, media, ...rest } = item;
    const translation = translations[0];
    const {
      title,
      subtitle,
      material,
      handle: tHandle,
      description,
    } = translation;

    const transformed = {
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
  const result = (await directus.items('Product').readByQuery({
    fields: [
      'id',
      'drupal_id',
      'medusa_id',
      'status',
      'date_created',
      'date_updated',
      'website',
      'thumbnail',
      'media.directus_files_id',
      'translations.title',
      'translations.subtitle',
      'translations.handle',
      'translations.material',
      'translations.description',
    ],
    deep: {
      translations: {
        _filter: {
          languages_code: {
            _eq: locale,
          },
        },
      },
    },
  })) as { data: ProductItemData[] };

  const transformed = (result.data ?? []).map(
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

type ProductIdsData = {
  id: string;
  drupal_id: string;
  medusa_id: string;
  translations: {
    handle: string;
  }[];
};

type ProductIds = {
  id: string;
  drupal_id: string;
  medusa_id: string;
  handle: string;
};

export const getProductsIds = async (locale = 'en'): Promise<ProductIds[]> => {
  const result = (await directus.items('Product').readByQuery({
    fields: ['id', 'drupal_id', 'medusa_id', 'translations.handle'],
    deep: {
      translations: {
        _filter: {
          languages_code: {
            _eq: locale,
          },
        },
      },
    },
  })) as { data: ProductIdsData[] };

  const transformed = result.data ?? [];
  return transformed.map((item) => {
    return {
      id: item.id,
      drupal_id: item.drupal_id,
      medusa_id: item.medusa_id,
      handle: item.translations[0].handle,
    };
  });
};
