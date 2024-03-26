import { component$, useStyles$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { RouterHead } from './router-head';

// import './global.css';
import globalStyles from './global.css?inline';
import inlineStyle from './inline.css?inline';

import { NotificationProvider } from './ui/notification/notificationsState';
import { ThemeScript } from './modules/theme/ThemeScript';
import { LocaleProvider } from './modules/locale/LocaleProvider';

export default component$(() => {
  useStyles$(inlineStyle);
  useStyles$(globalStyles);

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <ServiceWorkerRegister />
        <ThemeScript />
      </head>
      <body>
        <LocaleProvider>
          <NotificationProvider>
            <RouterOutlet />
          </NotificationProvider>
        </LocaleProvider>
      </body>
    </QwikCityProvider>
  );
});
