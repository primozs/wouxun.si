/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import {
  renderToStream,
  type RenderToStreamOptions,
} from '@builder.io/qwik/server';
import { manifest } from '@qwik-client-manifest';
import Root from './root';
// import { isDev } from '@builder.io/qwik/build';
import { config } from './config';

// if (isDev) {
//   const consoleWarn = console.warn;
//   const SUPPRESSED_WARNINGS = ['Duplicate implementations of "JSXNode" found'];

//   console.warn = function filterWarnings(msg, ...args) {
//     if (
//       !SUPPRESSED_WARNINGS.some(
//         (entry) =>
//           msg.includes(entry) || args.some((arg) => arg.includes(entry)),
//       )
//     )
//       consoleWarn(msg, ...args);
//   };
// }

export default function (opts: RenderToStreamOptions) {
  const lang =
    parseLocaleCookie(
      opts.serverData?.requestHeaders?.cookie,
      config.DEFAULT_LOCALE,
    ) ?? config.DEFAULT_LOCALE;

  return renderToStream(<Root />, {
    manifest,
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang,
      ...opts.containerAttributes,
    },
  });
}

const parseLocaleCookie = (str: string | undefined, def = 'en') => {
  if (!str) return def;
  const map = str
    .split(';')
    .map((v) => v.split('='))
    .reduce(
      (acc, v) => {
        acc[decodeURIComponent(v[0]?.trim() ?? '')] = decodeURIComponent(
          v[1]?.trim() ?? '',
        );
        return acc;
      },
      {} as Record<string, string>,
    );
  return map['locale'];
};
