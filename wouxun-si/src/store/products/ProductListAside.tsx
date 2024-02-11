import { component$ } from '@builder.io/qwik';
import { cleanTitle } from './cleanTitle';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getUserLocaleSrv } from '~/store/common/srvGetLocale';
import { getProductList } from '~/services/products/getDirectusProductData';

// eslint-disable-next-line qwik/loader-location
export const useProducts = routeLoader$(async (event) => {
  const locale = getUserLocaleSrv(event);
  const res = await getProductList(locale);
  return res;
});

export const ProductListAside = component$(() => {
  const products = useProducts();

  return (
    <>
      <h2>Ponudba</h2>
      <ul class="!list-none !list-inside !pl-0">
        {products.value.map((item) => {
          return (
            <li key={item.id} class="text-base font-medium leading-6">
              <a
                href={`/product/${item.handle}`}
                onClick$={() => {
                  const mediaQuery = window.matchMedia('(max-width: 768px)');
                  if (mediaQuery.matches) {
                    const e = document.getElementById('product-image');
                    e?.scrollIntoView({
                      block: 'start',
                      behavior: 'smooth',
                      inline: 'start',
                    });
                  }
                }}
              >
                {cleanTitle(item.title)}
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
});
