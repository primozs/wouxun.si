import { config } from '~/config';
import { Directus } from '@directus/sdk';
export type { ManyItems, FileItem, QueryMany } from '@directus/sdk';

export const directus = new Directus(config.DIRECTUS_API_URL);

export const imageKeys = {
  '1900-x-540-jpg': '1900-x-540-jpg',
  '1900-x-540-webp': '1900-x-540-webp',
  '1280-x-720-jpg': '1280-x-720-jpg',
  '1280-x-720-webp': '1280-x-720-webp',
  '1080-x-720-jpg': '1080-x-720-jpg',
  '1080-x-720-webp': '1080-x-720-webp',
  '1080-x-1080-jpg': '1080-x-1080-jpg',
  '1080-x-1080-webp': '1080-x-1080-webp',
  '800-x-800-webp': '800-x-800-webp',
  '800-x-800-jpg': '800-x-800-jpg',
  '320-x-180-jpg': '320-x-180-jpg',
  '320-x-180-webp': '320-x-180-webp',
  '770-x-510-jpg': '770-x-510-jpg',
  '770-x-510-webp': '770-x-510-webp',
  '1200-x-300-jpg': '1200-x-300-jpg',
  '1200-x-300-webp': '1200-x-300-webp',
  '600-x-150-jpg': '600-x-150-jpg',
  '600-x-150-webp': '600-x-150-webp',
} as const;

export const imageKeysData = {
  '1900-x-540-jpg': { width: 1900, height: 540, format: 'jpg' },
  '1900-x-540-webp': { width: 1900, height: 540, format: 'webp' },
  '1280-x-720-jpg': { width: 1280, height: 720, format: 'jpg' },
  '1280-x-720-webp': { width: 1280, height: 720, format: 'webp' },
  '1080-x-720-jpg': { width: 1080, height: 720, format: 'jpg' },
  '1080-x-720-webp': { width: 1080, height: 720, format: 'webp' },
  '1080-x-1080-jpg': { width: 1080, height: 1080, format: 'jpg' },
  '1080-x-1080-webp': { width: 1080, height: 1080, format: 'webp' },
  '800-x-800-webp': { width: 800, height: 800, format: 'webp' },
  '800-x-800-jpg': { width: 800, height: 800, format: 'jpg' },
  '320-x-180-jpg': { width: 320, height: 180, format: 'jpg' },
  '320-x-180-webp': { width: 320, height: 180, format: 'webp' },
  '770-x-510-jpg': { width: 770, height: 510, format: 'jpg' },
  '770-x-510-webp': { width: 770, height: 510, format: 'webp' },
  '1200-x-300-jpg': { width: 1200, height: 300, format: 'jpg' },
  '1200-x-300-webp': { width: 1200, height: 300, format: 'webp' },
  '600-x-150-jpg': { width: 600, height: 150, format: 'jpg' },
  '600-x-150-webp': { width: 600, height: 150, format: 'webp' },
} as const;

export const getFileUrl = (id: string, query: Record<string, any> = {}) => {
  const params = new URLSearchParams({ ...query });
  const url = new URL(`/assets/${id}`, config.DIRECTUS_API_URL);
  url.search = params.toString();
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
