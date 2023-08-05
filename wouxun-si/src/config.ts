import z from 'zod';

const envVariables = z.object({
  DEV: z.boolean(),
  PROD: z.boolean(),

  VITE_PUBLIC_META_TITLE: z.string(),
  VITE_PUBLIC_META_DESCRIPTION: z.string(),

  VITE_PUBLIC_DIRECTUS_API_URL: z.string(),
  VITE_PUBLIC_MEDUSA_API_URL: z.string(),
});

const ENV_VARIABLES = envVariables.parse(import.meta.env);

export const config = {
  META_TITLE: ENV_VARIABLES.VITE_PUBLIC_META_TITLE,
  META_DESCRIPTION: ENV_VARIABLES.VITE_PUBLIC_META_DESCRIPTION,
  DIRECTUS_API_URL: ENV_VARIABLES.VITE_PUBLIC_DIRECTUS_API_URL,
  MEDUSA_API_URL: ENV_VARIABLES.VITE_PUBLIC_MEDUSA_API_URL,

  DEV: ENV_VARIABLES.DEV,
  PROD: ENV_VARIABLES.PROD,
};

export const getImageUrl = (id: string) => {
  const url = new URL(`assets/${id}`, config.DIRECTUS_API_URL);
  url.searchParams.set('fit', 'cover');
  url.searchParams.set('quality', '80');
  url.searchParams.set('format', 'auto');
  return url.toString();
};
