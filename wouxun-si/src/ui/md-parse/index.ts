// @ts-ignore
import insane from 'insane';
import MarkdownIt from 'markdown-it';

export const mdParse = (content: string | undefined | null) => {
  if (!content) return '';

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: false,
  }).disable(['code']);

  const parsed = md.render(
    // eslint-disable-next-line
    content.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, ''),
  );

  const clean = insane(parsed, {
    allowedTags: insane.defaults.allowedTags.concat(['img']),
    allowedAttributes: {
      ...insane.defaults.allowedAttributes,
      ul: ['class'],
      li: ['class'],
      strong: ['class'],
      div: ['class'],
      img: insane.defaults.allowedAttributes['img'].concat('class'),
    },
  });

  return clean;
};
