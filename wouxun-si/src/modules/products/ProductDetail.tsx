import { type Signal, component$, useSignal, Slot, $ } from '@builder.io/qwik';
import { mdParse } from '~/ui/md-parse';
import type { ProductDetail } from '~/modules/products/getDirectusProductData';
import { Tags } from './Tags';
import { ProductPrice } from './Price';
import type { PricedProduct } from '@medusajs/client-types';
import { Button } from '~/ui/button';
import { useNotifications } from '~/ui/notification/notificationsState';
import { useAddToCartAction } from '~/routes/plugin@store';
import { IoBagHandleOutline, IoCloseOutline } from '@qwikest/icons/ionicons';
import { UiTitle } from '~/ui/UiTitle';
import { Thumbnail } from './Thumbnail';

export interface DetailsProps {
  product: Signal<{
    productDirectus: ProductDetail | null;
    productMedusa: PricedProduct | null;
  }>;
}

export const ProductDetailView = component$<DetailsProps>(({ product }) => {
  return (
    <div class="flex flex-col">
      <div class="flex flex-col gap-y-6">
        <div class="flex flex-col gap-y-2">
          <UiTitle as="h1" size="2xl" color="primary">
            {product.value.productDirectus?.title}
          </UiTitle>

          <>
            <ProductPrice product={product.value.productMedusa} />
            <div class="flex flex-col">
              <AddToCart
                productMedusa={product.value.productMedusa}
                productDirectus={product.value.productDirectus}
              />
            </div>
          </>
        </div>

        <div class="flex flex-col gap-y-4">
          <Tags product={product.value.productDirectus} />

          <article
            class="prose"
            dangerouslySetInnerHTML={mdParse(
              product.value.productDirectus?.description,
            )}
          />
        </div>
      </div>
    </div>
  );
});

export interface AddToCartProps {
  productMedusa: PricedProduct | null;
  productDirectus: ProductDetail | null;
}

export const AddToCart = component$<AddToCartProps>(
  ({ productMedusa, productDirectus }) => {
    const action = useAddToCartAction();

    const adding = useSignal(false);
    const { addNotification } = useNotifications();

    if (!productMedusa || !productDirectus) return null;
    const variantId = productMedusa?.variants![0]?.id;
    const directusId = productDirectus.id;
    const thumbnailId = productDirectus.thumbnail;

    return (
      <Button
        class="sm:max-w-[250px]"
        color="primary"
        onClick$={async () => {
          adding.value = !adding.value;

          const { value } = await action.submit({
            variantId: variantId ?? '',
            directusId,
            thumbnailId,
          });

          if (value.failed) {
            addNotification({
              type: 'error',
              title: $localize`Error add to cart`,
            });
          }

          adding.value = false;
        }}
        loading={adding.value}
        // disabled={adding.value}
      >
        <IoBagHandleOutline class="h-5 w-5" />
        {$localize`Add to cart`}
      </Button>
    );
  },
);

type MainImageProps = {
  image: string;
  productTitle: string;
};

export const MainImage = component$<MainImageProps>(
  ({ image, productTitle }) => {
    return (
      <ImageDialog>
        <Thumbnail
          thumbnail={image}
          alt={productTitle}
          index={0}
          size="full"
          class="xl:w-[440px]"
          noBorder
        />

        <div
          class="flex items-center justify-center w-full h-full"
          q:slot="dialog"
        >
          <Thumbnail
            q:slot="dialog"
            thumbnail={image}
            alt={productTitle}
            index={0}
            size="h-full"
            noBorder
          />
        </div>
      </ImageDialog>
    );
  },
);

export interface GalleryProps {
  images: readonly string[];
  productTitle: string;
}

export const Gallery = component$<GalleryProps>(({ images, productTitle }) => {
  return (
    <div class="mt-10 grid grid-cols-2 gap-3">
      {images.map((img, index) => {
        return (
          <ImageDialog key={img}>
            <Thumbnail
              thumbnail={img}
              alt={productTitle}
              index={index}
              size="small"
              class="w-full md:w-1/2"
            />

            <div
              class="flex items-center justify-center w-full h-full"
              q:slot="dialog"
            >
              <Thumbnail
                q:slot="dialog"
                thumbnail={img}
                alt={productTitle}
                index={0}
                size="h-full"
                noBorder
              />
            </div>
          </ImageDialog>
        );
      })}
    </div>
  );
});

export const ImageDialog = component$(() => {
  const ref = useSignal<HTMLDialogElement>();

  const handleClick = $(() => {
    ref.value?.showModal();
  });

  return (
    <>
      <div
        onClick$={handleClick}
        class="cursor-pointer flex w-full justify-center"
      >
        <Slot />
      </div>

      <dialog ref={ref} class="modal">
        <div class="modal-box w-11/12 h-full max-w-5xl p-10 overflow-hidden">
          <form method="dialog">
            <Button
              intent="rounded"
              color="ghost"
              class="btn-sm absolute right-2 top-2"
            >
              <IoCloseOutline class="h-5 w-5" />
            </Button>
          </form>
          <Slot name="dialog" />
        </div>
      </dialog>
    </>
  );
});
