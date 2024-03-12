import { component$, type Signal } from '@builder.io/qwik';
import type { wouxun_news } from '~/modules/directus/schema';
import { formatDate } from '~/ui/common/formatDate';
import { mdParse } from '~/ui/md-parse';
import { Image } from '~/ui/unpic-img';
import { getImageUrl } from '~/modules/directus';
import { IoCalendarClearOutline } from '@qwikest/icons/ionicons';
import { UiTitle } from '~/ui/UiTitle';
import { useLocale } from '~/modules/locale/LocaleProvider';

export interface BlogViewProps {
  post: Signal<wouxun_news>;
}

export const BlogView = component$<BlogViewProps>(({ post }) => {
  const locale = useLocale();
  const imageSrc = getImageUrl(post.value?.image ?? '');
  return (
    <section>
      <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div class="lg:order-2">
          <Image
            priority={true}
            fetchpriority="high"
            layout="constrained"
            alt={post.value?.title}
            width={1080}
            height={720}
            cdn="directus"
            src={imageSrc}
            class="imageerr aspect-[16/9] rounded-2xl sm:aspect-[3/2] lg:aspect-[3/2]"
          />
        </div>
        <div class="w-full lg:order-1">
          <div class="max-w-xl space-y-2">
            <UiTitle as="h1" size="2xl" color="primary">
              {post.value?.title}
            </UiTitle>

            <div class="my-1 flex items-center gap-x-2">
              <IoCalendarClearOutline class="h-5 w-5" />
              <span>
                {post.value?.date_created
                  ? formatDate(new Date(post.value.date_created), locale.value)
                  : ''}
              </span>
            </div>
          </div>

          <article
            class="prose mt-2"
            dangerouslySetInnerHTML={mdParse(post.value?.body)}
          />
        </div>
      </div>
    </section>
  );
});
