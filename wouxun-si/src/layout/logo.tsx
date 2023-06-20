import { component$ } from '@builder.io/qwik';
import { Image } from '~/ui/image';

export const Logo = component$(() => {
  return (
    <Image
      src="/logos/logo-color.svg"
      width="207"
      height="92"
      alt="Wouxun Slovenija"
      fetchPriority="high"
      layout="unstyled"
    />
  );
});
