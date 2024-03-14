import { component$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { RouterHead } from './router-head';

import './global.css';
import { NotificationProvider } from './ui/notification/notificationsState';
import { ThemeScript } from './modules/theme/ThemeScript';
import { useCartDialogProvider } from './modules/cart/CartDialog';
import { LocaleProvider } from './modules/locale/LocaleProvider';

export default component$(() => {
  useCartDialogProvider();
  return (
    <QwikCityProvider>
      <head>
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
