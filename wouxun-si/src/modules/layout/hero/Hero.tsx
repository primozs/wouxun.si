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
};

const banners = [
  {
    id: 'bf3b6ebc-0beb-44c3-ac61-a8898e192afa',
    title: 'Gasilci in civilna zaščita',
    subtitle: 'Kvalitetna izdelava, robustnost, vsestranskost.',
    image: '166168bc-bb90-4fa6-8ffb-efa70ca28d0e',
  },
  {
    id: '5d1da079-e0db-476e-a70d-9966d5f412cc',
    title: 'Organizatorji prireditev in varnostne službe',
    subtitle: 'Zanesljivi partner organizatorjev, možnost izposoje.',
    image: '7146b7d0-760b-4b38-82d8-00a7981f2b1f',
  },
  {
    id: '46cb0b47-ec94-48db-a315-4faed86cd437',
    title: 'Radioamaterji',
    subtitle: 'Vrhunska funkcionalnost za razumno ceno.',
    image: 'b99899cf-349d-4dda-8638-550e3700ed7e',
  },
  {
    id: '4d72ea2c-e657-4e64-83d2-bbb51ff13694',
    title: 'Šport in prosti čas',
    subtitle: 'Zanesljivost v najzahtevnejših pogojih.',
    image: '1be71fd9-4cf6-47ac-8d44-932b832f5f6e',
  },
  {
    id: '3b4f5d01-7b65-49db-bff0-897ce2171655',
    title: 'Jadralni padalci',
    subtitle: 'Velik domet, enostavna uporaba.',
    image: '7e681714-af31-482c-81a2-4871ee5c190c',
  },
];

export const Hero = component$(() => {
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
          {banners.map((data) => {
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

                {data.image === '166168bc-bb90-4fa6-8ffb-efa70ca28d0e' && (
                  <ImgGasilci
                    // @ts-ignore
                    fetchpriority="high"
                    loading="eager"
                    alt={data.title}
                    style="object-fit:cover;background:#0256A1;width:100%;aspect-ratio:4;height:300px"
                    class="imageerr aspect-[16/4] sm:aspect-[16/4] lg:aspect-[16/4]"
                  />
                )}

                {data.image === '7146b7d0-760b-4b38-82d8-00a7981f2b1f' &&
                  activated.value && (
                    <ImgZur
                      alt={data.title}
                      loading="eager"
                      style="object-fit:cover;background:#0256A1;width:100%;aspect-ratio:4;height:300px"
                      class="imageerr aspect-[16/4] sm:aspect-[16/4] lg:aspect-[16/4]"
                    />
                  )}
                {data.image === 'b99899cf-349d-4dda-8638-550e3700ed7e' &&
                  activated.value && (
                    <ImgRadioamaterji
                      alt={data.title}
                      loading="eager"
                      style="object-fit:cover;background:#0256A1;width:100%;aspect-ratio:4;height:300px"
                      class="imageerr aspect-[16/4] sm:aspect-[16/4] lg:aspect-[16/4]"
                    />
                  )}
                {data.image === '1be71fd9-4cf6-47ac-8d44-932b832f5f6e' &&
                  activated.value && (
                    <ImgSport
                      alt={data.title}
                      loading="eager"
                      style="object-fit:cover;background:#0256A1;width:100%;aspect-ratio:4;height:300px"
                      class="imageerr aspect-[16/4] sm:aspect-[16/4] lg:aspect-[16/4]"
                    />
                  )}

                {data.image === '7e681714-af31-482c-81a2-4871ee5c190c' &&
                  activated.value && (
                    <ImgPadalci
                      alt={data.title}
                      loading="eager"
                      style="object-fit:cover;background:#0256A1;width:100%;aspect-ratio:4;height:300px"
                      class="imageerr aspect-[16/4] sm:aspect-[16/4] lg:aspect-[16/4]"
                    />
                  )}

                <div class="bg-gradient-to-r from-primary from-20% absolute inset-0"></div>
              </div>
            );
          })}
        </div>
      </div>

      <SlideControls swiperRef={ref} banners={banners} activated={activated} />
    </div>
  );
});

type SlideControlsProps = {
  banners: CarouselSlideData[];
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
          {props.banners.map((data, index) => {
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
