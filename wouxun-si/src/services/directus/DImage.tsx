/*
usage 

<DImage         
  dId={data.imageId}
  dType="image/webp"
  keys?={[
    '770-x-510-jpg',
    '770-x-510-webp',
    '1080-x-720-jpg',
    '1080-x-720-webp',
  ]}
  widths?={[500, 770]}   
  heights?={[200, 520]}  
  sizes="
        (max-width: 640px) 95vw,       
        (max-width: 1024px) 770px, 400px"
  alt="Alt"
  fetchPriority="high"
  class="aspect-[16/9] rounded-2xl sm:aspect-[3/2] lg:aspect-[3/2]"
/>

*/

import { component$ } from '@builder.io/qwik';
import { Image, type ImageProps } from '~/ui/image';
import { getFileUrl, type imageKeys, imageKeysData } from '.';

type ValuesOf<T> = T[keyof T];
type Keys = ValuesOf<typeof imageKeys>;
type KeysData = Record<
  Keys,
  { width: number; height: number; format: 'jpg' | 'webp' }
>;

type DImageProps = ImageProps & {
  dId: string | null | undefined;
  dType?: 'image/webp';
  widths?: number[];
  heights?: number[];
  keys?: Keys[];
};

export const DImage = component$<DImageProps>(
  ({ dId, dType, widths, heights, keys, ...rest }) => {
    const imageId = dId ?? '';
    if (!keys && !widths)
      throw new Error('Eather keys or widths need to be set');

    let sourceSrcSet: string | undefined;
    let imgSrcSet: string | undefined;
    let src: string | undefined;
    let imageWidth: number | undefined;
    let imageHeight: number | undefined;

    if (widths) {
      const imgSrcSetObj = generateSrcSetsWh({ dId: imageId, widths, heights });
      imgSrcSet = imgSrcSetObj
        .map((item) => item.src + item.scrWidth)
        .join(',');

      if (dType === 'image/webp') {
        const sourceSrcSetObj = generateSrcSetsWh({
          dId: imageId,
          widths,
          heights,
          format: 'webp',
        });
        sourceSrcSet = sourceSrcSetObj
          .map((item) => item.src + item.scrWidth)
          .join(',');
      }
      src = imgSrcSetObj.slice(-1)[0].src;
      imageWidth = widths.slice(-1)[0];
      imageHeight = heights ? heights.slice(-1)[0] : undefined;
    }

    if (keys) {
      const webpKeys = keys.filter((key) => {
        return imageKeysData[key].format === 'webp';
      });
      const webpKeysData = Object.fromEntries(
        webpKeys.map((key) => [key, imageKeysData[key]]),
      ) as KeysData;

      const sourceSrcSetObj = generateSrcSetsKeys({
        dId: imageId,
        keys: webpKeys,
        keysData: webpKeysData,
      });

      sourceSrcSet = sourceSrcSetObj
        .map((item) => item.src + item.scrWidth)
        .join(',');

      const jpgKeys = keys.filter((key) => {
        return imageKeysData[key].format === 'jpg';
      });
      const jpgKeysData = Object.fromEntries(
        jpgKeys.map((key) => [key, imageKeysData[key]]),
      ) as KeysData;

      const imgSrcSetObj = generateSrcSetsKeys({
        dId: imageId,
        keys: jpgKeys,
        keysData: jpgKeysData,
      });
      imgSrcSet = imgSrcSetObj
        .map((item) => item.src + item.scrWidth)
        .join(',');

      const srcKey = jpgKeys.slice(-1)[0];
      const srcData = jpgKeysData[srcKey];

      src = imgSrcSetObj.slice(-1)[0].src;
      imageWidth = srcData.width;
      imageHeight = srcData.height;
    }

    return (
      <picture>
        {dType && sourceSrcSet && <source type={dType} srcSet={sourceSrcSet} />}
        <Image
          {...rest}
          src={src}
          srcSet={imgSrcSet}
          width={imageWidth}
          {...(imageHeight && { height: imageHeight })}
        />
      </picture>
    );
  },
);

type GenerateKeySrcSetsProps = {
  dId: string;
  keys: Keys[];
  keysData: KeysData;
};

const generateSrcSetsKeys = ({
  dId,
  keys,
  keysData,
}: GenerateKeySrcSetsProps) => {
  const srcset = keys.map((key) => {
    const data = keysData[key];

    const src = getFileUrl(dId, {
      key,
    });
    const scrWidth = ` ${data.width}w`;
    return { src, scrWidth };
  });
  return srcset;
};

type GenerateSrcSetsProps = {
  dId: string;
  dType?: 'image/webp';
  widths: number[];
  heights?: number[];
  fit?: 'cover' | 'contain' | 'inside' | 'outside';
  format?: 'jpg' | 'webp';
  quality?: number;
};

const generateSrcSetsWh = ({
  dId,
  widths,
  heights = [],
  fit = 'cover',
  quality = 80,
  format = 'jpg',
}: GenerateSrcSetsProps) => {
  const srcset = widths.map((width, index) => {
    const height = heights[index];

    const src = getFileUrl(dId, {
      width,
      ...(height && { height }),
      fit,
      format,
      quality,
    });
    const scrWidth = ` ${width}w`;
    return { src, scrWidth };
  });

  return srcset;
};

// Standard Website Resolutions For Mobile screens:
//
// 360×640
// 375×667
// 414×896
// 360×780
// 375×812
//
//
// Standard Website Resolutions For Tablet Screens:
//
// 601×962
//          sm: 640 @media (min-width: 640px)
// 768×1024 md: 768 @media (min-width: 768px)
// 800×128
// 962×601
//          lg: 1024 @media (min-width: 1024px)
// 1280×800 xl: 1280 @media (min-width: 1280px)
//
//
// Standard Website Resolutions For Laptop Screens:
//
// 1024×768 lg: 1024 @media (min-width: 1024px)
//          xl: 1280 @media (min-width: 1280px)
// 1366×768
// 1440×900
// 1536×864 2xl: 1536 @media (min-width: 1536px)
// 1920×1080

/* 

https://web.dev/browser-level-image-lazy-loading/
https://www.builder.io/blog/fast-images
https://learndirectus.com/image-optimization-in-directus/  
https://flaviocopes.com/html-responsive-images-srcset/
https://responsivebreakpoints.com/

  <div class="carousel">
    <img class="slide-1" fetchpriority="high">
    <img class="slide-2" fetchpriority="low">
    <img class="slide-3" fetchpriority="low">
  </div>

  <picture>    
    <source 
      type="image/webp"
      srcset="
        /image.webp?width=100 100w, 
        /image.webp?width=200 200w, 
        /image.webp?width=400 400w, 
        /image.webp?width=800 800w" 
      />
    <img 
      src="/image.png"
      srcset="
        /image.png?width=100 100w, 
        /image.png?width=200 200w, 
        /image.png?width=400 400w, 
        /image.png?width=800 800w"
      sizes="
        (max-width: 400px) 95vw,       
        (max-width: 800px) 100vw, 50vw
        (max-width: 900px) 50vw, 800px"
        "  
      style="width: 100%; aspect-ratio: 16/9"
      loading="lazy"
      decoding="async"
      alt="Builder.io drag and drop interface"
    />
  </picture>             
*/
