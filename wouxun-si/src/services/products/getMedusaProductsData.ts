import { getMedusaClient } from '~/services/medusa';

// const res = await getMedusaProductByHandle('kg-uv8d+');
export const getMedusaProductByHandle = async (handle: string) => {
  const medusa = getMedusaClient();
  const { products, count, offset, limit } = await medusa.products.list({
    handle,
  });
  return { products, count, offset, limit };
};

// https://docs.medusajs.com/api/store#tag/Products/operation/GetProducts
// const res = await getMedusaProductList({
//   // sales_channel_id:
//   // collection_id: ['pcol_01H2XYE7B2BFJZQRDG39PZYKG0'],
//   // tags: ['ptag_01H2ZRPYT4JQ1R85CDE6HPA3N1'],
//   // q: 'KG-UV66',
//   // category_id: ['pcat_01H2XV6RFMA07V6DWSB9XJEDYV'],
//   // include_category_children: true
//   // offset: 2,
//   // limit: 2,
// });
export const getMedusaProductList = async (query: Record<string, any> = {}) => {
  const medusa = getMedusaClient();
  const { products, count, offset, limit } = await medusa.products.list(query);
  return { products, count, offset, limit };
};

// const res = await getMedusaProduct('prod_01H2V31QVHF2Q034CF140J2334');
export const getMedusaProduct = async (id: string) => {
  const medusa = getMedusaClient();
  const { product } = await medusa.products.retrieve(id);
  return product;
};

// https://docs.medusajs.com/api/store#tag/Product-Categories
// const categories = await getProductCategories({
//   // handle: 'radio-stations',
//   // parent_category_id: 'pcat_01H2XV29Q75RDDDPR2Z7GAMZ6F',
//   // handle: 'si',
//   // include_descendants_tree: false,
//   // parent_category_id: 'pcat_01H2XV1XN8V9B1D01CQW8KFT17',
//   // offset: 0,
//   // limit: 2,
// });
export const getProductCategories = async (query: Record<string, any> = {}) => {
  const medusa = getMedusaClient();
  const { product_categories, count, offset, limit } =
    await medusa.productCategories.list(query);
  return { product_categories, count, offset, limit };
};
