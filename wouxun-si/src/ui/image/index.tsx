/*
usage 

<Image            
  src="/img.jpg"
  width="770"
  height="512"
  alt="Alt"
  fetchPriority="high"
  class="aspect-[16/9] rounded-2xl sm:aspect-[3/2] lg:aspect-[3/2]"
/>

*/

import {
  component$,
  type QwikIntrinsicElements,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { cva, type VariantProps } from 'class-variance-authority';

const img = cva(
  `
  
  `,
  {
    variants: {
      layout: {
        unstyled: [],
        responsive: [
          `
          relative  
          h-auto w-full max-w-full
          object-cover object-center
        `,
        ],
      },
      loadingBg: {
        white: [`bg-white`],
        gray: [`bg-neutral-100`],
      },
      // https://developer.chrome.com/blog/image-component/
      // intrinsic
      // fill
    },
    defaultVariants: {
      layout: 'responsive',
    },
  },
);

export type ImgStyleProps = VariantProps<typeof img>;
export type ImageProps = Omit<QwikIntrinsicElements['img'], 'children'> &
  ImgStyleProps & {
    fetchPriority?: 'high' | 'low' | 'auto';
  };

export const Image = component$<ImageProps>((props) => {
  useStylesScoped$(`
    img:after {  
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      background-color: #e5e7eb;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;      
      content: attr(alt) ' ' attr(data-msg-onerror);
      padding: 20px;
      text-align: center;
    }
  `);

  const error = useSignal(false);
  const errorMsg = 'Image was not found';

  // lazy default, priority setting
  let lazy = true;
  if (props.fetchPriority) {
    lazy = false;
  }

  return (
    <>
      <img
        {...(lazy && {
          loading: 'lazy',
          decoding: 'async',
        })}
        {...(!lazy && {
          loading: 'eager',
        })}
        {...props}
        class={{
          [img({
            loadingBg: props.loadingBg,
            layout: props.layout,
            class: typeof props.class === 'string' ? props.class : null,
          })]: true,
          ...(typeof props.class === 'object' && { ...props.class }),
        }}
        {...(error.value && { 'data-msg-onerror': errorMsg })}
        data-msg-onerror={errorMsg}
        onError$={() => {
          error.value = true;
        }}
      />
    </>
  );
});
