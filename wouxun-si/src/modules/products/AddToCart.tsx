import { component$, useSignal } from '@builder.io/qwik';
import type { ProductDetail } from '~/modules/products/getDirectusProductData';
import type { PricedProduct } from '@medusajs/client-types';
import { Button } from '~/ui/button';
import { useNotifications } from '~/ui/notification/notificationsState';
import { useAddToCartAction } from '~/routes/plugin@store';
import { IoBagHandleOutline } from '@qwikest/icons/ionicons';

export interface AddToCartProps {
  productMedusa: PricedProduct | null;
  productDirectus: ProductDetail | null;
}

export const AddToCart = component$<AddToCartProps>(
  ({ productMedusa, productDirectus }) => {
    const action = useAddToCartAction();

    const adding = useSignal(false);
    const { addNotification } = useNotifications();

    if (!productMedusa || !productDirectus) return null;
    const variantId = productMedusa?.variants![0]?.id;
    const directusId = productDirectus.id;
    const thumbnailId = productDirectus.thumbnail;

    return (
      <>
        {variantId && (
          <Button
            class="sm:max-w-[250px]"
            color="primary"
            onClick$={async () => {
              adding.value = !adding.value;

              const { value } = await action.submit({
                variantId: variantId ?? '',
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
            // disabled={adding.value}
          >
            <IoBagHandleOutline class="h-5 w-5" />
            {$localize`Add to cart`}
          </Button>
        )}
      </>
    );
  },
);
