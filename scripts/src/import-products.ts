import dotenv from 'dotenv';
dotenv.config();

import { getProductsData, Data } from './getProductsData';
import { getAuthClient, DirectusClient } from './directus';
import type { FileItem } from '@directus/sdk';
import {
  medusaClient,
  authenticate,
  getAuthHeaders,
  medusaImportFile,
} from './medusa';

const createItem = async (
  directus: DirectusClient,
  item: Data,
  medusa_id?: string,
) => {
  const dateCreated = new Date(item.date).toISOString();
  const dateUpdated = new Date(item.date_updated).toISOString();

  let thumbnailId: string | undefined;
  if (item.thumbnail) {
    const imgImpRes = (await directus.files.import({
      url: item.thumbnail,
      data: {
        folder: '36b0982a-ce85-4ed0-8f28-382b6651b4ca', // product folder
        drupal_id: item.thumbnail,
      },
    })) as FileItem;
    thumbnailId = imgImpRes.id;
  }

  let media: string[] = [];
  for (const imgUrl of item.media) {
    const imgImpRes = (await directus.files.import({
      url: imgUrl,
      data: {
        folder: '36b0982a-ce85-4ed0-8f28-382b6651b4ca', // product folder
        drupal_id: imgUrl,
      },
    })) as FileItem;
    media.push(imgImpRes.id);
  }

  const data = {
    medusa_id,
    status: 'published',
    date_created: dateCreated,
    date_updated: dateUpdated,
    drupal_id: item.id,
    website: 'wouxun.si',
    ...(thumbnailId && { thumbnail: thumbnailId }),
    media: media.map((id) => {
      return {
        directus_files_id: id,
      };
    }),
    translations: [
      {
        title: item.title,
        handle: item.handle,
        description: item.description,
        languages_code: 'sl',
      },
    ],
  };

  const result = await directus.items('Product').createOne(data);
  return result;
};

const updateItem = async (directus: DirectusClient, id: string, item: Data) => {
  const dateCreated = new Date(item.date).toISOString();
  const dateUpdated = new Date(item.date_updated).toISOString();

  const result = await directus.items('Product').updateOne(id, {
    date_created: dateCreated,
    date_updated: dateUpdated,
    translations: [
      {
        title: item.title,
        handle: item.handle,
        description: item.description,
        languages_code: 'sl',
      },
    ],
  });

  return result;
};

const medusaProductExists = async (handle: string, drupal_id: string) => {
  const existsRes = await medusaClient.admin.products.list(
    {
      handle: handle,
    },
    getAuthHeaders(),
  );
  const products = existsRes.products as {
    id: string;
    metadata: Record<string, any>;
  }[];
  const exists = products.find((item) => item.metadata.drupal_id === drupal_id);

  return exists;
};

export const medusaCreateProduct = async (data: Data) => {
  const importThumbnail = await medusaImportFile(data.thumbnail);

  const mediaP: Promise<{
    url: string;
    key: string;
  } | null>[] = [];

  for (const item of data.media) {
    const imageP = medusaImportFile(item);
    mediaP.push(imageP);
  }
  const mediaImages =
    (await Promise.all(mediaP).catch((err) =>
      console.error('mediaImage' + err?.message),
    )) ?? [];

  const productData = {
    title: data.title,
    handle: data.handle,
    description: data.description,
    thumbnail: importThumbnail?.url,
    images: mediaImages.map((item) => item?.url),
    metadata: {
      drupal_id: data.id,
      website: 'wouxun.si',
    },
  };

  const { product } = await medusaClient.admin.products.create(
    productData,
    getAuthHeaders(),
  );

  return product;
};

const medusaUpdateProduct = async (medusa_id: string, data: Data) => {
  const productData = {
    title: data.title,
    handle: data.handle,
    description: data.description,
    status: 'published',
    collection_id: 'pcol_01H2XYE7B2BFJZQRDG39PZYKG0',
    sales_channels: [
      { id: 'sc_01GPXX6G7REBXNNX8T0YVDJC88' },
      { id: 'sc_01GTCDSKJFZD52FFKMB6DFTBF9' },
      { id: 'sc_01H2MP80F7GMG4BXQCW4PA9P9T' },
    ],
    categories: [
      { id: 'pcat_01H2XV1XN8V9B1D01CQW8KFT17' },
      { id: 'pcat_01H2XV29Q75RDDDPR2Z7GAMZ6F' },
      { id: 'pcat_01H2XV5T25WJKKXXYD3S3Q5PQF' },
      { id: 'pcat_01H2XV6RFMA07V6DWSB9XJEDYV' },
    ],
    metadata: {
      drupal_id: data.id,
      website: 'wouxun.si',
    },
  };

  const { product } = await medusaClient.admin.products.update(
    medusa_id,
    productData,
    getAuthHeaders(),
  );

  return product;
};

const directusProductExists = async (
  directus: DirectusClient,
  medusa_id: string | undefined,
) => {
  const exists = await directus.items('Product').readByQuery({
    limit: 1,
    fields: ['id', 'drupal_id', 'website', 'medusa_id'],
    filter: {
      medusa_id: {
        _eq: medusa_id,
      },
    },
  });
  const found = (exists.data ? exists.data[0] : null) as { id: string } | null;
  return found;
};

const directusCreateOrUpdate = async (
  directus: DirectusClient,
  medusa_id: string,
  data: Data,
) => {
  const dProductExists = await directusProductExists(directus, medusa_id);
  if (dProductExists) {
    const updateResult = await updateItem(directus, dProductExists.id, data);
    return updateResult;
  } else {
    const createResult = await createItem(directus, data, medusa_id);
    return createResult;
  }
};

const main = async () => {
  try {
    await authenticate();
    const data = await getProductsData();
    const directus = await getAuthClient();

    for (const dataItem of data) {
      const exists = await medusaProductExists(dataItem.handle, dataItem.id);

      if (!exists) {
        const product = await medusaCreateProduct(dataItem);
        await directusCreateOrUpdate(directus, product.id, dataItem);
      } else {
        const product = await medusaUpdateProduct(exists.id, dataItem);
        await directusCreateOrUpdate(directus, product.id, dataItem);
      }

      console.log('Done: ', dataItem.id);
    }
    console.log('Done all');
  } catch (error: any) {
    console.log(error?.message);
  }
};

main();
