import { component$ } from '@builder.io/qwik';
import { UiTitle } from '~/ui/UiTitle';
import * as v from 'valibot';
import { routeLoader$ } from '@builder.io/qwik-city';
import {
  formAction$,
  FormError,
  valiForm$,
  type InitialValues,
  useForm,
} from '@modular-forms/qwik';
import { getMedusaClient } from '~/services/medusa';
import { handleError } from '~/services/logger';
import { TextInput } from '~/ui/input/TextInput';
import { Response } from '~/ui/input/Response';
import { FormButton } from '~/ui/input/FormButton';
import { useGetRegionLoader } from '~/routes/plugin@store';

export interface AddressFormProps {}

type AddressForm = v.Input<typeof AddressSchema>;

const AddressSchema = v.object({
  first_name: v.string([v.minLength(1, 'Prosimo vpišite ime')]),
  last_name: v.string([v.minLength(1, 'Prosimo vpišite priimek')]),
  company: v.optional(v.string([v.minLength(1, 'Prosimo vpišite podjetje')])),
  address_1: v.string([v.minLength(1, 'Naslov 1')]),
  address_2: v.optional(v.string([v.minLength(1, 'Naslov 2')])),
  postal_code: v.string([v.minLength(1, 'Poštna številka')]),
  city: v.string([v.minLength(1, 'Mesto')]),
  province: v.optional(v.string([v.minLength(1, 'Provinca')])),
  country_code: v.string([v.minLength(1, 'Country')]),
  phone: v.string([v.minLength(1, 'Country')]),
});

// eslint-disable-next-line qwik/loader-location
export const useAddressFormLoader = routeLoader$<InitialValues<AddressForm>>(
  async () => {
    return {
      first_name: '',
      last_name: '',
      company: '',
      address_1: '',
      address_2: '',
      postal_code: '',
      city: '',
      province: '',
      country_code: '',
      phone: '',
    };
  },
);

type ResponseType = any;

export const useFormAction = formAction$<AddressForm, ResponseType>(
  async (data, event) => {
    const client = getMedusaClient();

    // const existRes = await client.auth.exists(user.email);
    // if (existRes.exists) {
    //   throw new FormError<RegisterForm>({
    //     email: 'Uporabnik s tem e-naslovom že obstaja.',
    //   });
    // }

    try {
      // await client.customers.create(user);
      // return event.redirect(302, '/login');
    } catch (error: any) {
      handleError(error);
      throw new FormError<AddressForm>('Pošiljanje naslova ni bilo uspešno.');
    }
  },
  valiForm$(AddressSchema),
);

export const AddressForm = component$<AddressFormProps>(() => {
  const region = useGetRegionLoader();
  const [addressForm, { Form, Field }] = useForm<AddressForm>({
    loader: useAddressFormLoader(),
    validate: valiForm$(AddressSchema),
    action: useFormAction(),
  });

  return (
    <div class="space-y-4">
      <UiTitle size="2xl">Address</UiTitle>
      <Form id="address-form" class="space-y-4">
        <div class="grid grid-cols-2 gap-x-2">
          <Field name="first_name">
            {(field, props) => (
              <TextInput
                {...props}
                type="text"
                label="Ime"
                placeholder="Vpišite ime"
                auto-complete="given-name"
                required
                value={field.value}
                error={field.error}
              />
            )}
          </Field>

          <Field name="last_name">
            {(field, props) => (
              <TextInput
                {...props}
                type="text"
                label="Priimek"
                placeholder="Vpišite priimek"
                auto-complete="family-name"
                value={field.value}
                error={field.error}
                required
              />
            )}
          </Field>
        </div>

        <Field name="company">
          {(field, props) => (
            <TextInput
              {...props}
              type="text"
              label="Podjetje"
              placeholder="Vpišite podjetje"
              auto-complete="organization"
              value={field.value}
              error={field.error}
            />
          )}
        </Field>

        <Field name="address_1">
          {(field, props) => (
            <TextInput
              {...props}
              type="text"
              label="Naslov"
              placeholder="Vpišite naslov"
              auto-complete="address-line1"
              required
              value={field.value}
              error={field.error}
            />
          )}
        </Field>

        <Field name="address_2">
          {(field, props) => (
            <TextInput
              {...props}
              type="text"
              label="Naslov 2"
              placeholder="Vpišite naslov 2"
              auto-complete="address-line2"
              value={field.value}
              error={field.error}
            />
          )}
        </Field>

        <div class="grid grid-cols-[144px_1fr] gap-x-2">
          <Field name="postal_code">
            {(field, props) => (
              <TextInput
                {...props}
                type="text"
                label="Poštna številka"
                placeholder="Vpišite poštno številko"
                auto-complete="postal-code"
                required
                value={field.value}
                error={field.error}
              />
            )}
          </Field>
          <Field name="city">
            {(field, props) => (
              <TextInput
                {...props}
                type="text"
                label="Mesto"
                placeholder="Vpišite mesto"
                auto-complete="locality"
                required
                value={field.value}
                error={field.error}
              />
            )}
          </Field>
        </div>

        <Field name="province">
          {(field, props) => (
            <TextInput
              {...props}
              type="text"
              label="Provinca / Država"
              placeholder="Vpišite provinco državo"
              auto-complete="address-level1"
              value={field.value}
              error={field.error}
            />
          )}
        </Field>

        <Field name="country_code">
          {(field, props) => (
            <TextInput
              {...props}
              type="text"
              label="Država"
              placeholder="Vpišite državo"
              auto-complete="country"
              required
              value={field.value}
              error={field.error}
            />
          )}
        </Field>

        <Field name="phone">
          {(field, props) => (
            <TextInput
              {...props}
              type="tel"
              label="Telefon"
              placeholder="Vpišite telefon"
              auto-complete="phone"
              value={field.value}
              error={field.error}
            />
          )}
        </Field>

        <div>
          <Response of={addressForm} />
        </div>

        <div class="flex flex-col">
          <FormButton type="submit" loading={addressForm.submitting}>
            Pošlji
          </FormButton>
        </div>
      </Form>
    </div>
  );
});
