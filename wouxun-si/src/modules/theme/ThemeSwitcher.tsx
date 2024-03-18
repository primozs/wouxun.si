import { component$ } from '@builder.io/qwik';
import { themeStorageKey } from './ThemeScript';
import { UiToggle } from '~/ui/UiToggle';
import { UiItem } from '~/ui/UiItem';
import { UiIcon } from '~/ui/UiIcon';
import { IoMoonOutline, IoSunnyOutline } from '@qwikest/icons/ionicons';
import { UiLabel } from '~/ui/UiLabel';
import { Button } from '~/ui/button';

const toggleTheme = () => {
  const theme = document.documentElement.getAttribute('data-theme') ?? 'light';

  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'night');
    localStorage.setItem(themeStorageKey, 'night');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem(themeStorageKey, 'light');
  }
};

export const ThemeListItem = component$(() => {
  return (
    <UiItem border="top" class="py-1">
      <UiIcon q:slot="start">
        <IoMoonOutline class="hidden-light"></IoMoonOutline>
        <IoSunnyOutline class="hidden-night"></IoSunnyOutline>
      </UiIcon>

      <UiLabel>{$localize`Switch theme`}</UiLabel>

      <div q:slot="end">
        <UiToggle
          onCheckboxClick$={() => {
            toggleTheme();
          }}
          label={$localize`Switch theme`}
          checkbox
          name="theme-checkbox"
          class="peer"
        />
      </div>
    </UiItem>
  );
});

export const ThemeButton = component$(() => {
  return (
    <Button
      type="button"
      aria-label={$localize`Switch theme`}
      color="ghost"
      intent="square"
      class="hidden md:flex"
      onClick$={() => {
        toggleTheme();
      }}
    >
      <span class="sr-only">{$localize`Switch theme`}</span>
      <UiIcon>
        <IoMoonOutline class="hidden-light"></IoMoonOutline>
        <IoSunnyOutline class="hidden-night"></IoSunnyOutline>
      </UiIcon>
    </Button>
  );
});
