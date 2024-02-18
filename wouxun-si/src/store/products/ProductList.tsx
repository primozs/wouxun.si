import { component$ } from '@builder.io/qwik';
import { ProductCard } from './ProductCard';
import { useProductsLoader } from '~/routes/plugin@store';

export const ProductList = component$(() => {
  const products = useProductsLoader();
  return (
    <div
      class="`
      mx-auto my-5
      grid max-w-2xl grid-cols-1 gap-x-8 gap-y-8
      sm:mx-0 sm:max-w-none sm:grid-cols-1    
      lg:mx-0 lg:max-w-none lg:grid-cols-3
      `"
    >
      {products.value.map((product, index) => {
        return <ProductCard key={product.id} product={product} index={index} />;
      })}
    </div>
  );
});
