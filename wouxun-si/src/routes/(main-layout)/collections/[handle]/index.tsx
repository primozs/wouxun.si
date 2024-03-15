import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import type { ProductCollection } from '@medusajs/client-types';
import { handleError } from '~/modules/logger';
import { getMedusaClient, getSrvSessionHeaders } from '~/modules/medusa';
import { NotFound } from '~/modules/not-found/NotFound';
import { UiTitle } from '~/ui/UiTitle';

export const useCollectionByHandle = routeLoader$(async (event) => {
  const client = getMedusaClient();
  const handle = event.params.handle;

  if (!handle) {
    event.status(404);
    return null;
  }

  const collection = await client.collections
    .list({ handle: [handle] }, getSrvSessionHeaders(event))
    .then(({ collections }) => collections[0])
    .catch((err) => {
      handleError(err);
      return null;
    });

  if (!collection) event.status(404);
  return collection as ProductCollection | null;
});

export default component$(() => {
  const collection = useCollectionByHandle();

  return (
    <>
      {!collection.value ? (
        <NotFound centered={true} />
      ) : (
        <div>
          <UiTitle as="h1" size="xl">
            {collection.value.title}
          </UiTitle>
        </div>
      )}
    </>
  );
});
