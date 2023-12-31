import { component$ } from '@builder.io/qwik';
import Contact from '~/content/contact.mdx';
import { HeaderMenu } from './header-menu';

export const Footer = component$(() => {
  return (
    <footer
      class="content-visibility-auto contain-intrinsic-size-[auto_1000px] bg-primary-500 text-white"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" class="sr-only">
        Footer
      </h2>

      <div class="max-w-screen-2xl mx-auto p-6">
        <div class="hidden sm:block">
          <HeaderMenu darkBg={true} />
        </div>
        <div
          class="`    
          sm:pt-5 sm:mt-5   
          sm:border-t border-neutral-900/10           
          md:flex md:justify-between md:items-center
        `"
        >
          <div class="flex justify-center space-x-6 md:order-2">
            <div class="md:flex md:space-x-4 text-sm leading-6 text-center md:text-left">
              <Contact />
            </div>
          </div>
          <div class="mt-8 md:order-1 md:mt-0">
            <p class="text-center text-xs leading-5">
              &copy; {new Date().getFullYear()} Wouxun Slovenija
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});
