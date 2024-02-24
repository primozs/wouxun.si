import { component$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { RouterHead } from './router-head';

import './global.css';
import { AppGlobalProvider } from '~/modules/common/AppGlobalProvider';
import { NotificationProvider } from './ui/notification/notificationsState';
import { UiConfirmProvider } from './ui/UiConfirm';
import { ThemeScript } from './modules/theme/ThemeScript';

export default component$(() => {
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
        <AppGlobalProvider>
          <NotificationProvider>
            <UiConfirmProvider>
              <RouterOutlet />
            </UiConfirmProvider>
          </NotificationProvider>
        </AppGlobalProvider>
      </body>
    </QwikCityProvider>
  );
});
