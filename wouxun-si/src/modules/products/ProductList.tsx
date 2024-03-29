import { component$ } from '@builder.io/qwik';
import { ProductCard } from './ProductCard';
import type { ProductListProducts } from './loaders';

type Props = {
  products: ProductListProducts;
};

export const ProductList = component$<Props>(({ products }) => {
  return (
    <div class="my-5 grid grid-cols-2 w-full md:grid-cols-3 lg:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-10">
      {products.value.map((product, index) => {
        return (
          <ProductCard
            key={product.id}
            handle={product.handle}
            thumbnail={product.thumbnail}
            title={product.title}
            index={index}
          />
        );
      })}
    </div>
  );
});
