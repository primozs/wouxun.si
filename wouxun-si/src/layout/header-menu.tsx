import { component$ } from '@builder.io/qwik';
import { useLocation, useContent } from '@builder.io/qwik-city';

type Props = {
  darkBg?: boolean;
  isMobile?: boolean;
};

export const HeaderMenu = component$<Props>((props) => {
  const { menu } = useContent();
  const { url } = useLocation();

  return (
    <>
      {menu
        ? menu.items?.map((item) => (
            <ul
              class={[
                !props.isMobile &&
                  `flex justify-center sm:justify-start items-center 
                  mr-4
                  space-x-2 whitespace-nowrap sm:space-x-4`,
                props.isMobile &&
                  `space-y-2 whitespace-nowrap text-primary-500`,
              ]}
              key={item.text}
            >
              {item.items?.map((item) => {
                const active =
                  url.pathname ===
                  (item.href?.slice(-1)[0] === '/'
                    ? item.href
                    : item.href + '/');

                return (
                  <li key={item.text}>
                    <a
                      href={item.href}
                      class={[
                        'text-base font-semibold',
                        { 'text-primary-600': !props.darkBg && active },
                        { 'text-white': props.darkBg && active },
                      ]}
                    >
                      {item.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          ))
        : null}
    </>
  );
});
