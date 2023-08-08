import {
  Resource,
  type Signal,
  component$,
  useSignal,
  $,
  useTask$,
} from '@builder.io/qwik';
import { Image } from '@unpic/qwik';
import { getImageUrl } from '~/services/directus';
import { mdParse } from '~/ui/md-parse';
import { Dialog } from './Dialog';
import { cleanTitle } from '~/ui/products/cleanTitle';
import type { ProductDetail } from '~/services/products/getDirectusProductData';
import { Tags } from './Tags';
import { ProductPrice } from './Price';
import { getProduct } from '~/services/medusa/getProducts';
import { useAppGlobal } from '../common/appGlobalState';
import type { PricedProduct } from '@medusajs/client-types';
import { Alert } from '../alert';
import { Button } from '../button';
import { LoadingDots } from '../loading-dots';
import { getMedusaClient } from '~/services/medusa';
import { useNotifications } from '../notification/notificationsState';

export interface DetailsProps {
  product: Signal<ProductDetail>;
}

export const Details = component$<DetailsProps>(({ product }) => {
  return (
    <div class="flex flex-col">
      <div class="flex flex-col gap-y-6">
        <div class="flex flex-col gap-y-2">
          <Title title={product.value?.title} />
          {/* <ClientPriceAddToCart product={product} /> */}
        </div>

        <div class="flex flex-col gap-y-4">
          <Tags product={product.value} />
          <Description description={product.value?.description} />
        </div>
      </div>
    </div>
  );
});

export interface ClientPriceAddToCartProps {
  product: Signal<ProductDetail>;
}

export const ClientPriceAddToCart = component$<ClientPriceAddToCartProps>(
  ({ product }) => {
    const mProduct = useSignal<PricedProduct | null | Promise<never>>(null);
    const store = useAppGlobal();
    const errorMsg = 'Napaka pri prenosu podatkov';

    useTask$(async ({ track }) => {
      try {
        track(product);
        const result = await getProduct(
          product.value?.handle,
          store.region?.id,
        );
        mProduct.value = result;
      } catch (error) {
        mProduct.value = Promise.reject(error);
      }
    });

    return (
      <div class="min-h-[80px]">
        <Resource
          value={mProduct}
          onResolved={(product) => {
            return (
              <>
                <ProductPrice product={product} />
                <div class="flex flex-col">
                  <AddToCart product={product} />
                </div>
              </>
            );
          }}
          onRejected={() => {
            return <Alert class="mt-9" intent="error" title={errorMsg} />;
          }}
        />
      </div>
    );
  },
);

export interface AddToCartProps {
  product: PricedProduct | null;
}

export const AddToCart = component$<AddToCartProps>(({ product }) => {
  const adding = useSignal(false);
  const { addNotification } = useNotifications();
  // const [cookie] = useCookies(["cartId"]);

  const handleClickAddToCart = $(async () => {
    try {
      adding.value = !adding.value;

      const client = getMedusaClient();
      const cartId = ''; // cookie.cartId
      const lineItem = {
        variant_id: '',
        quantity: 1,
      };

      await client.carts.lineItems.create(cartId, lineItem);
      addNotification({
        type: 'success',
        title: 'Dodaj v košarico',
        description: `${product?.title} je bil uspešno dodan.`,
      });
    } catch (error: any) {
      addNotification({
        type: 'error',
        title: 'Napaka pri dodajanju v košarico',
        description: error?.message,
      });
    }

    adding.value = false;
  });

  if (!product) return null;

  return (
    <Button
      class="sm:max-w-xs"
      intent="primary"
      onClick$={handleClickAddToCart}
      disabled={adding.value}
    >
      {adding.value ? (
        <span class="flex h-6 items-center">
          <LoadingDots class="bg-white dark:bg-neutral-400" />
        </span>
      ) : (
        <>Dodaj v voziček</>
      )}
    </Button>
  );
});

export interface TitleProps {
  title: string | undefined;
}

export const Title = component$<TitleProps>(({ title }) => {
  return <h1 class="font-medium text-headers-h2">{cleanTitle(title)}</h1>;
});

export interface DescriptionProps {
  description: string | undefined;
}

export const Description = component$<DescriptionProps>(({ description }) => {
  return (
    <article class="prose" dangerouslySetInnerHTML={mdParse(description)} />
  );
});

type MainImageProps = {
  image: string;
  productTitle: string;
};

export const MainImage = component$<MainImageProps>(
  ({ image, productTitle }) => {
    const imageSrc = getImageUrl(image ?? '');
    return (
      <Dialog>
        <Image
          width={1080}
          height={720}
          src={imageSrc}
          alt={productTitle}
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
          alt={productTitle}
          class="imageerr rounded-md aspect-[16/9] sm:aspect-[3/2] lg:aspect-[3/2]"
          layout="constrained"
          cdn="directus"
        />
      </Dialog>
    );
  },
);

export interface GalleryProps {
  images: readonly string[];
  productTitle: string;
}

export const Gallery = component$<GalleryProps>(({ images, productTitle }) => {
  return (
    <div class="mt-10 grid grid-cols-2 gap-6">
      {images.map((img) => {
        const imageSrc = getImageUrl(img ?? '');
        return (
          <Dialog key={img}>
            <Image
              width={770}
              height={510}
              src={imageSrc}
              alt={productTitle}
              priority={true}
              fetchPriority="high"
              class="imageerr aspect-[3/2] rounded-md"
              layout="constrained"
              cdn="directus"
            />
            <Image
              q:slot="dialog"
              width={1080}
              height={720}
              src={imageSrc}
              alt={productTitle}
              priority={false}
              class="imageerr rounded-md aspect-[16/9] sm:aspect-[3/2] lg:aspect-[3/2]"
              layout="constrained"
              cdn="directus"
            />
          </Dialog>
        );
      })}
    </div>
  );
});
