import axios from "axios";

export type Node = {
  title: string;
  id: string;
  field_nc_file_category_ref: string;
  field_nc_file: string;
};

export type InData = {
  nodes: { node: Node }[];
};

export type Data = {
  id: string;
  title: string;
  Category: string;
  File: string;
};

const formatNode = (node: Node): Data => {
  return {
    id: node.id,
    title: node.title,
    Category: node.field_nc_file_category_ref,
    File: node.field_nc_file,
  };
};

export const getFilesData = async (): Promise<Data[]> => {
  const res = await axios.get<InData>("https://wouxun.si/files-export");
  return res.data.nodes.map((item) => {
    return formatNode(item.node);
  });
};
