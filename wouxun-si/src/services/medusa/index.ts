import Medusa from '@medusajs/medusa-js';
import { config } from '~/config';

export const getMedusaClient = () => {
  const medusa = new Medusa({
    baseUrl: config.MEDUSA_API_URL,
    maxRetries: 3,
  });
  return medusa;
};
