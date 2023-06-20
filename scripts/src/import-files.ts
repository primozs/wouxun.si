import { getFilesData, Data } from "./getFilesData";
import { getAuthClient, DirectusClient } from "./directus";
import type { FileItem } from "@directus/sdk";

const createItem = async (directus: DirectusClient, item: Data) => {
  let FileId: string | undefined;
  if (item.File) {
    const impRes = (await directus.files.import({
      url: item.File,
      data: {
        folder: "17e9d9cb-a9f0-4c35-a717-27c2d2a6b0c2", // wouxun-files folder
        drupal_id: item.id,
      },
    })) as FileItem;
    FileId = impRes.id;
  }

  const data = {
    title: item.title,
    Category: item.Category,
    drupal_id: item.id,
    File: FileId,
  };

  const result = await directus.items("wouxun_file").createOne(data);
  return result;
};

const main = async () => {
  try {
    const data = await getFilesData();
    const directus = await getAuthClient();

    for (const dataItem of data) {
      // console.log("-----");
      // console.log(dataItem);
      const createResult = await createItem(directus, dataItem);
    }
    console.log("Done all");
  } catch (error: any) {
    console.log(error?.message);
  }
};

main();
