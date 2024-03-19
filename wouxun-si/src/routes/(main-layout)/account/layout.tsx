import { component$, Slot } from '@builder.io/qwik';

export { useAuthSessionLoader } from '~/modules/auth';

export default component$(() => {
  return (
    <>
      <Slot />
    </>
  );
});
