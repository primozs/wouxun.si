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
// import { CartProvider } from '~/ui/cart/cartState';

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body lang="sl">
        <AppGlobalProvider>
          {/* <CartProvider> */}
          <NotificationProvider>
            <RouterOutlet />
          </NotificationProvider>
          {/* </CartProvider> */}
        </AppGlobalProvider>
      </body>
    </QwikCityProvider>
  );
});
