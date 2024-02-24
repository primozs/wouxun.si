export const themeStorageKey = 'theme-preference';

export const ThemeScript = () => {
  const themeScript = `
        document.documentElement
            .setAttribute('data-theme',
                localStorage.getItem('${themeStorageKey}') ??
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'light')
            )`;
  return <script dangerouslySetInnerHTML={themeScript} />;
};
