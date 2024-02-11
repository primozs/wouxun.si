import {
  Resource,
  type Signal,
  component$,
  useSignal,
  $,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Image } from '@unpic/qwik';
import { getImageUrl } from '~/services/directus';
import { mdParse } from '~/ui/md-parse';
import { Dialog } from './Dialog';
import { cleanTitle } from '~/store/products/cleanTitle';
import type { ProductDetail } from '~/services/products/getDirectusProductData';
import { Tags } from './Tags';
import { ProductPrice } from './Price';
import { getProduct } from '~/services/medusa/getProducts';
import { useAppGlobal } from '../../store/common/AppGlobalProvider';
import type { PricedProduct } from '@medusajs/client-types';
import { Alert } from '~/ui/alert';
import { Button } from '~/ui/button';
import { LoadingDots } from '~/ui/loading-dots';
import { getMedusaClient } from '~/services/medusa';
import { useNotifications } from '~/ui/notification/notificationsState';
import { ShoppingBagIcon } from '~/ui/icons/shopping-bag-icon';
import JSCookies from 'js-cookie';
import { useCart } from '~/store/cart/cartState';
import { useCartDialog } from '~/store/cart/CartDialog';

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

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(async ({ track }) => {
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
          onResolved={(pricedProduct) => {
            return (
              <>
                <ProductPrice product={pricedProduct} />
                <div class="flex flex-col">
                  <AddToCart
                    product={pricedProduct}
                    externalId={product.value?.id ?? ''}
                    thumbnailId={product.value?.thumbnail ?? ''}
                  />
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
  externalId: string;
  thumbnailId: string;
}

export const AddToCart = component$<AddToCartProps>(
  ({ product, externalId, thumbnailId }) => {
    const adding = useSignal(false);
    const { addNotification } = useNotifications();
    const { updateCart } = useCart();
    const { openCartDialog } = useCartDialog();

    const handleClickAddToCart = $(async () => {
      try {
        adding.value = !adding.value;

        const cartId = JSCookies.get('cartId');
        const variant_id = product?.variants![0]?.id;

        if (!cartId || !variant_id) throw new Error('no variant id or cart id');

        const client = getMedusaClient();
        const lineItem = {
          variant_id,
          quantity: 1,
          metadata: {
            externalId,
            thumbnailId,
          },
        };

        await client.carts.lineItems.create(cartId, lineItem);
        await updateCart();
        openCartDialog();

        // addNotification({
        //   type: 'success',
        //   title: 'Dodaj v košarico',
        //   description: `${product?.title} je bil uspešno dodan.`,
        // });
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
        class="sm:max-w-[250px] space-x-3"
        intent="primary"
        onClick$={handleClickAddToCart}
        disabled={adding.value}
      >
        {adding.value ? (
          <span class="flex h-6 items-center ">
            <LoadingDots class="bg-white dark:bg-neutral-400" />
          </span>
        ) : (
          <>
            <ShoppingBagIcon class="h-5 w-5" />
            <span>Dodaj v voziček</span>
          </>
        )}
      </Button>
    );
  },
);

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
