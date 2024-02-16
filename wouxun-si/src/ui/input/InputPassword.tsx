import { $, component$, sync$, useSignal } from '@builder.io/qwik';
import { TextInput, type TextInputProps } from './TextInput';
import { EyeIcon } from '../icons/eye-icon';
import { EyeOffIcon } from '../icons/eye-off-icon';

export const InputPassword = component$<TextInputProps>((props) => {
  const showPassword = useSignal(false);
  const type = useSignal<'text' | 'password'>('password');
  return (
    <TextInput {...props} type={type.value}>
      <div
        q:slot="icon-right"
        class="absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <button
          type="button"
          disabled={false}
          class={[
            `
            focus:outline-none 
            transition-all 
            duration-150 
            outline-none 
            cursor-pointer             
            `,
          ]}
          onClick$={[
            sync$((e: MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
            }),
            $(() => {
              showPassword.value = !showPassword.value;
              if (showPassword.value) {
                type.value = 'text';
              } else {
                type.value = 'password';
              }
            }),
          ]}
        >
          {showPassword.value === false ? (
            <EyeOffIcon class="text-gray-400" />
          ) : (
            <EyeIcon class="text-gray-400" />
          )}
        </button>
      </div>
    </TextInput>
  );
});
