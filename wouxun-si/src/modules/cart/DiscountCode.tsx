import { component$ } from '@builder.io/qwik';
import { IoInformationCircle } from '@qwikest/icons/ionicons';
import { UiIcon } from '~/ui/UiIcon';
import { UiText } from '~/ui/UiText';
import { UiTooltip } from '~/ui/UiTooltip';

export interface DiscountCodeProps {}

export const DiscountCode = component$<DiscountCodeProps>((props) => {
  return (
    <>
      <details class="appearance-none">
        <summary class="cursor-pointer">
          <UiText color="primary">
            {$localize`Add gift card or discount code`}{' '}
            <UiTooltip
              tip={$localize`You can add multiple gift cards, but only one discount code.`}
            >
              <UiIcon size="sm">
                <IoInformationCircle />
              </UiIcon>
            </UiTooltip>
          </UiText>
        </summary>

        <p>hello</p>
      </details>
    </>
  );
});
