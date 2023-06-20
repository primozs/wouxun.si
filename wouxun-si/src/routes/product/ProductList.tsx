import { component$ } from '@builder.io/qwik';
import { ProductCard } from '~/routes/product/ProductCard';
import { useProducts } from '~/routes/layout';

export const ProductList = component$(() => {
  const products = useProducts();
  return (
    <div
      class="`
      mx-auto my-5
      grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8
      sm:mx-0 sm:max-w-none sm:grid-cols-2
      lg:mx-0 lg:max-w-none lg:grid-cols-3
      `"
    >
      {products.value.map((data, index) => {
        return <ProductCard key={data.id} data={data} index={index} />;
      })}
    </div>
  );
});
