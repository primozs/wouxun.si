import { component$, useSignal } from '@builder.io/qwik';
import { IoLanguageOutline } from '@qwikest/icons/ionicons';
import { UiIcon } from '~/ui/UiIcon';
import { UiList } from '~/ui/UiList';
import { UiItem } from '~/ui/UiItem';
import { UiLabel } from '~/ui/UiLabel';
import { Button } from '~/ui/button';
import { UiConfirm, useUiConfirm } from '~/ui/UiConfirm';
import { useChangeLocaleAction, useLocaleLoader } from '~/routes/plugin';
import { UiContent } from '~/ui/UiContent';
import { IoCheckmarkOutline } from '@qwikest/icons/ionicons';
import { UiSelect, UiSelectOption } from '~/ui/UiSelect';

const locales = [
  { key: 'en', label: 'English' },
  { key: 'sl', label: 'Slovenščina' },
];

export const SwitchLocale = component$(() => {
  const { uiConfirm } = useUiConfirm();
  const locale = useLocaleLoader();
  const selectedLocale = useSignal<string>(locale.value);
  const action = useChangeLocaleAction();

  return (
    <>
      <Button
        type="button"
        color="primary"
        fill="outline"
        intent="square"
        class="hidden md:flex"
        aria-label={$localize`Change language`}
        onClick$={async () => {
          const confirmed = await uiConfirm({
            title: $localize`Language`,
          });

          if (!confirmed) {
            selectedLocale.value = locale.value;
            return;
          }

          await action.submit({ locale: selectedLocale.value });

          window.location.reload();
        }}
      >
        <span class="sr-only">{$localize`Change language`}</span>
        <UiIcon>
          <IoLanguageOutline />
        </UiIcon>
      </Button>
      <UiConfirm>
        <UiContent>
          <UiList inset>
            {locales.map((item) => {
              return (
                <UiItem
                  key={item.key}
                  lines="none"
                  onClick$={() => {
                    selectedLocale.value = item.key;
                  }}
                >
                  <UiLabel>{item.label}</UiLabel>

                  {selectedLocale.value === item.key && (
                    <UiIcon q:slot="end">
                      <IoCheckmarkOutline />
                    </UiIcon>
                  )}
                </UiItem>
              );
            })}
          </UiList>
        </UiContent>
      </UiConfirm>
    </>
  );
});

export const SwitchLocaleListItem = component$(() => {
  const { uiConfirm } = useUiConfirm();
  const locale = useLocaleLoader();
  const selectedLocale = useSignal<string>(locale.value);
  const action = useChangeLocaleAction();

  return (
    <>
      <UiItem overflow="initial" border="top">
        <UiIcon q:slot="start">
          <IoLanguageOutline></IoLanguageOutline>
        </UiIcon>

        <UiSelect
          value={locale.value}
          label={$localize`Change language`}
          onClick$={async () => {
            const confirmed = await uiConfirm({
              title: $localize`Language`,
            });

            if (!confirmed) {
              selectedLocale.value = locale.value;
              return;
            }

            await action.submit({ locale: selectedLocale.value });

            window.location.reload();
          }}
        >
          <span q:slot="selected">
            {locales.find((item) => item.key === locale.value)?.label}
          </span>

          {locales.map((item) => {
            return <UiSelectOption key={item.key}>{item.label}</UiSelectOption>;
          })}
        </UiSelect>
      </UiItem>

      <UiConfirm>
        <UiContent>
          <UiList inset>
            {locales.map((item) => {
              return (
                <UiItem
                  key={item.key}
                  lines="none"
                  onClick$={() => {
                    selectedLocale.value = item.key;
                  }}
                >
                  <UiLabel>{item.label}</UiLabel>

                  {selectedLocale.value === item.key && (
                    <UiIcon q:slot="end">
                      <IoCheckmarkOutline />
                    </UiIcon>
                  )}
                </UiItem>
              );
            })}
          </UiList>
        </UiContent>
      </UiConfirm>
    </>
  );
});
