import { component$ } from '@builder.io/qwik';
import { useDocumentHead, useLocation } from '@builder.io/qwik-city';
import { config } from '~/config';
import { useWebsiteContent } from './routes/layout';
import { Social } from './social-head';

export const RouterHead = component$(() => {
  const website = useWebsiteContent();
  const head = useDocumentHead();
  const loc = useLocation();

  const descContent = head.meta.find(
    (item) => item.name === 'description',
  )?.content;

  const descriptionArr: string[] = [];
  if (descContent) descriptionArr.push(descContent);
  descriptionArr.push(website.value?.description ?? '');

  const description = descriptionArr.join(' ');
  const titleMsg = `${website.value?.title ?? ''} | ${head.title}`;

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{titleMsg}</title>
      {/* <link rel="preconnect" href={config.DIRECTUS_API_URL} /> */}
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
      {/* <link rel="dns-prefetch" href={config.DIRECTUS_API_URL} /> */}
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={loc.url.href} />
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
      <meta name="application-name" content={website.value?.title ?? ''} />
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
        // @ts-ignore
        color="#5bbad5"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-title"
        content={website.value?.title ?? ''}
      />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      <Social
        title={titleMsg}
        description={description}
        href={loc.url.href}
        hasMetaImage={!!head.meta.find((item) => item.property === 'og:image')}
      />

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}
      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}
      {head.styles.map((s) => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
      {head.scripts.map((s) => (
        <script key={s.key} {...s.props} dangerouslySetInnerHTML={s.script} />
      ))}
    </>
  );
});
