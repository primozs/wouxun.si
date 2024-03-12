import { component$ } from '@builder.io/qwik';
import type { ProductListIem } from '~/modules/products/getDirectusProductData';
import { cleanTitle } from './cleanTitle';
import { Thumbnail } from './Thumbnail';
import { UiText } from '~/ui/UiText';
import { Link } from '@builder.io/qwik-city';

type ProductCardProps = {
  product: ProductListIem;
  index: number;
};

export const ProductCard = component$<ProductCardProps>(
  ({ product, index }) => {
    return (
      <Link href={`/product/${product.handle}`}>
        <article>
          <Thumbnail
            thumbnail={product.thumbnail}
            alt={product.title}
            index={index}
            size="full"
            overlayBlur
          />

          <div class="flex mt-4 justify-between">
            <UiText color="light">
              {/* {product.title} */}
              {cleanTitle(product.title)}
            </UiText>
          </div>
        </article>
      </Link>
    );
  },
);
