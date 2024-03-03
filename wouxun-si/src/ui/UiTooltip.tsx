import { type QwikIntrinsicElements, Slot, component$ } from '@builder.io/qwik';

export interface UiTooltipProps {
  tip: string;
  class?: QwikIntrinsicElements['div']['class'];
  color?: 'primary' | 'secondary';
}

export const UiTooltip = component$<UiTooltipProps>(
  ({ color = 'primary', ...props }) => {
    return (
      <tool-tip
        // inert
        role="tooltip"
        class={[
          'ui-tooltip',
          'tooltip',
          {
            'tooltip-primary': color === 'primary',
            'tooltip-secondary': color === 'secondary',
          },
          props.class,
        ]}
        data-tip={props.tip}
      >
        <span class="sr-only">{props.tip}</span>
        <Slot></Slot>
      </tool-tip>
    );
  },
);
