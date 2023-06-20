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
import { cva } from 'class-variance-authority';

// https://swiperjs.com/swiper-api#parameters
import Swiper, { Navigation, Pagination } from 'swiper';
import { DImage } from '~/services/directus/DImage';
import swiperStyles from 'swiper/swiper.css?inline';

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

const slideContent = cva(
  `
    cnt-content absolute inset-0 z-10 flex w-full                    
  `,
  {
    variants: {
      position: {
        left: ['justify-start items-center'],
        right: ['justify-end items-center'],
        center: ['justify-center items-center'],
        top: ['justify-center '],
        top_left: ['justify-start'],
        top_right: ['justify-end'],
        bottom_left: ['justify-start items-end'],
        bottom_right: ['justify-end items-end'],
        hidden: ['sr-only'],
      },
    },
  },
);

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
    <>
      <div
        ref={ref}
        class="swiper relative"
        role="region"
        aria-roledescription="carousel"
        aria-label={props.ariaLabel ?? 'Stenar headlines'}
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
                    slideContent({
                      position: 'bottom_left',
                    }),
                  ]}
                >
                  <div
                    class={[
                      'flex flex-col p-2 sm:p-5 md:px-5 md:py-10 font-semibold overflow-hidden',
                      { 'text-primary-500': index > 1 },
                      { 'text-primary-500': index === 0 },
                      { 'text-white': index === 1 },
                      { 'text-white': index === 2 },
                      { 'text-white': index === 4 },
                    ]}
                  >
                    <h1 class="text-base sm:text-3xl lg:text-5xl uppercase truncate">
                      {data.title}
                    </h1>
                    <h2 class="text-base sm:text-2xl lg:text-3xl truncate">
                      {data.subtitle}
                    </h2>
                  </div>
                </div>

                <DImage
                  loadingBg="white"
                  dId={data.image}
                  dType="image/webp"
                  keys={[
                    '600-x-150-jpg',
                    '600-x-150-webp',
                    '1200-x-300-jpg',
                    '1200-x-300-webp',
                  ]}
                  sizes="
                  (max-width: 640px) 95vw,       
                  (max-width: 1024px) 770px, 770px"
                  alt={data.title}
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  class="aspect-[16/4] sm:aspect-[16/4] lg:aspect-[16/4]"
                />
              </div>
            );
          })}
        </div>
      </div>

      <SlideControls swiperRef={ref} banners={props.banners} />
    </>
  );
});

type SlideControlsProps = {
  banners: Signal<CarouselSlideData[]>;
  swiperRef: Signal<HTMLDivElement | undefined>;
};

export const SlideControls = component$<SlideControlsProps>((props) => {
  useStylesScoped$(`
  /*
  [1]: All items a forced onto a single line, causing the overflow when necessary.
  [2]: Automatic overflow means a scroll bar won’t be present if it isn’t needed
  [3]: Make it smooth scrolling on iOS devices before
  [4]: Hide the ugly scrollbars in Edge until the scrollable area is hovered
  [5]: Hide the scroll bar in WebKit browsers
  */
  .scroll {
    white-space: nowrap; /* [1] */
    overflow-x: auto; /* [2] */
    -webkit-overflow-scrolling: touch; /* [3] */
    -ms-overflow-style: -ms-autohiding-scrollbar; /* [4] */ }
  
  /* [5] */
  .scroll::-webkit-scrollbar {
    display: none; }
  `);

  return (
    <div
      role="group"
      aria-label="Slide controls"
      class="`        
        bg-primary-500
        text-sm text-white leading-5 font-semibold        
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
