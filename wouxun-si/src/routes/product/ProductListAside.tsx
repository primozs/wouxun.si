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
              <Link href={`/product/${item.handle}`}>
                {cleanTitle(item.title)}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
});
