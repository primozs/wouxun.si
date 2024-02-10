// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
import {
  component$,
  useVisibleTask$,
  type PropFunction,
  type Signal,
} from '@builder.io/qwik';

type Props = {
  callback$: PropFunction<IntersectionObserverCallback>;
  root?: Signal<HTMLElement>;
  rootMargin?: string;
  threshold?: number | number[];
  target: Signal<Element | undefined>;
};

export const useIntersectionObserver = (props: Props) => {
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    ({ cleanup, track }) => {
      track(() => props.target?.value);
      const options = {
        root: props.root?.value ?? null,
        rootMargin: props.rootMargin ?? '0px',
        threshold: props.threshold ?? 1.0,
      };

      const observer = new IntersectionObserver(props.callback$, options);

      if (props.target.value) {
        observer.observe(props.target.value);
      }

      cleanup(() => {
        observer.disconnect();
        props.target?.value && observer.unobserve(props.target.value);
      });
    },
    { strategy: 'intersection-observer' },
  );
};

export const UseIntersectionObserver = component$<Props>((props) => {
  useIntersectionObserver(props);
  return <div></div>;
});
