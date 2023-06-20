import { directus } from '~/services/directus';
import { handleError } from '~/services/logger';

export type FileItem = {
  id: string;
  title: string;
  File: string;
  Category: string;
};

export const getFilesList = async (): Promise<FileItem[]> => {
  try {
    const result = (await directus.items('wouxun_file').readByQuery({
      fields: ['id', 'title', 'File', 'Category'],
    })) as { data: FileItem[] };

    const transformed = result.data ?? [];
    return transformed;
  } catch (error: any) {
    handleError(error);
    return [];
  }
};
