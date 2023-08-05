import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { cleanTitle } from '~/routes/product/productUtil';
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
              <Link
                prefetch={true}
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
                scroll={false}
              >
                {cleanTitle(item.title)}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
});
