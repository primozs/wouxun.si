import dotenv from 'dotenv';
dotenv.config();

import Medusa from '@medusajs/medusa-js';
import axios from 'axios';
import FormData from 'form-data';
import fsp from 'node:fs/promises';
import fs from 'node:fs';
import path from 'node:path';

const config = {
  HOST: process.env.MEDUSA_HOST ?? '',
  ADMIN: process.env.MEDUSA_ADMIN ?? '',
  ADMINPASS: process.env.MEDUSA_ADMINPASS ?? '',
};

export const medusaClient = new Medusa({
  baseUrl: config.HOST ?? 'http://localhost:9000',
  maxRetries: 3,
});

let admin: any;
export const authenticate = async () => {
  try {
    const { user } = await medusaClient.admin.auth.createSession({
      email: config.ADMIN,
      password: config.ADMINPASS,
    });

    admin = user;
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getAuthHeaders = () => {
  const headers: Record<string, string> = {
    Authorization: `Bearer ${admin?.api_token}`,
  };
  return headers;
};

export const medusaImportFile = async (url: string) => {
  // this func exists because client upload is not working
  // await medusaClient.admin.uploads.create(file);
  //
  const filename = path.basename(url);
  const filePath = filename;

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
    });
    await fsp.writeFile(filePath, response.data);

    const form = new FormData();
    form.append('files', fs.createReadStream(filePath));

    const { data } = await axios.post(`${config.HOST}/admin/uploads`, form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${admin?.api_token}`,
      },
    });

    const { uploads } = data;
    return (uploads && uploads[0] ? uploads[0] : null) as {
      url: string;
      key: string;
    };
  } catch (error: any) {
    console.error(error?.message);
    return null;
  } finally {
    await fsp.rm(filePath);
  }
};
