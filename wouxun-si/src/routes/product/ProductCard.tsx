import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { type ProductItem } from '~/services/products/getDirectusProductData';
import { cleanTitle, getProductShortDesc } from '~/routes/product/productUtil';
import { Image } from '@unpic/qwik';
import { getImageUrl } from '~/config';

type ProductCardProps = {
  data: ProductItem;
  index: number;
};

export const ProductCard = component$<ProductCardProps>(({ data, index }) => {
  const imageSrc = getImageUrl(data.thumbnail ?? '');
  return (
    <Link href={`/product/${data.handle}`}>
      <article class="flex flex-col items-start justify-between rounded-2xl ring-1 ring-inset ring-neutral-900/10 p-3">
        <div class="relative w-full">
          <Image
            priority={true}
            layout="constrained"
            alt={data.title}
            width={770}
            height={510}
            cdn="directus"
            src={imageSrc}
            {...(index < 1 && {
              priority: true,
              fetchPriority: 'high',
            })}
            class="imageerr aspect-[16/9] rounded-2xl sm:aspect-[3/2] lg:aspect-[3/2]"
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
