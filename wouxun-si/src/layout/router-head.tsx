import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';
import { config } from '~/config';

export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  const descContent = head.meta.find(
    (item) => item.name === 'description',
  )?.content;

  const descriptionArr: string[] = [];
  if (descContent) descriptionArr.push(descContent);
  descriptionArr.push(config.META_DESCRIPTION);

  const description = descriptionArr.join(' ');
  const titleMsg = `${config.META_TITLE} | ${head.title}`;

  return (
    <>
      <title>{titleMsg}</title>
      {description && <meta name="description" content={description} />}

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link
        rel="preload"
        href="/fonts/inter/Inter-Regular.woff2?v=3.19"
        as="font"
        crossOrigin="anonymous"
      ></link>
      <link
        rel="preload"
        href="/fonts/inter/Inter-Medium.woff2?v=3.19"
        as="font"
        crossOrigin="anonymous"
      ></link>
      <link
        rel="preload"
        href="/fonts/inter/Inter-SemiBold.woff2?v=3.19"
        as="font"
        crossOrigin="anonymous"
      ></link>

      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="color-scheme" content="dark light" />
      <link rel="shortcut icon" href="/icons/favicon.ico" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      />
      <meta name="application-name" content={config.META_TITLE} />
      <meta name="theme-color" content="#ffffff" />
      <meta name="color-scheme" content="dark light" />
      <meta name="msapplication-TileColor" content="#2b5797" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/apple-touch-icon.png"
      />
      <link
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content={config.META_TITLE} />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
