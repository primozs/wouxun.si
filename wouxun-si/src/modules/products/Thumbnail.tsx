import { type QwikIntrinsicElements, component$ } from '@builder.io/qwik';
import { IoImageOutline } from '@qwikest/icons/ionicons';
import { Image } from '~/ui/unpic-img';
import { getImageUrl } from '../directus';
import { UiIcon } from '~/ui/UiIcon';

type ThumbnailProps = {
  thumbnail: string | null | undefined;
  alt: string | undefined;
  index: number;
  isFeatured?: boolean;
  size?: 'small' | 'medium' | 'large' | 'full' | 'square';
  class?: QwikIntrinsicElements['div']['class'];
  overlayBlur?: boolean;
};

export const Thumbnail = component$<ThumbnailProps>(
  ({
    size = 'small',
    overlayBlur = false,
    thumbnail,
    alt,
    index,
    isFeatured,
    ...props
  }) => {
    return (
      <div
        class={[
          `
          relative w-full overflow-hidden p-4 
          bg-base-300 
          rounded-lg 
          shadow-sm
          shadow-base-300 
          group-hover:shadow-base-300 
          transition-shadow ease-in-out duration-150
          border border-base-300
          `,
          {
            'aspect-[11/14]': isFeatured,
            'aspect-[9/16]': !isFeatured && size !== 'square',
            'aspect-[1/1]': size === 'square',
            'w-[180px]': size === 'small',
            'w-[290px]': size === 'medium',
            'w-[440px]': size === 'large',
            'w-full': size === 'full',
          },
          overlayBlur &&
            `              
            group/card
            shadow-card-hover-light              
          `,
          props.class,
        ]}
      >
        {overlayBlur && (
          <div
            class="`
              absolute inset-0 flex opacity-0
              group-focus-within:card:opacity-100
              md:group-hover/card:opacity-100
              bg-overlay-light
              text-overlay
              z-10 items-center justify-center transition-all
            `"
          >
            <p>{$localize`View product`}</p>
          </div>
        )}

        <div
          class="`
            absolute inset-0
            md:group-hover/card:blur-[2px]
            md:group-hover/card:scale-105
            transition-transform ease-linear duration-300
          `"
        >
          <ImageOrPlaceholder image={thumbnail} alt={alt} index={index} />
        </div>
      </div>
    );
  },
);

export interface ImageOrPlaceholderProps {
  image: string | null | undefined;
  alt: string | undefined;
  index: number;
}

export const ImageOrPlaceholder = component$<ImageOrPlaceholderProps>(
  ({ image, alt, index }) => {
    return (
      <>
        {image ? (
          <>
            <Image
              alt={alt}
              height={470}
              width={310}
              cdn="directus"
              src={getImageUrl(image)}
              {...(index === 0 && {
                priority: true,
                fetchPriority: 'high',
              })}
              {...(index !== 0 && {
                loading: 'lazy',
              })}
              class="imageerr absolute inset-0 object-cover object-center"
              fill
            />
          </>
        ) : (
          <div class="w-full h-full absolute inset-0 flex items-center justify-center">
            <UiIcon size="md" class="text-base-content/60">
              <IoImageOutline />
            </UiIcon>
          </div>
        )}
      </>
    );
  },
);
