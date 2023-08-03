import Medusa from '@medusajs/medusa-js';
import { config } from '~/config';
import ky from 'ky';

export const getMedusaClient = () => {
  const medusa = new Medusa({
    baseUrl: config.MEDUSA_API_URL,
    maxRetries: 3,
  });
  return medusa;
};

export const getMedusaApi = () => {
  const api = ky.create({
    prefixUrl: config.MEDUSA_API_URL,
    retry: 3,
  });
  return api;
};
