import { getNewsData, Data } from "./getNewsData";
import { getAuthClient, DirectusClient } from "./directus";
import type { FileItem } from "@directus/sdk";

const createItem = async (directus: DirectusClient, item: Data) => {
  const dateCreated = new Date(item.date).toISOString();

  let imageId: string | undefined;
  if (item.image) {
    const imgImpRes = (await directus.files.import({
      url: item.image,
      data: {
        folder: "ad0f0964-dc46-4fe6-9964-7d4227ea20cb", // blog-images folder
        drupal_id: item.image,
      },
    })) as FileItem;
    imageId = imgImpRes.id;
  }

  const data = {
    status: "published",
    date_created: dateCreated,
    drupal_id: item.id,
    ...(imageId && { image: imageId }),
    title: item.title,
    slug: item.slug,
    body: item.body,
  };

  const result = await directus.items("wouxun_news").createOne(data);
  return result;
};

const updateItem = async (directus: DirectusClient, id: string, data: any) => {
  const result = await directus.items("wouxun_news").updateOne(id, {
    ...data,
  });
  return result;
};

const main = async () => {
  try {
    const data = await getNewsData();
    const directus = await getAuthClient();

    for (const dataItem of data) {
      const createResult = await createItem(directus, dataItem);
      const dateCreated = new Date(dataItem.date).toISOString();
      // @ts-ignore
      const itemId = createResult.id;
      await updateItem(directus, itemId, {
        date_created: dateCreated,
      });
      console.log("Done: ", itemId);
    }
    console.log("Done all");
  } catch (error: any) {
    console.log(error?.message);
  }
};

main();
