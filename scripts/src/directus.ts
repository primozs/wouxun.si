import { Directus } from '@directus/sdk';

export type DirectusClient = ReturnType<typeof getClient>;

const config = {
  HOST: process.env.DIRECTUS_HOST ?? '',
  USER: process.env.DIRECTUS_USER ?? '',
  PASS: process.env.DIRECTUS_PASS ?? '',
};

export const getClient = () => {
  const directus = new Directus(config.HOST);
  return directus;
};

export const getAuthClient = async () => {
  const directus = new Directus(config.HOST);

  await directus.auth.login({
    email: config.USER,
    password: config.PASS,
  });

  return directus;
};
