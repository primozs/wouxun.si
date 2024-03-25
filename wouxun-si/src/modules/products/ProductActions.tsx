import {
  component$,
  useComputed$,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import type { PricedProduct } from '@medusajs/client-types';
import { ProductOptionSelect } from './ProductOptionSelect';
import { UiDivider } from '~/ui/UiDivider';
import { isEqual } from 'lodash-es';
import { ProductActionsPrice } from './Price';
import { useAddToCartAction, useGetRegionLoader } from '~/routes/plugin@store';
import { Button } from '~/ui/button';
import { useNotifications } from '~/ui/notification/notificationsState';
import { IoBagHandleOutline } from '@qwikest/icons/ionicons';
import type { ProductDetail } from './getDirectusProductData';

export interface ProductActionsProps {
  product: PricedProduct;
  productDirectus: ProductDetail | null;
}

export const ProductActions = component$<ProductActionsProps>(
  ({ product, productDirectus }) => {
    const action = useAddToCartAction();
    const adding = useSignal(false);
    const { addNotification } = useNotifications();

    const region = useGetRegionLoader();
    const optionsSelection = useSignal<Record<string, string>>(
      Object.fromEntries(
        (product.options ?? []).map((option) => [option.id, '']),
      ),
    );

    const variants = useComputed$(() => product.variants ?? []);

    const variantRecord = useComputed$(() => {
      const map: Record<string, Record<string, string>> = {};

      for (const variant of product.variants ?? []) {
        if (!variant.options || !variant.id) continue;

        const temp: Record<string, string> = {};

        for (const option of variant.options) {
          temp[option.option_id] = option.value;
        }

        map[variant.id] = temp;
      }

      return map;
    });

    const variant = useComputed$(() => {
      let variantId: string | undefined = undefined;

      for (const key of Object.keys(variantRecord.value)) {
        if (isEqual(variantRecord.value[key], optionsSelection.value)) {
          variantId = key;
        }
      }

      return variants.value.find((v) => v.id === variantId);
    });

    useTask$(({ track }) => {
      track(variants);
      track(variantRecord);
      const vars = variants.value;
      const vari = vars[0];
      if (vars.length === 1 && vari && vari.id) {
        optionsSelection.value = {
          ...optionsSelection.value,
          ...variantRecord.value[vari.id],
        };
      }
    });

    const inStock = useComputed$(() => {
      const vari = variant.value;
      if (!vari) return false;

      if (vari.manage_inventory === false) return true;

      if (vari.allow_backorder === true) return true;

      return !!vari.inventory_quantity;
    });

    if (!productDirectus) return null;
    const directusId = productDirectus.id;
    const thumbnailId = productDirectus.thumbnail;

    return (
      <div class="flex flex-col gap-y-3">
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div class="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <ProductOptionSelect
                      option={option}
                      optionsSelection={optionsSelection}
                      title={option.title}
                    />
                  </div>
                );
              })}
              <UiDivider />
            </div>
          )}
        </div>

        <ProductActionsPrice
          product={product}
          variant={variant}
          region={region}
        />

        <Button
          disabled={!inStock.value || !variant.value}
          color="primary"
          class="w-full sm:max-w-[250px]"
          onClick$={async () => {
            adding.value = !adding.value;

            const { value } = await action.submit({
              variantId: variant.value?.id ?? '',
              directusId,
              thumbnailId,
            });

            if (value.failed) {
              addNotification({
                type: 'error',
                title: $localize`Error add to cart`,
              });
            }

            adding.value = false;
          }}
          loading={adding.value}
        >
          <IoBagHandleOutline class="h-5 w-5" />
          {!variant.value
            ? $localize`Select variant`
            : !inStock
              ? $localize`Out of stock`
              : $localize`Add to cart`}
        </Button>
      </div>
    );
  },
);
