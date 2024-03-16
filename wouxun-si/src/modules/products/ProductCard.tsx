import { component$ } from '@builder.io/qwik';
import { cleanTitle } from './cleanTitle';
import { Thumbnail } from './Thumbnail';
import { UiText } from '~/ui/UiText';
import { Link } from '@builder.io/qwik-city';
import type { ProductPreviewType } from '../medusa/types';

type ProductCardProps = {
  handle: string | null;
  thumbnail: string | null;
  title: string;
  index: number;
  price?: ProductPreviewType['price'];
  directus?: boolean;
};

export const ProductCard = component$<ProductCardProps>(
  ({ handle, thumbnail, title, price, index, directus = true }) => {
    return (
      <Link href={`/product/${handle}`}>
        <article>
          <Thumbnail
            thumbnail={thumbnail}
            alt={title}
            index={index}
            size="full"
            overlayBlur
            directus={directus}
          />

          <div class="flex mt-4 justify-between">
            <UiText color="light">
              {/* {product.title} */}
              {cleanTitle(title)}
            </UiText>

            {price && (
              <>
                {price.price_type === 'sale' && (
                  <UiText class="line-through" color="light">
                    {price.original_price}
                  </UiText>
                )}
                <UiText
                  color={price.price_type === 'sale' ? 'primary' : 'light'}
                  class="font-semibold"
                >
                  {price.calculated_price}
                </UiText>
              </>
            )}
          </div>
        </article>
      </Link>
    );
  },
);
