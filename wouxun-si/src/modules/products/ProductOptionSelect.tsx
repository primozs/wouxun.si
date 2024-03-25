import { type Signal, component$, useComputed$ } from '@builder.io/qwik';
import type { ProductOption } from '@medusajs/client-types';
import { UiTitle } from '~/ui/UiTitle';

export interface ProductOptionSelectProps {
  title: string;
  option: ProductOption;
  optionsSelection: Signal<Record<string, string>>;
}

const onlyUnique = (value: unknown, index: number, self: unknown[]) =>
  self.indexOf(value) === index;

export const ProductOptionSelect = component$<ProductOptionSelectProps>(
  ({ title, option, optionsSelection }) => {
    const filteredOptions = useComputed$(() => {
      return option.values?.map((v) => v.value).filter(onlyUnique) ?? [];
    });

    return (
      <div class="flex flex-col gap-y-3">
        <UiTitle>
          {$localize`Select`} {title}
        </UiTitle>
        <div class="flex flex-wrap justify-between gap-2">
          {filteredOptions.value.map((v) => {
            return (
              <button
                onClick$={() => {
                  optionsSelection.value = {
                    ...optionsSelection.value,
                    [option.id]: v,
                  };
                }}
                key={v}
                class={[
                  'btn btn-sm flex-1',
                  {
                    'btn-primary': v === optionsSelection.value[option.id],
                    'btn-primary btn-outline':
                      v !== optionsSelection.value[option.id],
                  },
                ]}
              >
                {v}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);
