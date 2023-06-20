import { component$ } from '@builder.io/qwik';
import { DImage } from '~/services/directus/DImage';
import { Link } from '@builder.io/qwik-city';
import { type ProductItem } from '~/services/products/getDirectusProductData';
import { cleanTitle, getProductShortDesc } from '~/routes/product/productUtil';

type ProductCardProps = {
  data: ProductItem;
  index: number;
};

export const ProductCard = component$<ProductCardProps>(({ data, index }) => {
  return (
    <Link href={`/product/${data.handle}`}>
      <article class="flex flex-col items-start justify-between rounded-2xl ring-1 ring-inset ring-neutral-900/10 p-3">
        <div class="relative w-full">
          <DImage
            dId={data.thumbnail}
            dType="image/webp"
            keys={['770-x-510-jpg', '770-x-510-webp']}
            sizes="
              (max-width: 640px) 95vw,       
              (max-width: 1024px) 770px, 25vw"
            alt={data.title}
            {...(index < 6 && { fetchPriority: 'high' })}
            class="aspect-[16/9] rounded-2xl sm:aspect-[3/2] lg:aspect-[3/2]"
          />
          {/* <div class="absolute inset-0 rounded-2xl ring-1 ring-inset ring-neutral-900/10"></div> */}
        </div>
        <div class="max-w-xl">
          <div class="group relative">
            <h2 class="mt-3 text-lg font-semibold leading-6 text-neutral-800 group-hover:text-neutral-600 dark:text-secondary-200 dark:group-hover:text-neutral-400">
              {cleanTitle(data.title)}
            </h2>
            <p class="mt-3 line-clamp-3 text-base leading-6 text-neutral-600 dark:text-secondary-400">
              {getProductShortDesc(data.description)}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
});
