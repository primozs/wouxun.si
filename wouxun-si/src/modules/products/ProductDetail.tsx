import { type Signal, component$, useSignal } from '@builder.io/qwik';
import { mdParse } from '~/ui/md-parse';
import type { ProductDetail } from '~/modules/products/getDirectusProductData';
import { ProductPrice } from './Price';
import type { PricedProduct } from '@medusajs/client-types';
import { Button } from '~/ui/button';
import { useNotifications } from '~/ui/notification/notificationsState';
import { useAddToCartAction } from '~/routes/plugin@store';
import { IoBagHandleOutline } from '@qwikest/icons/ionicons';
import { UiTitle } from '~/ui/UiTitle';
import { Tags } from './Tags';

export interface DetailsProps {
  product: Signal<{
    productDirectus: ProductDetail | null;
    productMedusa: PricedProduct | null;
  }>;
}

export const ProductDetailView = component$<DetailsProps>(({ product }) => {
  return (
    <div class="flex flex-col">
      <div class="flex flex-col gap-y-6">
        <div class="flex flex-col gap-y-2">
          {/* {product.value.productMedusa?.collection && (
            <NavLink
              href={`/collections/${product.value.productMedusa.collection.handle}`}
              color="ghost"
            >
              {product.value.productMedusa.collection.title}
            </NavLink>
          )} */}
          <UiTitle as="h1" size="2xl" color="primary">
            {product.value.productDirectus?.title}
          </UiTitle>

          <ProductPrice product={product.value.productMedusa} />
          <div class="flex flex-col">
            <AddToCart
              productMedusa={product.value.productMedusa}
              productDirectus={product.value.productDirectus}
            />
          </div>
        </div>

        <div class="flex flex-col gap-y-4">
          <Tags product={product.value.productDirectus} />

          <article
            class="prose"
            dangerouslySetInnerHTML={mdParse(
              product.value.productDirectus?.description,
            )}
          />
        </div>
      </div>
    </div>
  );
});

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
