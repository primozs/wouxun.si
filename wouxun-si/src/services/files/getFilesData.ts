import { readItems } from '@directus/sdk';
import { getDirectusClient } from '~/services/directus';
import type { wouxun_file } from '~/services/directus/schema';
import { handleError } from '~/services/logger';

export const getFilesList = async (): Promise<wouxun_file[]> => {
  try {
    const directus = getDirectusClient();
    const result = await directus.request(
      readItems('wouxun_file', {
        fields: ['*'],
      }),
    );

    return result ?? [];
  } catch (error: any) {
    handleError(error);
    return [];
  }
};
