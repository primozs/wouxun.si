import { component$ } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { useAuthSignoutAction } from '~/routes/plugin@auth';
import { protectedRoute } from '~/store/auth';
import { Button } from '~/ui/button';

export const onGet: RequestHandler = async (event) => {
  await protectedRoute(event);
};

export default component$(() => {
  const signout = useAuthSignoutAction();
  return (
    <>
      <p>Profile: </p>

      <Button
        type="button"
        onClick$={() => {
          signout.submit();
        }}
      >
        Logout
      </Button>
    </>
  );
});
