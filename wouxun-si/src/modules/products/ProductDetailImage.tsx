import { component$, useSignal, Slot, $ } from '@builder.io/qwik';
import { Button } from '~/ui/button';
import { IoCloseOutline } from '@qwikest/icons/ionicons';
import { Thumbnail } from './Thumbnail';

type MainImageProps = {
  image: string;
  productTitle: string;
};

export const ProductMainImage = component$<MainImageProps>(
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

export const ProductGallery = component$<GalleryProps>(
  ({ images, productTitle }) => {
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
  },
);

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
