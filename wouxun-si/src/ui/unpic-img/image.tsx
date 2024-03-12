import { component$ } from '@builder.io/qwik';
import { transformProps } from '@unpic/core';
import type { QwikIntrinsicElements } from '@builder.io/qwik';
import type { UnpicImageProps } from '@unpic/core';
type Props = UnpicImageProps<
  QwikIntrinsicElements['img'] & {
    fill?: boolean;
  }
>;

export type ImageProps = Props;

const transform = (props: ImageProps) => {
  return transformProps(props);
};

export const Image = component$<ImageProps>(({ fill, ...props }) => {
  return (
    <img
      {...transform({ ...props, unstyled: fill })}
      {...(fill && {
        style:
          'position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;',
      })}
    />
  );
});
