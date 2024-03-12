import { type QwikIntrinsicElements, component$ } from '@builder.io/qwik';
import { Image } from '~/ui/unpic-img';

export interface ItemImageProps {
  src: string | null;
  alt: string;
  size?: 'none' | 'xs' | 'sm' | 'base' | 'lg';
  class?: QwikIntrinsicElements['div']['class'];
}

export const ItemImage = component$<ItemImageProps>(
  ({ size = 'base', ...props }) => {
    return (
      <div class="avatar">
        <div
          class={[
            'border border-base-300 rounded-lg shadow-lg',
            {
              'w-24': size === 'base',
              'w-16': size === 'sm',
              'w-12': size === 'xs',
            },
            props.class,
          ]}
        >
          {props.src && (
            <Image
              width={208}
              height={264}
              src={props.src}
              alt={props.alt}
              layout="constrained"
            />
          )}
        </div>
      </div>
    );
  },
);
