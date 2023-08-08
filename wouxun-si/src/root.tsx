import { component$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { RouterHead } from './layout/router-head';

import './global.css';
import { AppGlobalProvider } from '~/ui/common/appGlobalState';
import { NotificationProvider } from './ui/notification/notificationsState';

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="sl">
        <AppGlobalProvider>
          <NotificationProvider>
            <RouterOutlet />
            <ServiceWorkerRegister />
          </NotificationProvider>
        </AppGlobalProvider>
      </body>
    </QwikCityProvider>
  );
});
