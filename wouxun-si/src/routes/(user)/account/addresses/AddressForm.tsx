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
import { getMedusaClient, getSrvSessionHeaders } from '~/services/medusa';
import { handleError } from '~/services/logger';
import { TextInput } from '~/ui/input/TextInput';
import { Response } from '~/ui/input/Response';
import { FormButton } from '~/ui/input/FormButton';
import { useGetRegionLoader } from '~/routes/plugin@store';
import { Select } from '~/ui/input/Select';
import { InputPhone } from '~/ui/input/InputPhone';
import { config } from '~/config';

export interface AddressFormProps {}

type AddressForm = v.Input<typeof AddressSchema>;

const AddressSchema = v.object({
  first_name: v.string([v.minLength(1, 'Prosimo vpišite ime')]),
  last_name: v.string([v.minLength(1, 'Prosimo vpišite priimek')]),
  company: v.string(),
  address_1: v.string([v.minLength(1, 'Prosimo vpišite naslov')]),
  address_2: v.string(),
  postal_code: v.string([v.minLength(1, 'Prosimo vpišite poštno številko')]),
  city: v.string([v.minLength(1, 'Prosimo vpišite mesto')]),
  province: v.string(),
  country_code: v.string([v.minLength(1, 'Prosimo vpišite državo')]),
  phone: v.string(),
});

// eslint-disable-next-line qwik/loader-location
export const useAddressFormLoader = routeLoader$<InitialValues<AddressForm>>(
  async () => {
    const loaderData = {
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
    return loaderData;
  },
);

type ResponseType = any;

export const useFormAction = formAction$<AddressForm, ResponseType>(
  async (data, event) => {
    try {
      const client = getMedusaClient();
      const res = await client.customers.addresses.addAddress(
        { address: { metadata: {}, ...data } },
        getSrvSessionHeaders(event),
      );

      return {
        status: 'success',
        message: 'Added success',
        data: { customer: res.customer },
      };
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
            <Select
              {...props}
              label="Država"
              placeholder="Vpišite državo"
              auto-complete="country"
              required
              value={field.value}
              error={field.error}
              options={
                region.value?.countries?.map((item) => {
                  return {
                    label: item.name,
                    value: item.iso_2,
                  };
                }) ?? []
              }
            />
          )}
        </Field>

        <Field name="phone">
          {(field, props) => (
            <InputPhone
              {...props}
              of={addressForm}
              label="Telefon"
              placeholder="Vpišite telefon"
              auto-complete="phone"
              value={field.value}
              error={field.error}
              country={config.DEFAULT_COUNTRY}
            />
          )}
        </Field>

        <div>
          <Response of={addressForm} />
        </div>

        <div class="flex justify-end">
          <FormButton type="submit" loading={addressForm.submitting}>
            Shrani
          </FormButton>
        </div>
      </Form>
    </div>
  );
});
