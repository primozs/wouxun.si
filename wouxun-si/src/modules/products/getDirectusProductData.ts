import { type Query, readItems } from '@directus/sdk';
import { getDirectusClient } from '~/modules/directus';
import { handleError } from '~/modules/logger';
import type {
  DirectusSchema,
  Product,
  ProductCategory,
  ProductTag,
} from '../directus/schema';
import { A, O, D, pipe } from '@mobily/ts-belt';

export type ProductDetail = Awaited<ReturnType<typeof getProductByHandle>>;

export const getProductByHandle = async (
  handle: string | undefined,
  locale = 'en',
) => {
  try {
    if (!handle) return null;
    const directus = getDirectusClient();
    const result = await directus.request(
      readItems<DirectusSchema, 'Product', Query<DirectusSchema, Product>>(
        'Product',
        {
          limit: 2,
          // @ts-ignore
          fields: [
            '*',
            // @ts-ignore
            'media.directus_files_id',
            // @ts-ignore
            'translations.*',
            // @ts-ignore
            'variants.*',
            // @ts-ignore
            'tags.ProductTag_id.translations.*',
            // @ts-ignore
            'categories.ProductCategory_id.translations.*',
          ],
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
            // @ts-ignore
            tags: {
              ProductTag_id: {
                translations: {
                  _filter: {
                    languages_code: {
                      _eq: locale,
                    },
                  },
                },
              },
            },
            // @ts-ignore
            categories: {
              ProductCategory_id: {
                translations: {
                  _filter: {
                    languages_code: {
                      _eq: locale,
                    },
                  },
                },
              },
            },
          },
        },
      ),
    );

    const product = O.fromNullable(A.head(result));
    const translations = O.flatMap(product, D.get('translations'));
    const translation = O.flatMap(translations, A.head);
    const media = pipe(
      product,
      O.flatMap(D.get('media')),
      O.flatMap(A.map((item) => item.directus_files_id)),
      O.getWithDefault([] as readonly string[]),
    );

    const tags = pipe(
      product,
      O.flatMap(D.get('tags')),
      O.flatMap(
        A.map((item) => {
          const t = item.ProductTag_id as unknown as ProductTag;
          const translation = O.flatMap(
            O.flatMap(t, D.get('translations')),
            A.head,
          );
          const tag = O.flatMap(
            translation,
            D.selectKeys(['value', 'ProductTag_id']),
          );
          if (!tag) return undefined;

          return {
            id: tag.ProductTag_id,
            value: tag.value,
          };
        }),
      ),
    );

    const categories = pipe(
      product,
      O.flatMap(D.get('categories')),
      O.flatMap(
        A.map((item) => {
          const c = item.ProductCategory_id as unknown as ProductCategory;
          const translation = O.flatMap(
            O.flatMap(c, D.get('translations')),
            A.head,
          );
          const category = O.flatMap(
            translation,
            D.selectKeys(['name', 'ProductCategory_id']),
          );
          if (!category) return undefined;
          return {
            id: category.ProductCategory_id,
            value: category.name,
          };
        }),
      ),
    );

    const productDic = pipe(
      O.flatMap(product, D.selectKeys(['id', 'medusa_id', 'thumbnail'])),
      D.set('media', media),
      D.set('tags', O.getWithDefault(tags, [])),
      D.set('categories', O.getWithDefault(categories, [])),
    );

    // console.log(JSON.stringify(productDic, null, 2));

    const translationDic = O.flatMap(
      translation,
      D.selectKeys(['title', 'subtitle', 'material', 'handle', 'description']),
    );

    const transformed = D.merge(productDic, translationDic);
    return transformed;
  } catch (error: any) {
    handleError(error, 'Get product by handle');
    return null;
  }
};

export type ProductListIem = Awaited<ReturnType<typeof getProductList>>[0];

export const getProductList = async (locale = 'en') => {
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

  const transformed = A.map(result, (item) => {
    item.translations;
    const translation = A.head(item.translations);
    const productDic = D.selectKeys(item, ['id', 'medusa_id', 'thumbnail']);
    const translationDic = O.flatMap(
      translation,
      D.selectKeys(['title', 'subtitle', 'material', 'handle', 'description']),
    );

    return D.merge(productDic, translationDic);
  });

  return transformed;
};

export const getProductsIds = async (locale = 'en') => {
  const directus = getDirectusClient();

  const result = await directus.request(
    readItems('Product', {
      // @ts-ignore
      fields: ['id', 'medusa_id', 'translations.handle'],
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

  const transformed = A.map(result, (item) => {
    const productDic = D.selectKeys(item, ['id', 'medusa_id']);

    const translationDic = O.flatMap(
      A.head(item.translations),
      D.selectKeys(['handle']),
    );
    return D.merge(productDic, translationDic);
  });

  return transformed;
};
