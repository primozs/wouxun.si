import { component$ } from '@builder.io/qwik';
import { cleanTitle } from './cleanTitle';
import { useProducts } from '~/routes/layout';

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
