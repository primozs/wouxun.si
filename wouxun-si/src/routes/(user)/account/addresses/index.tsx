import { component$ } from '@builder.io/qwik';
import { UiText } from '~/ui/UiText';
import { UiTitle } from '~/ui/UiTitle';
import { AddressForm } from './AddressForm';

export { useAddressFormLoader } from './AddressForm';

export default component$(() => {
  return (
    <div class="w-full max-w-md">
      <div class="mb-8 flex flex-col gap-y-4">
        <UiTitle>Shipping Addresses</UiTitle>
        <UiText wrap>
          View and update your shipping addresses, you can add as many as you
          like. Saving your addresses will make them available during checkout.
        </UiText>
      </div>

      <AddressForm />
    </div>
  );
});
