import { createHmac } from 'node:crypto';
import { config } from '~/config';

const hexDecode = (hex: string) => Buffer.from(hex, 'hex');

const sign = (salt: string, target: string, secret: string) => {
  const hmac = createHmac('sha256', hexDecode(secret));
  hmac.update(hexDecode(salt));
  hmac.update(target);
  return hmac.digest('base64url');
};

// https://docs.imgproxy.net/usage/processing#enlarge
export const imgProxyUrl = ({
  width = 310,
  height = 470,
  url,
  gravity = '/gravity:ce',
  resizeType = 'fill',
}: {
  width: number;
  height: number;
  url: string;
  resizeType?: 'fill' | 'fit' | 'fill-down' | 'force' | 'auto';
  gravity?: string;
}) => {
  const KEY = config.IMAGE_PROXY_KEY;
  const SALT = config.IMAGE_PROXY_SALT;

  const path = `/resize:${resizeType}:${width}:${height}:0${gravity}/plain/${url}`;
  const signature = sign(SALT, path, KEY);
  const result = `/${signature}${path}`;

  const outUrl = `https://imgproxy.stenar.si${result}`;
  return outUrl;
};
