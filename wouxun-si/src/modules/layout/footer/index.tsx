import { component$, useComputed$ } from '@builder.io/qwik';
// import { MainNavigation } from '../MainNavigation';
import { NavLink } from '~/ui/button';
import { UiTitle } from '~/ui/UiTitle';
import { useStoreCategories, useStoreCollections } from '~/routes/plugin@store';
import { useLocale } from '~/modules/locale/LocaleProvider';
import { useWebsiteContent } from '~/routes/layout';
import { mdParse } from '~/ui/md-parse';

export const Footer = component$(() => {
  const website = useWebsiteContent();
  return (
    <footer
      class="content-visibility-auto contain-intrinsic-size-[auto_1000px] bg-primary text-primary-content"
      aria-labelledby="footer-heading"
    >
      <div class="max-w-screen-2xl mx-auto p-6">
        {/* <div class="hidden sm:block sm:mb-6">
          <MainNavigation darkBg={true} />
        </div> */}
        <CollectionsCategories />
        <div
          class="`    
          sm:pt-5 sm:mt-5   
          sm:border-t border-base-content/10           
          md:flex md:justify-between md:items-center
        `"
        >
          <div class="flex justify-center space-x-6 md:order-2">
            <div
              class="md:flex md:space-x-4 text-sm leading-6 text-center md:text-left"
              dangerouslySetInnerHTML={mdParse(website.value?.contact)}
            ></div>
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

export const CollectionsCategories = component$(() => {
  const collection = useStoreCollections();
  const categories = useStoreCategories();
  const locale = useLocale();

  const productCategories = useComputed$(() => {
    const localeCategories = categories.value.product_categories.filter(
      (item) => item.metadata?.locale === locale.value,
    );

    return localeCategories;
  });

  return (
    <div class="flex justify-between my-0">
      <div class="gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-2">
        {productCategories.value.length > 0 && (
          <div class="flex flex-col gap-y-2">
            <UiTitle color="primary-content">{$localize`Categories`}</UiTitle>
            <ul class="grid grid-cols-1 gap-2">
              {productCategories.value.slice(0, 6).map((c) => {
                if (c.parent_category) {
                  return;
                }

                const children =
                  c.category_children?.map((child) => ({
                    name: child.name,
                    handle: child.handle,
                    id: child.id,
                  })) || null;

                return (
                  <li class="flex flex-col gap-2" key={c.id}>
                    <NavLink
                      size="sm"
                      color="neutral"
                      href={`/categories/${c.handle}`}
                    >
                      {c.name}
                    </NavLink>
                    {children && (
                      <ul class="grid grid-cols-1 ml-3 gap-2">
                        {children &&
                          children.map((child) => (
                            <li key={child.id}>
                              <NavLink
                                size="sm"
                                color="neutral"
                                href={`/categories/${child.handle}`}
                              >
                                {child.name}
                              </NavLink>
                            </li>
                          ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        {collection.value.collections.length > 0 && (
          <div class="flex flex-col gap-y-2">
            <UiTitle color="primary-content">{$localize`Collections`}</UiTitle>
            <ul
              class={[
                'grid grid-cols-1 gap-2',
                {
                  'grid-cols-2':
                    (collection.value.collections?.length || 0) > 3,
                },
              ]}
            >
              {collection.value.collections?.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <NavLink
                    size="sm"
                    color="neutral"
                    href={`/collections/${c.handle}`}
                  >
                    {c.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
});
