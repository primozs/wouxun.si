import { $, component$, useSignal } from '@builder.io/qwik';
import { themeStorageKey } from './ThemeScript';
import { UiToggle } from '~/ui/UiToggle';

export const useTheme = () => {
  const currentTheme = useSignal('light');

  const toggleTheme = $(() => {
    const theme =
      document.documentElement.getAttribute('data-theme') ?? 'light';

    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'night');
      localStorage.setItem(themeStorageKey, 'night');
      currentTheme.value = 'night';
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem(themeStorageKey, 'light');
      currentTheme.value = 'light';
    }
  });

  return { currentTheme, toggleTheme };
};

export const ThemeSwitcher = component$(() => {
  const { currentTheme, toggleTheme } = useTheme();

  return (
    <UiToggle
      checked={currentTheme.value === 'night'}
      onClick$={() => {
        toggleTheme();
      }}
      title={$localize`Switch theme light, nights`}
    />
  );
});
