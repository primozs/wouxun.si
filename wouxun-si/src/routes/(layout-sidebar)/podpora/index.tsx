import { component$, useComputed$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { getFileUrl } from '~/modules/directus';
import type { wouxun_file } from '~/modules/directus/schema';
import { readItems } from '@directus/sdk';
import { getDirectusClient } from '~/modules/directus';
import { handleError } from '~/modules/logger';

export const getFilesList = async (): Promise<wouxun_file[]> => {
  try {
    const directus = getDirectusClient();
    const result = await directus.request(
      readItems('wouxun_file', {
        fields: ['*'],
      }),
    );

    return result ?? [];
  } catch (error: any) {
    handleError(error);
    return [];
  }
};

export const useFilesData = routeLoader$(async () => {
  const files = await getFilesList();
  return files;
});

export default component$(() => {
  const files = useFilesData();

  const filesMap = useComputed$(() => {
    const fMap: Record<string, wouxun_file[]> = {};
    for (const file of files.value) {
      const category = file.Category;
      if (!Array.isArray(fMap[category])) {
        fMap[category] = [];
      } else {
        // @ts-ignore
        fMap[category].push(file);
      }
    }

    return fMap;
  });

  return (
    <article class="prose">
      <h1>{$localize`Support`}</h1>

      {Object.keys(filesMap.value ?? {}).map((category) => {
        const fMap = filesMap.value ?? {};
        const files = fMap[category] ?? [];

        return (
          <div key={category} class="mb-5">
            <h2>{category}</h2>
            <ul>
              {files.map((item) => {
                const url = getFileUrl(item.File);
                return (
                  <li key={item.id}>
                    <a href={url} rel="noopener" target="_blank">
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      <p>
        {$localize`Other software is available on the manufacturer's official website`}{' '}
        <a href="https://www.wouxun.com/" target="_blank" rel="noopener">
          Wouxun
        </a>
        .
      </p>
    </article>
  );
});

export const head: DocumentHead = () => ({
  title: $localize`Support`,
});
