import { component$ } from '@builder.io/qwik';
import {
  type DocumentHead,
  routeLoader$,
  type StaticGenerateHandler,
} from '@builder.io/qwik-city';
import { config } from '~/config';
import {
  getProductByHandle,
  getProductsIds,
} from '~/services/products/getDirectusProductData';
import { getUserLocaleSrv } from '~/store/common/srvGetLocale';
import { MainImage } from '~/store/products/ProductDetail';
import { Gallery } from '~/store/products/ProductDetail';
import { Details } from '~/store/products/ProductDetail';

export const useGetProductByHandle = routeLoader$(async (event) => {
  const locale = getUserLocaleSrv(event);
  const product = await getProductByHandle(event.params.handle, locale);
  return product;
});

export default component$(() => {
  const product = useGetProductByHandle();

  return (
    <section>
      <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div id="product-image" class="lg:order-2">
          <MainImage
            image={product.value?.thumbnail ?? ''}
            productTitle={product.value?.title ?? ''}
          />
          <Gallery
            images={product.value?.media ?? ([] as readonly string[])}
            productTitle={product.value?.title ?? ''}
          />
        </div>
        <div class="w-full lg:order-1">
          <Details product={product} />
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const data = resolveValue(useGetProductByHandle);
  return {
    title: `${data?.title}`,
    meta: [
      {
        name: 'description',
        content: (data?.description?.slice(0, 140) ?? '') + '...',
      },
      {
        name: 'id',
        content: data?.id,
      },
    ],
  };
};

export const onStaticGenerate: StaticGenerateHandler = async () => {
  // if multilang this should return all languages
  const items = await getProductsIds(config.DEFAULT_LOCALE);

  return {
    params: items.map((item) => {
      return { handle: item.handle };
    }),
  };
};
