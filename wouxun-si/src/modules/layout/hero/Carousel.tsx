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

// https://swiperjs.com/swiper-api#parameters
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import swiperStyles from './swiper.css?inline';
import { Image } from '~/ui/unpic-img';
import { getImageUrl } from '~/modules/directus';

export type CarouselSlideData = {
  id: string;
  title: string;
  subtitle: string | null;
  image: string | null;
  style: string | null;
};

type CarouselProps = {
  banners: Signal<CarouselSlideData[]>;
};

export const Carousel = component$<CarouselProps>((props) => {
  const activated = useSignal(false);
  const ref = useSignal<HTMLDivElement>();
  const swiper = useSignal<NoSerialize<Swiper>>();
  useStyles$(swiperStyles);

  const initSWiper = $(() => {
    // @ts-ignore
    if (ref.value && !swiper.value) {
      activated.value = true;
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
        aria-label={'Wouxun headlines'}
        onTouchStart$={initSWiper}
        onMouseOver$={initSWiper}
      >
        <div class="swiper-wrapper">
          {props.banners.value.map((data, index) => {
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

                {data.image && (activated.value === true || index === 0) && (
                  // @ts-ignore
                  <Image
                    background="#0256A1"
                    alt={data.title}
                    layout="fullWidth"
                    width={1200}
                    height={300}
                    cdn="directus"
                    src={getImageUrl(data.image ?? '')}
                    fetchpriority="high"
                    loading="eager"
                    class={[
                      'imageerr aspect-[16/4] sm:aspect-[16/4] lg:aspect-[16/4]',
                    ]}
                  />
                )}

                <div class="bg-gradient-to-r from-primary from-20% absolute inset-0"></div>
              </div>
            );
          })}
        </div>
      </div>

      <SlideControls
        swiperRef={ref}
        banners={props.banners}
        activated={activated}
      />
    </div>
  );
});

type SlideControlsProps = {
  banners: Signal<CarouselSlideData[]>;
  swiperRef: Signal<HTMLDivElement | undefined>;
  activated: Signal<boolean>;
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
      onTouchStart$={() => {
        props.activated.value = true;
      }}
      onMouseOver$={() => {
        props.activated.value = true;
      }}
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
