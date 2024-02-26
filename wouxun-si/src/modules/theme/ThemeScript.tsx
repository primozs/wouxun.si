export const themeStorageKey = 'theme-preference';

export const ThemeScript = () => {
  const themeScript = `
  document.documentElement
            .setAttribute('data-theme',
                localStorage.getItem('${themeStorageKey}') ??
                (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'light')
            )
    window.addEventListener('load', function() {
      let themeSwitch = document.getElementById('theme-checkbox');
      if (themeSwitch) {
        themeSwitch.checked = localStorage.getItem('${themeStorageKey}') === 'night'? true: false;
      }      
    }
  );
        `;
  return <script dangerouslySetInnerHTML={themeScript} />;
};
