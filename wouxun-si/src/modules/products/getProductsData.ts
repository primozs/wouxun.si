import type { ProductPreviewType } from '../medusa/types';
import { sortProducts } from '../common/sortProducts';
import { getMedusaClient } from '../medusa';
import { transformProductPreview } from '../common/transformProductView';
import type { StoreGetProductsParams } from '@medusajs/medusa';
import type { Region } from '@medusajs/client-types';

export const getProductsList = async function (
  {
    pageParam = 0,
    queryParams,
    region,
  }: {
    pageParam?: number;
    queryParams?: StoreGetProductsParams;
    region: Region;
  },
  customHeaders?: Record<string, any> | undefined,
): Promise<{
  response: { products: ProductPreviewType[]; count: number };
  nextPage: number | null;
  queryParams?: StoreGetProductsParams;
}> {
  const client = getMedusaClient();
  const limit = queryParams?.limit || 12;

  const { products, count } = await client.products
    .list(
      {
        limit,
        offset: pageParam,
        region_id: region.id,
        ...queryParams,
      },
      customHeaders,
    )
    .then((res) => res)
    .catch((err) => {
      throw err;
    });

  const transformedProducts = products.map((product) => {
    return transformProductPreview(product, region!);
  });

  const nextPage = count > pageParam + 1 ? pageParam + 1 : null;

  return {
    response: { products: transformedProducts, count },
    nextPage,
    queryParams,
  };
};

export const getProductsListWithSort = async function getProductsListWithSort(
  {
    page = 0,
    queryParams,
    sortBy = 'price_asc',
    region,
  }: {
    page?: number;
    queryParams?: StoreGetProductsParams;
    sortBy?: string | null;
    region: Region;
  },
  customHeaders?: Record<string, any> | undefined,
): Promise<{
  response: { products: ProductPreviewType[]; count: number };
  nextPage: number | null;
  queryParams?: StoreGetProductsParams;
}> {
  const limit = queryParams?.limit || 12;

  const {
    response: { products, count },
  } = await getProductsList(
    {
      pageParam: 0,
      queryParams: {
        ...queryParams,
        limit: 100,
      },
      region,
    },
    customHeaders,
  );

  const sortedProducts = sortProducts(products, sortBy);

  const pageParam = (page - 1) * limit;

  const nextPage = count > pageParam + limit ? pageParam + limit : null;

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit);

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  };
};
