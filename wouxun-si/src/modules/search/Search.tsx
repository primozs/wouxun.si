import {
  Resource,
  type Signal,
  component$,
  useResource$,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { IoCloseOutline, IoSearchOutline } from '@qwikest/icons/ionicons';
import { UiContent } from '~/ui/UiContent';
import { UiHeader } from '~/ui/UiHeader';
import { UiIcon } from '~/ui/UiIcon';
import { UiItem } from '~/ui/UiItem';
import { UiLabel } from '~/ui/UiLabel';
import { UiTitle } from '~/ui/UiTitle';
import { UiToolbar } from '~/ui/UiToolbar';
import { Button } from '~/ui/button';
import { handleError } from '~/modules/logger';
import { TextInput } from '~/ui/input/TextInput';
import { Link, server$ } from '@builder.io/qwik-city';
import { config } from '~/config';
import { MeiliSearch } from 'meilisearch';
import { Thumbnail } from '~/modules/products/Thumbnail';
import { imgProxyUrl } from '~/modules/common/imageUrl';

export const SearchProducts = component$(() => {
  const dialog = useSignal<HTMLDialogElement>();
  const activated = useSignal(false);
  return (
    <>
      <Button
        intent="square"
        color="ghost"
        onClick$={() => {
          dialog.value?.showModal();
          activated.value = true;
        }}
        aria-label={$localize`Search`}
      >
        <UiIcon class="indicator">
          <IoSearchOutline />
        </UiIcon>
      </Button>
      <dialog ref={dialog} class="modal modal-top">
        <div class="modal-box m-4 mx-auto w-11/12 max-w-5xl rounded-md p-0">
          {activated.value && <SearchContainer />}
        </div>
      </dialog>
    </>
  );
});

type SearchFormProps = {
  search: Signal<string>;
};

export const SearchForm = component$<SearchFormProps>(({ search }) => {
  return (
    <div class="flex flex-col w-full py-3 px-2">
      <TextInput
        name="search-field"
        type="text"
        label={$localize`Search products`}
        placeholder={$localize`Search products`}
        onInput$={(event) => {
          const el = event.target as HTMLInputElement;
          search.value = el.value ?? '';
        }}
        value=""
        error=""
        labelHidden
        errorHidden
      >
        <div
          q:slot="icon-right"
          class="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          <IoSearchOutline class="text-base-content/40 h-5 w-5" />
        </div>
      </TextInput>
    </div>
  );
});

type HitType = {
  title: string;
  description: string;
  handle: string;
  thumbnail: string;
};

// https://www.meilisearch.com/docs/reference/api/documents#get-one-document
export const fetchSearchResults = server$(async (search: string) => {
  try {
    const client = new MeiliSearch({
      host: config.SEARCH_ENDPOINT,
      apiKey: config.SEARCH_API_KEY,
    });

    const SEARCH_INDEX_NAME = config.SEARCH_INDEX_NAME || 'products';
    const controller = new AbortController();
    const result = await client.index(SEARCH_INDEX_NAME).search(
      search,
      { limit: 6 },
      {
        signal: controller.signal,
      },
    );

    const hits = result.hits as unknown as HitType[];

    const list = hits.map((item) => {
      return {
        ...item,
        thumbnail: imgProxyUrl({
          height: 470,
          width: 310,
          url: item.thumbnail!,
          resizeType: 'fill',
        }),
      };
    });
    return list;
  } catch (error: any) {
    handleError(error);
    return [];
  }
});

export interface SearchContainerProps {}

export const SearchContainer = component$<SearchContainerProps>(() => {
  const search = useSignal('');
  const debouncedSearch = useSignal('');

  useTask$(({ track, cleanup }) => {
    track(search);

    const id = setTimeout(() => (debouncedSearch.value = search.value), 400);
    cleanup(() => clearTimeout(id));
  });

  const prevResults = useSignal<HitType[]>([]);

  const res = useResource$(async ({ track }) => {
    track(debouncedSearch);
    const res = await fetchSearchResults(debouncedSearch.value);
    prevResults.value = res;
    return res;
  });

  return (
    <UiContent>
      <UiHeader q:slot="start">
        <UiToolbar layout={false}>
          <UiItem lines="none" color="transparent" class="items-center">
            <div q:slot="end" class="flex items-center gap-2 mx-2">
              <form method="dialog">
                <Button intent="square" color="neutral" class="btn-sm">
                  <IoCloseOutline class="h-5 w-5" />
                </Button>
              </form>
              <kbd class="kbd kbd-sm text-base-content/60 text-xs">esc</kbd>
            </div>

            <SearchForm search={search} />
          </UiItem>
        </UiToolbar>
      </UiHeader>

      <Resource
        value={res}
        onPending={() => {
          return (
            <ul class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 p-4">
              {prevResults.value.map((hit, index) => (
                <li key={hit.handle}>
                  <Link href={`/product/${hit.handle}`}>
                    <UiLabel>
                      <UiTitle class="truncate">{hit.title}</UiTitle>
                    </UiLabel>

                    <Thumbnail
                      thumbnail={hit.thumbnail}
                      alt={hit.handle}
                      size="full"
                      overlayBlur
                      directus={false}
                      index={index}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          );
        }}
        onResolved={(hits) => {
          return (
            <ul class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 p-4">
              {hits.map((hit, index) => (
                <li key={hit.handle}>
                  <Link href={`/product/${hit.handle}`}>
                    <UiLabel>
                      <UiTitle class="truncate">{hit.title}</UiTitle>
                    </UiLabel>

                    <Thumbnail
                      thumbnail={hit.thumbnail}
                      alt={hit.handle}
                      size="full"
                      overlayBlur
                      directus={false}
                      index={index}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          );
        }}
        onRejected={() => {
          return <>error</>;
        }}
      />
    </UiContent>
  );
});
