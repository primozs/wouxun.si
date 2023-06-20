import { component$, useComputed$ } from '@builder.io/qwik';
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city';
import { getFilesList, type FileItem } from '~/services/files/getFilesData';
import { getFileUrl } from '~/services/directus';

export const useFilesData = routeLoader$(async () => {
  const files = await getFilesList();
  return files;
});

export default component$(() => {
  const files = useFilesData();

  const filesMap = useComputed$(() => {
    const fMap: Record<string, FileItem[]> = {};
    for (const file of files.value) {
      const category = file.Category;
      if (!fMap[category]) fMap[category] = [];

      fMap[category].push(file);
    }

    return fMap;
  });

  return (
    <>
      <h1>Podpora</h1>

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
        Ostala programska oprema je na voljo na uradni strani proizvajalca{' '}
        <a href="https://www.wouxun.com/" target="_blank" rel="noopener">
          Wouxun
        </a>
        .
      </p>
    </>
  );
});

export const head: DocumentHead = {
  title: 'začetna stran',
};
