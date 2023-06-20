import { component$ } from '@builder.io/qwik';
import {
  type DocumentHead,
  routeLoader$,
  type StaticGenerateHandler,
} from '@builder.io/qwik-city';
import {
  getProductByHandle,
  getProductsIds,
} from '~/services/products/getDirectusProductData';
import { mdParse } from '~/ui/md-parse';
import { DImage } from '~/services/directus/DImage';
import { cleanTitle } from '~/routes/product/productUtil';
import { Dialog } from '~/ui/dialog';

export const useGetProductByHandle = routeLoader$(async (event) => {
  const product = await getProductByHandle(event.params.handle, 'sl');
  return product;
});

export default component$(() => {
  const product = useGetProductByHandle();
  return (
    <section>
      <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div class="lg:order-2">
          <Dialog>
            <DImage
              dId={product.value?.thumbnail}
              dType="image/webp"
              keys={[
                '770-x-510-jpg',
                '770-x-510-webp',
                '1080-x-720-jpg',
                '1080-x-720-webp',
              ]}
              sizes="
              (max-width: 640px) 95vw,       
              (max-width: 1024px) 770px, 770px"
              alt={product.value?.title}
              fetchPriority="high"
              class="aspect-[16/9] rounded-2xl sm:aspect-[3/2] lg:aspect-[3/2]"
            />
            <DImage
              q:slot="dialog"
              dId={product.value?.thumbnail}
              dType="image/webp"
              keys={[
                '770-x-510-jpg',
                '770-x-510-webp',
                '1080-x-720-jpg',
                '1080-x-720-webp',
              ]}
              sizes="
              (max-width: 640px) 95vw,       
              (max-width: 1024px) 770px, 770px"
              alt={product.value?.title}
              fetchPriority="high"
              class="aspect-[16/9] rounded-2xl sm:aspect-[3/2] lg:aspect-[3/2]"
            />
          </Dialog>
          <div class="mt-4 grid grid-cols-4 gap-x-4 gap-y-4">
            {product.value?.media.map((img) => {
              return (
                <Dialog key={img}>
                  <DImage
                    dId={img}
                    dType="image/webp"
                    keys={['770-x-510-jpg', '770-x-510-webp']}
                    alt={product.value?.title}
                    class="aspect-[3/2] rounded-md"
                  />
                  <DImage
                    q:slot="dialog"
                    key={img}
                    dId={img}
                    dType="image/webp"
                    keys={['770-x-510-jpg', '770-x-510-webp']}
                    alt={product.value?.title}
                    class="aspect-[3/2] rounded-md"
                  />
                </Dialog>
              );
            })}
          </div>
        </div>
        <div class="w-full lg:order-1">
          <div class="max-w-xl">
            <h1 class="mb-3">{cleanTitle(product.value?.title)}</h1>
            <h2>{product.value?.subtitle}</h2>
          </div>

          <article
            class="prose"
            dangerouslySetInnerHTML={mdParse(product.value?.description)}
          />
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
  const items = await getProductsIds('sl');

  return {
    params: items.map((item) => {
      return { handle: item.handle };
    }),
  };
};
