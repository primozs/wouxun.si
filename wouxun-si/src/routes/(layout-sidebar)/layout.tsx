import { component$, Slot } from '@builder.io/qwik';
import { Header } from '~/modules/layout/header';
import OstaliModeli from '~/content/ostaliModeli.mdx';
import { cleanTitle } from '~/modules/products/cleanTitle';
import { Footer } from '~/modules/layout/footer';
import { useProductsLoader } from '~/modules/products/loaders';

export { useProductsLoader } from '~/modules/products/loaders';

export default component$(() => {
  const products = useProductsLoader();

  return (
    <>
      <Header />

      <div
        class={[
          `max-w-screen-2xl mx-auto w-full px-4 sm:px-5 
        flex flex-col sm:flex-row sm:gap-5`,
        ]}
      >
        <aside
          class={[
            `prose sm:max-w-xs shrink-0 bg-base-200 
          rounded-xl p-3 mb-10 mt-2`,
          ]}
        >
          <h2>{$localize`Products`}</h2>
          <ul class="!list-none !list-inside !pl-0">
            {products.value.map((item) => {
              return (
                <li key={item.id} class="text-base font-medium leading-6">
                  <a
                    href={`/product/${item.handle}`}
                    onClick$={() => {
                      const mediaQuery =
                        window.matchMedia('(max-width: 768px)');
                      if (mediaQuery.matches) {
                        const e = document.getElementById('product-image');
                        e?.scrollIntoView({
                          block: 'start',
                          behavior: 'smooth',
                          inline: 'start',
                        });
                      }
                    }}
                  >
                    {cleanTitle(item.title)}
                  </a>
                </li>
              );
            })}
          </ul>

          <OstaliModeli />
        </aside>

        <main class="flex-grow mb-5 mt-2 order-first sm:order-2">
          <Slot />
        </main>
      </div>

      <Footer />
    </>
  );
});
