import { component$ } from '@builder.io/qwik';
import { useContent } from '@builder.io/qwik-city';
import { NavLink } from '~/ui/button';
import { useLocale } from '../locale/LocaleProvider';

type Props = {
  darkBg?: boolean;
  isMobile?: boolean;
};

export const MainNavigation = component$<Props>((props) => {
  const { menu } = useContent();
  const locale = useLocale();

  const [localeMenu] =
    menu?.items?.filter((item) => {
      return item.text === locale.value;
    }) ?? [];

  return (
    <>
      {localeMenu?.items?.map((item) => (
        <ul
          class={[
            !props.isMobile &&
              `flex justify-center sm:justify-start items-center 
                  mr-4
                  space-x-2 whitespace-nowrap sm:space-x-4`,
            props.isMobile && `space-y-2 whitespace-nowrap text-primary`,
          ]}
          key={item.text}
        >
          {item.items?.map((item) => {
            return (
              <li key={item.text}>
                <NavLink
                  href={item.href}
                  color={props.darkBg ? 'neutral' : 'primary'}
                  size="md"
                  {...(!props.darkBg && {
                    activeClass: 'font-semibold text-accent',
                  })}
                >
                  {item.text}
                </NavLink>
              </li>
            );
          })}
        </ul>
      ))}
    </>
  );
});
