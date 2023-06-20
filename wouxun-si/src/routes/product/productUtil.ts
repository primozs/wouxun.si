export const getProductShortDesc = (desc: string) => {
  let res = desc.slice(0, 150) + '...';
  const includesSubtitle = res.indexOf('##');
  if (includesSubtitle > 0) res = res.slice(0, includesSubtitle);
  return res;
};

export const cleanTitle = (title: string | undefined) => {
  if (!title) return '';
  return title.replace('WOUXUN ', '');
};
