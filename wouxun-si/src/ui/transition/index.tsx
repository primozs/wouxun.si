import type { Signal, QwikIntrinsicElements } from '@builder.io/qwik';
import {
  component$,
  Slot,
  useStore,
  useTask$,
  useVisibleTask$,
  $,
  useSignal,
} from '@builder.io/qwik';
import { isBrowser } from '@builder.io/qwik/build';
import { cx } from 'class-variance-authority';
import { delay$ } from '~/ui/utils/delay';

type Props = {
  show?: boolean;
  appear?: boolean;
  unmount?: boolean;
  enter?: string; // enter="transform ease-out duration-300 transition"
  enterFrom?: string; // enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
  enterTo?: string; // enterTo="translate-y-0 opacity-100 sm:translate-x-0"
  // entered?: string;
  leave: string; // leave="transition ease-in duration-100"
  leaveFrom: string; // leaveFrom="opacity-100"
  leaveTo: string; // leaveTo="opacity-0"
  class?: string;
} & Pick<QwikIntrinsicElements['div'], 'onClick$'>;

type StoreState = {
  action: 'show' | 'hide';
  prevShow: boolean | undefined;
  initialMount: boolean;
  classess: string;
  mounted: boolean;
};

export const useSetAction = (
  element: Signal<HTMLDivElement | undefined>,
  store: StoreState,
  props: Props,
) => {
  const transitionHandler = $(async () => {
    if (store.action === 'hide') {
      await delay$(() => {
        store.mounted = false;
      }, 200);
    }
  });

  useTask$(({ track }) => {
    track(() => props.show);

    if (store.prevShow === undefined && props.show === true) {
      store.action = 'show';
      store.mounted = true;
    }
    if (store.prevShow === undefined && props.show === false) {
      store.action = 'hide';
    }
    if (store.prevShow === true && props.show === true) {
      store.action = 'show';
      store.mounted = true;
    }
    if (store.prevShow === true && props.show === false) {
      store.action = 'hide';
    }
    if (store.prevShow === false && props.show === false) {
      store.action = 'hide';
    }
    if (store.prevShow === false && props.show === true) {
      store.action = 'show';
      store.mounted = true;
    }
  });

  useVisibleTask$(() => {
    const unmount = props.unmount ?? true;

    if (unmount) {
      element.value?.addEventListener('transitionend', transitionHandler);
    }

    return () => {
      if (unmount) {
        element.value?.removeEventListener('transitionend', transitionHandler);
      }
    };
  });
};

export const useSetClasses = (store: StoreState, props: Props) => {
  useTask$(({ track }) => {
    track(() => store.action);

    const appear = props.appear ?? true;
    if (appear === true || store.initialMount === false) {
      if (store.action === 'show') {
        store.classess = cx(props.enter, props.enterFrom);
      }

      if (store.action === 'hide') {
        store.classess = cx(props.leave, props.leaveFrom);
      }

      if (isBrowser) {
        delay$(() => {
          if (appear === true || store.initialMount === false) {
            if (store.action === 'show') {
              store.classess = cx(props.enter, props.enterTo);
            }

            if (store.action === 'hide') {
              store.classess = cx(props.leave, props.leaveTo);
            }
          }
        }, 0);
      }
    } else {
      if (store.action === 'show') {
        store.classess = props.enterTo ?? '';
      }

      if (store.action === 'hide') {
        store.classess = props.leaveTo;
      }
    }
  });

  useVisibleTask$(() => {
    const appear = props.appear ?? true;

    if (appear === true || store.initialMount === false) {
      if (store.action === 'show') {
        store.classess = cx(props.enter, props.enterTo);
      }

      if (store.action === 'hide') {
        store.classess = cx(props.leave, props.leaveTo);
      }
    }
    store.initialMount = false;
  });
};

export const Transition = component$((props: Props) => {
  const element = useSignal<HTMLDivElement | undefined>();

  const store = useStore<StoreState>(() => {
    const unmount = props.unmount ?? true;
    return {
      action: props.show === true ? 'show' : 'hide',
      prevShow: undefined,
      initialMount: true,
      classess: '',
      mounted: unmount === true ? (props.show === true ? true : false) : true,
    };
  });
  useSetAction(element, store, props);
  useSetClasses(store, props);

  return (
    <>
      <div
        onClick$={props.onClick$}
        class={{
          [cx(props.class, store.classess)]: true,
          hidden: store.mounted === false,
        }}
        ref={element}
      >
        <Slot />
      </div>
    </>
  );
});
