import { component$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { RouterHead } from './router-head';

import './global.css';
import { NotificationProvider } from './ui/notification/notificationsState';
import { UiConfirmProvider } from './ui/UiConfirm';
import { ThemeScript } from './modules/theme/ThemeScript';
import { useCartDialogProvider } from './modules/cart/CartDialog';
import { LocaleProvider } from './modules/locale/LocaleProvider';

export default component$(() => {
  useCartDialogProvider();
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
            <UiConfirmProvider>
              <RouterOutlet />
            </UiConfirmProvider>
          </NotificationProvider>
        </LocaleProvider>
      </body>
    </QwikCityProvider>
  );
});
