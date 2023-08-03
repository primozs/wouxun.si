import { component$, type Signal } from '@builder.io/qwik';
import { CalendarIcon } from '~/ui/icons/calendar-icon';
import type { wouxun_news } from '~/services/directus/schema';
import { DImage } from '~/services/directus/DImage';
import { formatDate } from '~/ui/common/formatDate';
import { mdParse } from '~/ui/md-parse';

export interface BlogViewProps {
  post: Signal<wouxun_news>;
}

export const BlogView = component$<BlogViewProps>(({ post }) => {
  return (
    <section>
      <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div class="lg:order-2">
          <DImage
            dId={post.value?.image}
            dType="image/webp"
            keys={[
              '770-x-510-jpg',
              '770-x-510-webp',
              '1080-x-720-jpg',
              '1080-x-720-webp',
            ]}
            sizes="
              (max-width: 640px) 95vw,       
              (max-width: 1024px) 770px, 770px"
            alt={post.value?.title}
            fetchPriority="high"
            class="aspect-[16/9] rounded-2xl sm:aspect-[3/2] lg:aspect-[3/2]"
          />
        </div>
        <div class="w-full lg:order-1">
          <div class="max-w-xl">
            <h1>{post.value?.title}</h1>

            <div class="my-1 flex items-center gap-x-2">
              <CalendarIcon class="h-6 w-6 fill-none stroke-black dark:stroke-white" />
              <span>
                {post.value?.date_created
                  ? formatDate(new Date(post.value.date_created), 'sl')
                  : ''}
              </span>
            </div>
          </div>

          <article
            class="prose"
            dangerouslySetInnerHTML={mdParse(post.value?.body)}
          />
        </div>
      </div>
    </section>
  );
});
