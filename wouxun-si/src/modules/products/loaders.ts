import { routeLoader$ } from '@builder.io/qwik-city';
import { getProductList } from './getDirectusProductData';
import { useGetRegionLoader } from '~/routes/plugin@store';
import { getProductsListWithSort } from './getProductsData';
import type {
  ProductCategory,
  ProductCollection,
} from '@medusajs/client-types';
import { handleError } from '~/modules/logger';
import { getMedusaClient, getSrvSessionHeaders } from '~/modules/medusa';
import type { ProductPreviewType } from '../medusa/types';
import { StoreGetProductsParams } from '@medusajs/medusa';
import { config } from '~/config';

export type ProductListProducts = ReturnType<typeof useProductsLoader>;

// eslint-disable-next-line qwik/loader-location
export const useProductsLoader = routeLoader$(async (event) => {
  const locale = event.locale();
  const res = await getProductList(locale);
  return res;
});

// eslint-disable-next-line qwik/loader-location
export const useCollectionByHandle = routeLoader$(async (event) => {
  const client = getMedusaClient();
  const handle = event.params.handle;

  if (!handle) {
    event.status(404);
    return null;
  }

  const collection = await client.collections
    .list({ handle: [handle] }, getSrvSessionHeaders(event))
    .then(({ collections }) => collections[0])
    .catch((err) => {
      handleError(err);
      return null;
    });

  if (!collection) event.status(404);
  return collection as ProductCollection | null;
});

// eslint-disable-next-line qwik/loader-location
export const useCategoryByHandle = routeLoader$(async (event) => {
  const client = getMedusaClient();

  const handle = event.params.handle;

  if (!handle) {
    event.status(404);
    return null;
  }

  const category = await client.productCategories
    .list(
      {
        handle: handle,
      },
      getSrvSessionHeaders(event),
    )
    .then(({ product_categories: { [0]: category } }) => category)
    .catch((err) => {
      handleError(err);
      return null;
    });
  if (!category) event.status(404);
  return category as ProductCategory | null;
});

// eslint-disable-next-line qwik/loader-location
export const usePaginatedProductsLoader = routeLoader$(async (event) => {
  const PRODUCT_LIMIT = 8;
  const sortBy = event.url.searchParams.get('sortBy') ?? undefined;
  const page = event.url.searchParams.get('page');
  const pageNumber = page ? parseInt(page) : 1;

  const queryParams: StoreGetProductsParams = {
    limit: PRODUCT_LIMIT,
  };

  const regionP = event.resolveValue(useGetRegionLoader);
  const collectionP = event
    .resolveValue(useCollectionByHandle)
    .catch(() => null);
  const categoryP = event.resolveValue(useCategoryByHandle).catch(() => null);

  const region = await regionP;
  if (!region)
    return {
      products: [] as ProductPreviewType[],
      page: 0,
      count: 0,
      totalPages: 0,
    };

  const collection = await collectionP;

  if (collection) {
    queryParams['collection_id'] = [collection.id];
  }

  const category = await categoryP;
  if (category) {
    queryParams['category_id'] = [category.id];
  }

  queryParams['sales_channel_id'] = [config.MEDUSA_SALES_CHANNEL_ID];

  // if (productsIds) {
  //   queryParams['id'] = productsIds;
  // }

  const {
    response: { products, count },
  } = await getProductsListWithSort({
    page: pageNumber,
    queryParams,
    sortBy,
    region: region,
  });

  const totalPages = Math.ceil(count / PRODUCT_LIMIT);

  return {
    products,
    page: pageNumber,
    count,
    totalPages,
  };
});
