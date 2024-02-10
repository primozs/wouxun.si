import { component$ } from '@builder.io/qwik';

import { Image } from '@unpic/qwik';
import { getImageUrl } from '~/services/directus';
import type { ProductListIem } from '~/services/products/getDirectusProductData';
import { cleanTitle } from './cleanTitle';

type ProductCardProps = {
  product: ProductListIem;
  index: number;
};

export const ProductCard = component$<ProductCardProps>(
  ({ product, index }) => {
    return (
      <a href={`/product/${product.handle}`}>
        <article
          class="`
        w-full overflow-hidden rounded-2xl         
        group/card 
        shadow-card-hover-light dark:shadow-card-hover-dark
      `"
        >
          <Thumbnail
            thumbnail={product.thumbnail}
            alt={product.title}
            index={index}
          />
          <Info product={product} />
        </article>
      </a>
    );
  },
);

type ThumbnailProps = {
  thumbnail: string | null | undefined;
  alt: string | undefined;
  index: number;
};

const Thumbnail = component$(
  ({ thumbnail, alt, index = 0 }: ThumbnailProps) => {
    return (
      <div
        class="`
        w-full relative overflow-hidden
        aspect-[16/9] sm:aspect-[3/2] lg:aspect-[3/2]
      `"
      >
        <div
          class="`
          absolute inset-0 rounded-t-2xl flex opacity-0 
          group-focus-within:card:opacity-100
          md:group-hover/card:opacity-100
          bg-overlay-light dark:bg-overlay-dark
          z-10 items-center justify-center transition-all
          text-white
        `"
        >
          <p>Ogled produkta</p>
        </div>
        {thumbnail && (
          <div
            class="`
            absolute inset-0
            md:group-hover/card:blur-[2px]
            md:group-hover/card:scale-105
            transition-transform ease-linear duration-300
          `"
          >
            <Image
              priority={true}
              layout="constrained"
              alt={alt}
              width={770}
              height={510}
              cdn="directus"
              src={getImageUrl(thumbnail)}
              {...(index === 0 && {
                priority: true,
                fetchPriority: 'high',
              })}
              {...(index !== 0 && {
                loading: 'lazy',
              })}
              class="imageerr rounded-2xl aspect-[16/9] sm:aspect-[3/2] lg:aspect-[3/2]"
            />
          </div>
        )}
      </div>
    );
  },
);

type InfoProps = {
  product: ProductListIem;
};

const Info = component$(({ product }: InfoProps) => {
  return (
    <div class="p-6 max-w-xl min-h-[150px] flex flex-col gap-y-3">
      <div class="flex flex-col gap-y-2">
        <h2
          class="`
            text-lg font-semibold leading-6 
            text-neutral-800 dark:text-secondary-200
            group-hover:text-neutral-600 dark:group-hover:text-neutral-400
            line-clamp-1 text-ellipsis
          `"
        >
          {cleanTitle(product.title)}
        </h2>
        <p
          class="`
            text-base leading-6 text-ellipsis line-clamp-2            
            text-neutral-600 dark:text-secondary-400            
          `"
        >
          {product.description}
        </p>
      </div>
    </div>
  );
});
