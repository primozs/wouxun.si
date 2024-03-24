import { component$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { useGetRegionLoader } from '~/routes/plugin@store';
import { getProduct } from '~/modules/medusa/getProducts';
import { getProductByHandle } from '~/modules/products/getDirectusProductData';
import { MainImage } from '~/modules/products/ProductDetail';
import { Gallery } from '~/modules/products/ProductDetail';
import { ProductDetailView } from '~/modules/products/ProductDetail';
import { imgProxyUrl } from '~/modules/common/imageUrl';

export const useGetProductByHandle = routeLoader$(async (event) => {
  const locale = event.locale();
  const region = await event.resolveValue(useGetRegionLoader);

  try {
    const productDirectusP = getProductByHandle(event.params.handle, locale);
    const productMedusaP = getProduct(event.params.handle, region?.id);
    const [productDirectus, productMedusa] = await Promise.all([
      productDirectusP,
      productMedusaP,
    ]);

    const thumbnail = productMedusa?.thumbnail
      ? imgProxyUrl({
          height: 600,
          width: 1200,
          url: productMedusa?.thumbnail,
          resizeType: 'fill',
        })
      : '';

    return { productDirectus, productMedusa, thumbnail };
  } catch (error: any) {
    event.fail(500, {
      errorMessage: error?.message,
    });
    return { productDirectus: null, productMedusa: null, thumbnail: null };
  }
});

export default component$(() => {
  const res = useGetProductByHandle();

  return (
    <section>
      <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div id="product-image" class="lg:order-2">
          <MainImage
            image={res.value?.productDirectus?.thumbnail ?? ''}
            productTitle={res.value?.productDirectus?.title ?? ''}
          />
          <Gallery
            images={
              res.value?.productDirectus?.media ?? ([] as readonly string[])
            }
            productTitle={res.value?.productDirectus?.title ?? ''}
          />
        </div>
        <div class="w-full lg:order-1">
          <ProductDetailView product={res} />
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useGetProductByHandle);

  return {
    title: `${data?.productDirectus?.title}`,
    meta: [
      {
        name: 'description',
        content:
          (data?.productDirectus?.description?.slice(0, 140) ?? '') + '...',
      },
      {
        name: 'id',
        content: data?.productDirectus?.id,
      },
      {
        property: 'og:image',
        content: data.thumbnail ?? '',
      },
    ],
  };
};
