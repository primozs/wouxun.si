export const cleanTitle = (title: string | undefined) => {
  if (!title) return '';
  return title.replace('WOUXUN ', '');
};
