import { config } from '~/config';
import { createDirectus, rest } from '@directus/sdk';
import type { DirectusSchema } from './schema';

export const getDirectusClient = () => {
  const client = createDirectus<DirectusSchema>(config.DIRECTUS_API_URL).with(
    rest(),
  );
  return client;
};

export const getFileUrl = (id: string, query: Record<string, any> = {}) => {
  const params = new URLSearchParams({ ...query });
  const url = new URL(`/assets/${id}`, config.DIRECTUS_API_URL);
  url.search = params.toString();
  return url.toString();
};

export const getImageUrl = (id: string) => {
  const url = new URL(`assets/${id}`, config.DIRECTUS_API_URL);
  url.searchParams.set('fit', 'cover');
  url.searchParams.set('quality', '80');
  url.searchParams.set('format', 'auto');
  return url.toString();
};

export function abortAsync<T = unknown>(
  signal: AbortSignal,
  fn: () => Promise<T>,
) {
  if (signal?.aborted) {
    return Promise.reject(new DOMException('Aborted', 'AbortError'));
  }
  return new Promise((resolve, reject) => {
    const abortHandler = () => {
      reject(new DOMException('Aborted', 'AbortError'));
    };

    fn()
      .then((res) => {
        resolve(res);
      })
      .catch(reject)
      .finally(() => {
        signal?.removeEventListener('abort', abortHandler);
      });

    signal?.addEventListener('abort', abortHandler);
  });
}
