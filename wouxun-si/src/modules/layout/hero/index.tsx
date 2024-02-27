import {
  component$,
  type Signal,
  useSignal,
  useStyles$,
  useStylesScoped$,
  $,
  noSerialize,
  type NoSerialize,
} from '@builder.io/qwik';
import { DImage } from '~/modules/directus/DImage';
// import { Image } from '@unpic/qwik';
// import { getImageUrl } from '~/services/directus';

// https://swiperjs.com/swiper-api#parameters
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import swiperStyles from './swiper.css?inline';

import ImgGasilci from '~/media/photos/slide_gasilci.jpg?jsx';
import ImgPadalci from '~/media/photos/slide_padalci.jpg?jsx';
import ImgRadioamaterji from '~/media/photos/slide_radioamaterji.jpg?jsx';
import ImgSport from '~/media/photos/slide_sportinprosticas.jpg?jsx';
import ImgZur from '~/media/photos/slide_zur.jpg?jsx';

export type CarouselSlideData = {
  id: string;
  title: string;
  subtitle: string | null;
  image: string | null;
  style: string | null;
};

type CarouselProps = {
  banners: Signal<CarouselSlideData[]>;
  ariaLabel?: string;
};

export const Carousel = component$<CarouselProps>((props) => {
  const ref = useSignal<HTMLDivElement>();
  const swiper = useSignal<NoSerialize<Swiper>>();
  useStyles$(swiperStyles);

  const initSWiper = $(() => {
    // @ts-ignore
    if (ref.value && !swiper.value) {
      swiper.value = noSerialize(
        new Swiper(ref.value, {
          modules: [Navigation, Pagination],
          direction: 'horizontal',
          loop: true,
          speed: 400,
          spaceBetween: 100,
          init: true,
        }),
      );
    }
  });

  return (
    <div class="min-w-0">
      <div
        ref={ref}
        class="swiper relative bg-primary"
        role="region"
        aria-roledescription="carousel"
        aria-label={props.ariaLabel ?? 'Stenar headlines'}
        onTouchStart$={initSWiper}
        onMouseOver$={initSWiper}
      >
        <div class="swiper-wrapper">
          {props.banners.value.map((data, index) => {
            // const imageSrc = getImageUrl(data.image ?? '');
            return (
              <div
                class="swiper-slide"
                key={data.id}
                role="group"
                aria-roledescription="Slide"
                aria-label={data.title}
              >
                <div
                  class={[
                    'max-w-screen-2xl mx-auto',
                    'cnt-content absolute inset-0 z-10 flex w-full',
                    'justify-start items-end',
                  ]}
                >
                  <div
                    class={[
                      'backdrop-blur-sm',
                      `
                        flex flex-col 
                        p-3 sm:p-5 md:px-5 md:py-10 
                        font-semibold overflow-hidden

                        text-primary-content
                      `,
                    ]}
                  >
                    <h1
                      class="`
                      text-3xl lg:text-5xl 
                      text-balance
                      truncate !leading-normal
                    `"
                    >
                      {data.title}
                    </h1>
                    <h2
                      class="`
                      text-2xl lg:text-3xl 
                      text-balance
                    `"
                    >
                      {data.subtitle}
                    </h2>
                  </div>
                </div>

                {/* <Image
                  background="#0256A1"
                  layout="fullWidth"
                  alt={data.title}
                  width={1200}
                  height={300}
                  cdn="directus"
                  src={imageSrc}
                  {...(index === 0 && {
                    priority: true,
                    fetchPriority: 'high',
                  })}
                  class="`
                    imageerr aspect-[16/4] sm:aspect-[16/4] lg:aspect-[16/4]                    
                  `"
                /> */}

                {data.image === '166168bc-bb90-4fa6-8ffb-efa70ca28d0e' ? (
                  <ImgGasilci
                    loading="eager"
                    alt={data.title}
                    style="object-fit:cover;background:#0256A1;width:100%;aspect-ratio:4;height:300px"
                    class="imageerr aspect-[16/4] sm:aspect-[16/4] lg:aspect-[16/4]"
                  />
                ) : data.image === '7146b7d0-760b-4b38-82d8-00a7981f2b1f' ? (
                  <ImgZur
                    alt={data.title}
                    style="object-fit:cover;background:#0256A1;width:100%;aspect-ratio:4;height:300px"
                    class="imageerr aspect-[16/4] sm:aspect-[16/4] lg:aspect-[16/4]"
                  />
                ) : data.image === 'b99899cf-349d-4dda-8638-550e3700ed7e' ? (
                  <ImgRadioamaterji
                    alt={data.title}
                    style="object-fit:cover;background:#0256A1;width:100%;aspect-ratio:4;height:300px"
                    class="imageerr aspect-[16/4] sm:aspect-[16/4] lg:aspect-[16/4]"
                  />
                ) : data.image === '1be71fd9-4cf6-47ac-8d44-932b832f5f6e' ? (
                  <ImgSport
                    alt={data.title}
                    style="object-fit:cover;background:#0256A1;width:100%;aspect-ratio:4;height:300px"
                    class="imageerr aspect-[16/4] sm:aspect-[16/4] lg:aspect-[16/4]"
                  />
                ) : data.image === '7e681714-af31-482c-81a2-4871ee5c190c' ? (
                  <ImgPadalci
                    alt={data.title}
                    style="object-fit:cover;background:#0256A1;width:100%;aspect-ratio:4;height:300px"
                    class="imageerr aspect-[16/4] sm:aspect-[16/4] lg:aspect-[16/4]"
                  />
                ) : (
                  <DImage
                    dId={data.image}
                    dType="image/webp"
                    keys={[
                      '600-x-150-jpg',
                      '600-x-150-webp',
                      '1200-x-300-jpg',
                      '1200-x-300-webp',
                    ]}
                    style="object-fit:cover;background:#0256A1;width:100%;aspect-ratio:4;height:300px"
                    layout="unstyled"
                    sizes="
                (max-width: 640px) 95vw,
                (max-width: 1024px) 770px, 770px"
                    alt={data.title}
                    {...(index === 0 && { fetchPriority: 'high' })}
                    class="`
                  imageerr aspect-[16/4] sm:aspect-[16/4] lg:aspect-[16/4]
                `"
                  />
                )}

                {/* <DImage
                  dId={data.image}
                  dType="image/webp"
                  keys={[
                    '600-x-150-jpg',
                    '600-x-150-webp',
                    '1200-x-300-jpg',
                    '1200-x-300-webp',
                  ]}
                  style="object-fit:cover;background:#0256A1;width:100%;aspect-ratio:4;height:300px"
                  layout="unstyled"
                  sizes="
                (max-width: 640px) 95vw,       
                (max-width: 1024px) 770px, 770px"
                  alt={data.title}
                  {...(index === 0 && { fetchPriority: 'high' })}
                  class="`
                  imageerr aspect-[16/4] sm:aspect-[16/4] lg:aspect-[16/4]                    
                `"
                /> */}

                <div class="bg-gradient-to-r from-primary from-20% absolute inset-0"></div>
              </div>
            );
          })}
        </div>
      </div>

      <SlideControls swiperRef={ref} banners={props.banners} />
    </div>
  );
});

type SlideControlsProps = {
  banners: Signal<CarouselSlideData[]>;
  swiperRef: Signal<HTMLDivElement | undefined>;
};

export const SlideControls = component$<SlideControlsProps>((props) => {
  useStylesScoped$(`
  .scroll {
    white-space: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar; 
  }

  .scroll::-webkit-scrollbar {
    display: none; 
  }
  `);

  return (
    <div
      role="group"
      aria-label="Slide controls"
      class="`        
        bg-primary
        text-sm text-primary-content leading-5 font-semibold        
      `"
    >
      <div class="max-w-screen-2xl mx-auto px-4 sm:px-5 py-1">
        <div class="space-x-5 scroll">
          {props.banners.value.map((data, index) => {
            return (
              <button
                aria-label={data.title}
                key={`controls-${data.id}`}
                onClick$={() => {
                  // @ts-ignore
                  let sw = props.swiperRef.value?.swiper as unknown as Swiper;
                  if (sw) {
                    sw.slideTo(index, 400);
                  } else {
                    if (props.swiperRef.value) {
                      sw = new Swiper(props.swiperRef.value, {
                        modules: [Navigation, Pagination],
                        direction: 'horizontal',
                        loop: true,
                        speed: 400,
                        spaceBetween: 100,
                        init: true,
                      });
                      sw.slideTo(index, 400);
                    }
                  }
                }}
              >
                <span class="sr-only">{data.title}</span>
                <span>{data.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});
