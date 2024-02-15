// https://docs.medusajs.com/js-client/overview
// https://github.com/sindresorhus/ky
import Medusa from '@medusajs/medusa-js';
import { config } from '~/config';
import ky from 'ky';
import type { RequestEvent, RequestEventAction } from '@builder.io/qwik-city';

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

export const SESSION_COOKIE_KEY = 'connect.sid';

export const getSrvSessionHeaders = (
  req: RequestEventAction | RequestEvent,
  extra?: Record<string, string>,
) => {
  const sessionId = req.cookie.get(SESSION_COOKIE_KEY)?.value ?? '';
  const headers: Record<string, string> = {
    Cookie: `connect.sid=${sessionId}`,
    ...extra,
  };
  return headers;
};
