import {
  component$,
  Resource,
  useSignal,
  useTask$,
  type Signal,
} from '@builder.io/qwik';
import type { wouxun_news } from '~/services/directus/schema';
import { getBlogList } from '~/services/blog/getBlogData';
import { Alert } from '~/ui/alert';
import { Image } from '@unpic/qwik';
import { UseIntersectionObserver } from '~/ui/intersection-observer';
import { Link } from '@builder.io/qwik-city';
import { getImageUrl } from '~/services/directus';

function isBlogItemArray(val: Signal<unknown>): val is Signal<wouxun_news[]> {
  if (!Array.isArray(val.value)) {
    return false;
  }
  return true;
}

export const BlogListView = component$(() => {
  const page = useSignal(1);
  const blogs = useSignal<wouxun_news[] | Promise<never>>([]);
  const errorMsg = 'Napaka pri prenosu podatkov';
  const infScrollTarget = useSignal<Element>();

  useTask$(async ({ track, cleanup }) => {
    track(() => page.value);

    try {
      const controller = new AbortController();
      cleanup(() => controller.abort('cleanup'));
      const signal = controller.signal;

      let prevValues: wouxun_news[] = [];
      if (isBlogItemArray(blogs)) {
        prevValues = blogs.value;
      }

      const result = await getBlogList(page.value, signal);
      blogs.value = [...prevValues, ...result];
    } catch (error: any) {
      blogs.value = Promise.reject(error);
    }
  });

  return (
    <section>
      <div>
        <h1 class="header1">Aktualno</h1>
      </div>

      <Resource
        value={blogs}
        onResolved={(blogs) => {
          return (
            <div
              class="`
              mx-auto mt-5
              grid max-w-2xl grid-cols-1 gap-x-8 
              gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3
              `"
            >
              <UseIntersectionObserver
                target={infScrollTarget}
                callback$={(entries) => {
                  entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                      page.value = page.value + 1;
                    }
                  });
                }}
              />
              {blogs.map((data, index) => {
                return <BlogCard key={data.id} data={data} index={index} />;
              })}
              <div ref={infScrollTarget}></div>
            </div>
          );
        }}
        onRejected={(error) => {
          return (
            <Alert
              class="mt-9"
              intent="error"
              title={errorMsg}
              description={error?.message}
            />
          );
        }}
      />
    </section>
  );
});

type BlogCardProps = {
  data: wouxun_news;
  index: number;
};

export const BlogCard = component$<BlogCardProps>(({ data, index }) => {
  const imageSrc = getImageUrl(data.image ?? '');
  return (
    <Link href={`/aktualno/${data.slug}`}>
      <article class="flex flex-col items-start justify-between rounded-2xl ring-1 ring-inset ring-neutral-900/10 p-3 space-y-3">
        <div class="relative w-full">
          <Image
            {...(index < 1 && {
              priority: true,
              fetchPriority: 'high',
            })}
            layout="constrained"
            alt={data.title}
            width={770}
            height={510}
            cdn="directus"
            src={imageSrc}
            class="imageerr aspect-[16/9] rounded-2xl sm:aspect-[3/2] lg:aspect-[3/2]"
          />
        </div>
        <div class="max-w-xl">
          <div class="group relative">
            <h2 class="header2 mt-3 text-lg font-semibold leading-6 text-neutral-800 group-hover:text-neutral-600 dark:text-secondary-200 dark:group-hover:text-neutral-400 text-ellipsis line-clamp-1">
              {data.title}
            </h2>
            <p class="mt-3 text-ellipsis line-clamp-3 text-base leading-6 text-neutral-600 dark:text-secondary-400">
              {data.body}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
});
