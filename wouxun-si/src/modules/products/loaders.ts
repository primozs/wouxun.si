import { routeLoader$ } from '@builder.io/qwik-city';
import { getProductByHandle, getProductList } from './getDirectusProductData';
import { useGetRegionLoader } from '~/routes/plugin@store';
import { getProductsListWithSort } from './getProductsData';
import type {
  ProductCategory,
  ProductCollection,
} from '@medusajs/client-types';
import { handleError } from '~/modules/logger';
import { getMedusaClient, getSrvSessionHeaders } from '~/modules/medusa';
import type { ProductPreviewType } from '../medusa/types';
import type { StoreGetProductsParams } from '@medusajs/medusa';
import { config } from '~/config';
import { imgProxyUrl } from '../common/imageUrl';
import type { PricedProduct } from '@medusajs/client-types';

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

const getPricedProductByHandle = async (
  handle: string | undefined,
  region_id: string,
  headers: Record<string, string>,
) => {
  if (!handle) return null;

  const client = getMedusaClient();
  const product = await client.products
    .list({
      handle,
      // expand: 'variants,variants.prices',
      // region_id: region_id ?? undefined,
    })
    .then((res) => res.products[0]);

  if (!product) {
    return null;
  }

  const pricedProduct = await client.products
    .retrieve(`${product.id}?region_id=${region_id}`, headers)
    .then(({ product }) => product)
    .catch((err) => {
      handleError(err);
      return null;
    });

  return pricedProduct as unknown as PricedProduct;
};

const defaultValues = {
  productDirectus: null,
  productMedusa: null,
  thumbnail: null,
};

// eslint-disable-next-line qwik/loader-location
export const useGetProductByHandle = routeLoader$(async (event) => {
  const locale = event.locale();
  const region = await event.resolveValue(useGetRegionLoader);

  if (!region) return defaultValues;

  try {
    const productDirectusP = getProductByHandle(event.params.handle, locale);
    const productMedusaP = getPricedProductByHandle(
      event.params.handle,
      region.id,
      getSrvSessionHeaders(event),
    );
    const [productDirectus, productMedusa] = await Promise.all([
      productDirectusP,
      productMedusaP,
    ]);

    const thumbnail = productMedusa?.thumbnail
      ? imgProxyUrl({
          height: 600,
          width: 1200,
          url: productMedusa?.thumbnail,
          resizeType: 'fill',
        })
      : '';

    return { productDirectus, productMedusa, thumbnail };
  } catch (error: any) {
    event.fail(500, {
      errorMessage: error?.message,
    });
    return defaultValues;
  }
});

// eslint-disable-next-line qwik/loader-location
export const useRelatedProductsLoader = routeLoader$(async (event) => {
  const PRODUCT_LIMIT = 5;
  const sortBy = event.url.searchParams.get('sortBy') ?? undefined;
  const page = event.url.searchParams.get('page');
  const pageNumber = page ? parseInt(page) : 1;

  const queryParams: StoreGetProductsParams = {
    limit: PRODUCT_LIMIT,
  };

  const productP = event.resolveValue(useGetProductByHandle);
  const regionP = event.resolveValue(useGetRegionLoader);

  const region = await regionP;
  const productRes = await productP;
  const product = productRes.productMedusa;
  if (!region || !product)
    return {
      products: [] as ProductPreviewType[],
      page: 0,
      count: 0,
      totalPages: 0,
    };

  // https://docs.medusajs.com/api/store#products_getproducts
  if (region?.id) {
    queryParams.region_id = region.id;
  }

  if (region?.currency_code) {
    queryParams.currency_code = region.currency_code;
  }

  if (product.collection_id) {
    queryParams.collection_id = [product.collection_id];
  }

  if (product.tags) {
    queryParams.tags = product.tags.map((t) => t.id);
  }

  queryParams.is_giftcard = false;

  queryParams.sales_channel_id = [config.MEDUSA_SALES_CHANNEL_ID];

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
