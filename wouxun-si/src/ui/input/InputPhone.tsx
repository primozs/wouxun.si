// - [intl-tel-input](https://github.com/jackocnr/intl-tel-input)
// - [libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js)
// - [region-flags](https://github.com/fonttools/region-flags)
// - [geoip-country](https://github.com/sapics/geoip-country)

import {
  component$,
  useVisibleTask$,
  useSignal,
  useStyles$,
  type QRL,
  $,
  type PropFunction,
} from '@builder.io/qwik';
import intlTelInput from 'intl-tel-input';
import globalStyles from 'intl-tel-input/build/css/intlTelInput.css?inline';
import { TextInput, type TextInputProps } from './TextInput';

type InputPhoneProps = Omit<TextInputProps, 'ref' | 'type'> & {
  country?: string | null;
  isValid?: PropFunction<(name: string, value: string, valid: boolean) => void>;
};

export const InputPhone = component$<InputPhoneProps>(
  ({
    value,
    country,
    isValid,
    // onInput$,
    onBlur$,
    ...props
  }) => {
    const utilsLoaded = useSignal(false);
    useStyles$(globalStyles);
    useStyles$(`
      .iti { width: 100%; }
      .iti__flag {background-image: url("/phone/flags.png");}

      @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
        .iti__flag {background-image: url("/phone/flags@2x.png");}
      }
    `);

    const input = useSignal<HTMLInputElement>();

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {
      track(() => input.value);

      if (!input.value) return;

      const iti = intlTelInput(input.value, {
        initialCountry: country ?? 'si',
        formatOnDisplay: true,
        nationalMode: true,
      });

      if (utilsLoaded.value === false) {
        window.intlTelInputGlobals
          .loadUtils('/phone/phone-utils.js')
          // @ts-ignore
          .then(() => {
            // set init value
            if (value) iti.setNumber(value as string);
          })
          .catch(() => {
            //
          });
        utilsLoaded.value = true;
      }

      return () => {
        // throws error
        // iti?.destroy();
        try {
          iti?.destroy();
        } catch {}
      };
    });

    const onBlur = onBlur$ as QRL<Function | undefined>;
    // const onInput = onInput$ as QRL<Function | undefined>;
    const name = props.name;

    return (
      <TextInput
        {...props}
        value={value}
        ref={input}
        type="tel"
        class="iti__tel-input"
        onBlur$={$((...args) => {
          onBlur(...args);
          if (input.value) {
            const iti = window.intlTelInputGlobals.getInstance(input.value);
            const value = iti.getNumber(intlTelInputUtils.numberFormat.E164);
            const isNumberValid = iti.isValidNumber();
            console.log(value, isNumberValid);
            isValid && isValid(name, value, isNumberValid);
          }
        })}
        onInput$={$(() => {
          // onInput(...args);
          // if (input.value) {
          //   const iti = window.intlTelInputGlobals.getInstance(input.value);
          //   const value = iti.getNumber(intlTelInputUtils.numberFormat.E164);
          //   const isNumberValid = iti.isValidNumber();
          //   console.log(value, isNumberValid);
          // }
        })}
      ></TextInput>
    );
  },
);
