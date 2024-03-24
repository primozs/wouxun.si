import { type QwikIntrinsicElements, Slot, component$ } from '@builder.io/qwik';

type UiCollapseProps = {
  class?: QwikIntrinsicElements['div']['class'];
  name: string;
  checked?: boolean;
  icon?: 'arrow' | 'plus';
};

export const UiCollapse = component$<UiCollapseProps>(
  ({ name, checked, icon = 'arrow', ...props }) => {
    return (
      <div
        class={[
          'collapse',
          {
            'collapse-arrow': icon === 'arrow',
            'collapse-plus': icon === 'plus',
          },
          props.class,
        ]}
      >
        <input type="radio" name={name} checked={checked} />
        <div class="collapse-title">
          <Slot name="title" />
        </div>
        <div class="collapse-content">
          <Slot name="content" />
        </div>
      </div>
    );
  },
);
