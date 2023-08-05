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
import { cleanTitle } from '~/routes/product/productUtil';
import { Dialog } from '~/ui/dialog';
import { Image } from '@unpic/qwik';
import { getImageUrl } from '~/services/directus';

export const useGetProductByHandle = routeLoader$(async (event) => {
  const product = await getProductByHandle(event.params.handle, 'en');
  return product;
});

export default component$(() => {
  const product = useGetProductByHandle();
  const imageSrc = getImageUrl(product.value?.thumbnail ?? '');
  return (
    <section>
      <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div id="product-image" class="lg:order-2">
          <Dialog>
            <Image
              width={1080}
              height={720}
              src={imageSrc}
              alt={product.value?.title}
              priority={true}
              fetchPriority="high"
              class="imageerr aspect-[16/9] rounded-2xl sm:aspect-[3/2] lg:aspect-[3/2]"
              layout="constrained"
              cdn="directus"
            />
            <Image
              q:slot="dialog"
              width={1080}
              height={720}
              src={imageSrc}
              alt={product.value?.title}
              priority={true}
              fetchPriority="high"
              class="imageerr aspect-[16/9] rounded-2xl sm:aspect-[3/2] lg:aspect-[3/2]"
              layout="constrained"
              cdn="directus"
            />
          </Dialog>
          <div class="mt-4 grid grid-cols-4 gap-x-4 gap-y-4">
            {product.value?.media.map((img) => {
              const imageSrc = getImageUrl(img ?? '');
              return (
                <Dialog key={img}>
                  <Image
                    key={img}
                    width={770}
                    height={510}
                    src={imageSrc}
                    alt={product.value?.title}
                    priority={true}
                    fetchPriority="high"
                    class="imageerr aspect-[3/2] rounded-md"
                    layout="constrained"
                    cdn="directus"
                  />
                  <Image
                    q:slot="dialog"
                    key={img}
                    width={770}
                    height={510}
                    src={imageSrc}
                    alt={product.value?.title}
                    priority={true}
                    fetchPriority="high"
                    class="imageerr aspect-[3/2] rounded-md"
                    layout="constrained"
                    cdn="directus"
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
  const items = await getProductsIds('en');

  return {
    params: items.map((item) => {
      return { handle: item.handle };
    }),
  };
};
