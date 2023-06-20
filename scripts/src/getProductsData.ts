import axios from 'axios';
import { NodeHtmlMarkdown } from 'node-html-markdown';
import slugify from 'slugify';

export type Node = {
  id: string;
  title: string;
  description_field: string;
  field_nc_features: string;
  field_nc_technical_features: string;
  field_package_includes: string;
  field_price: string;
  field_nc_news_main_image: { src: string; alt: string };
  field_gallery: { src: string; alt: string }[];
  date: string;
  date_updated: string;
};

export type InData = {
  nodes: { node: Node }[];
};

export type Data = {
  id: string;
  title: string;
  handle: string;
  description: string;
  thumbnail: string;
  media: string[];
  date: string;
  date_updated: string;
  price: string;
};

const formatNode = (node: Node): Data => {
  const desc = NodeHtmlMarkdown.translate(node.description_field).trim();
  const features = NodeHtmlMarkdown.translate(node.field_nc_features).trim();
  const techFeatures = NodeHtmlMarkdown.translate(
    node.field_nc_technical_features,
  ).trim();
  const packageIncludes = NodeHtmlMarkdown.translate(
    node.field_package_includes,
  ).trim();

  // # ${node.title}
  const description = `
${desc}

## Poglavitne funkcije

${features}

## Tehnične specifikacije
${techFeatures}

## Paket vsebuje
${packageIncludes}`;

  // if (node.id === "19") {
  //   console.log(node);
  // }

  return {
    id: node.id,
    title: node.title,
    handle: slugify(node.title).toLocaleLowerCase(),
    description: description,
    thumbnail: node.field_nc_news_main_image
      ? node.field_nc_news_main_image.src
      : '',
    media: node.field_gallery ? node.field_gallery.map((item) => item.src) : [],
    date: node.date?.replace('UTC', 'T') + '.000Z',
    date_updated: node.date_updated?.replace('UTC', 'T') + '.000Z',
    price: node.field_price,
  };
};

export const getProductsData = async (): Promise<Data[]> => {
  const res = await axios.get<InData>('https://wouxun.si/products-export');
  return res.data.nodes.map((item) => {
    return formatNode(item.node);
  });
};
