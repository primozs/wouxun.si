import { $, component$ } from '@builder.io/qwik';
import { themeStorageKey } from './ThemeScript';
import { UiToggle } from '~/ui/UiToggle';
import { UiItem } from '~/ui/UiItem';
import { UiIcon } from '~/ui/UiIcon';
import { IoMoonOutline, IoSunnyOutline } from '@qwikest/icons/ionicons';
import { UiLabel } from '~/ui/UiLabel';
import { Button } from '~/ui/button';

const useTheme = () => {
  const toggleTheme = $(() => {
    const theme =
      document.documentElement.getAttribute('data-theme') ?? 'light';

    if (theme === 'light') {
      console.log('set night');
      document.documentElement.setAttribute('data-theme', 'night');
      localStorage.setItem(themeStorageKey, 'night');
    } else {
      console.log('set light');
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem(themeStorageKey, 'light');
    }
  });

  return { toggleTheme };
};

export const ThemeListItem = component$(() => {
  const { toggleTheme } = useTheme();

  return (
    <UiItem border="top">
      <UiIcon q:slot="start">
        <IoMoonOutline class="hidden-light"></IoMoonOutline>
        <IoSunnyOutline class="hidden-night"></IoSunnyOutline>
      </UiIcon>

      <UiLabel>{$localize`Switch theme`}</UiLabel>

      <UiToggle
        q:slot="end"
        onCheckboxClick$={() => {
          toggleTheme();
        }}
        label={$localize`Switch theme`}
        checkbox
        name="theme-checkbox"
        class="peer"
      />
    </UiItem>
  );
});

export const ThemeButton = component$(() => {
  const { toggleTheme } = useTheme();
  return (
    <Button
      type="button"
      aria-label={$localize`Switch theme`}
      color="primary"
      fill="outline"
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
