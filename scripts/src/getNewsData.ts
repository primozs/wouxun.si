import axios from "axios";
import { NodeHtmlMarkdown } from "node-html-markdown";
import slugify from "slugify";

export type Node = {
  title: string;
  id: string;
  field_nc_news_content: string;
  field_nc_news_main_image: { src: string; alt: string };
  slug: string;
  date: string;
  date_updated: string;
};

export type InData = {
  nodes: { node: Node }[];
};

export type Data = {
  id: string;
  title: string;
  image: string;
  body: string;
  slug: string;
  date: string;
};

const formatNode = (node: Node): Data => {
  return {
    id: node.id,
    title: node.title,
    image: node.field_nc_news_main_image
      ? node.field_nc_news_main_image.src
      : "",

    body: NodeHtmlMarkdown.translate(node.field_nc_news_content).trim(),
    slug: slugify(node.title).toLocaleLowerCase(),
    date: node.date?.replace("UTC", "T") + ".000Z",
  };
};

export const getNewsData = async (): Promise<Data[]> => {
  const res = await axios.get<InData>("https://wouxun.si/news-export");
  return res.data.nodes.map((item) => {
    return formatNode(item.node);
  });
};
