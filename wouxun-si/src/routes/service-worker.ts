/*
 * WHAT IS THIS FILE?
 *
 * The service-worker.ts file is used to have state of the art prefetching.
 * https://qwik.builder.io/qwikcity/prefetching/overview/
 *
 * Qwik uses a service worker to speed up your site and reduce latency, ie, not used in the traditional way of offline.
 * You can also use this file to add more functionality that runs in the service worker.
 */
import { setupServiceWorker } from '@builder.io/qwik-city/service-worker';
import {
  imageCache,
  // staticResourceCache,
  pageCache,
  offlineFallback,
} from 'workbox-recipes';
// import { CacheableResponsePlugin } from 'workbox-cacheable-response/CacheableResponsePlugin.js';
import type { RouteMatchCallbackOptions } from 'workbox-core';

const matchImageCallback = ({ request }: RouteMatchCallbackOptions) => {
  return request.destination === 'image';
};

imageCache({
  matchCallback: matchImageCallback,
  cacheName: 'static-image-assets',
  maxAgeSeconds: 30 * 24 * 60 * 60,
  maxEntries: 64,
});

const matchFontCallback = ({ request }: RouteMatchCallbackOptions) => {
  return request.destination === 'font';
};
imageCache({
  matchCallback: matchFontCallback,
  cacheName: 'static-font-assets',
  maxAgeSeconds: 60 * 60 * 24 * 365,
  maxEntries: 5,
});

// const matchStaticCallback = ({ request }: RouteMatchCallbackOptions) => {
//   return request.destination === 'style' || request.destination === 'worker';
// };
// staticResourceCache({
//   matchCallback: matchStaticCallback,
//   warmCache: ['/'],
//   plugins: [
//     new CacheableResponsePlugin({
//       statuses: [0, 200],
//     }),
//   ],
// });

pageCache({
  warmCache: ['/'],
});

offlineFallback({
  pageFallback: '/',
});

setupServiceWorker();

addEventListener('install', () => self.skipWaiting());

addEventListener('activate', () => self.clients.claim());

declare const self: ServiceWorkerGlobalScope;
