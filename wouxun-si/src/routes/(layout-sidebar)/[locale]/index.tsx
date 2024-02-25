import { component$ } from '@builder.io/qwik';

export default component$(() => {
  return (
    <div class="card">
      <a class="link" href="/en/">
        English
      </a>
      <a class="link" href="/sl/">
        Slovenščina
      </a>
    </div>
  );
});
