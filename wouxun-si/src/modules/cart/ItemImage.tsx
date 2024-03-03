import { component$ } from '@builder.io/qwik';
import { Image } from '@unpic/qwik';

export interface ItemImageProps {
  src: string | null;
  alt: string;
}

export const ItemImage = component$<ItemImageProps>((props) => {
  return (
    <div class="avatar">
      <div class="w-24 border border-base-300 rounded-lg shadow-lg">
        <Image
          width={208}
          height={264}
          src={props.src}
          alt={props.alt}
          layout="constrained"
        />
      </div>
    </div>
  );
});
