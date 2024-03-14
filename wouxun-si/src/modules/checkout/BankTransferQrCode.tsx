import { component$, useSignal, useTask$ } from '@builder.io/qwik';
// @ts-ignore
import generateQrCode from 'sepa-payment-qr-code';
// https://github.com/matjaz/upnqr
// @ts-ignore
import upn from 'upnqr';
import QRCode from 'qrcode';
import { UiTitle } from '~/ui/UiTitle';

export interface BankTransferQrCodeProps {
  amount: number;
  order: string;
}

const name = 'PGC d.o.o.';
const iban = 'SI56101000049496573';
const bic = 'BAKOSI2X';
const street = 'Dražgoše 6a';
const city = '4228 Železniki';
const address = `${street}, ${city}`;

export const BankTransferEPCQrCode = component$<BankTransferQrCodeProps>(
  ({ amount, order }) => {
    const dataUrl = useSignal('');

    useTask$(async () => {
      const qr = generateQrCode({
        name,
        iban,
        amount: amount,
        unstructuredReference: $localize`Stenar order: ${order}`,
        information: address,
        bic,
      });

      const qrCode = await QRCode.toDataURL(qr, {
        errorCorrectionLevel: 'H',
      }).catch(() => '');
      dataUrl.value = qrCode;
    });

    return (
      <div class="flex flex-col">
        <UiTitle>SEPA EPC QR</UiTitle>
        {dataUrl.value && (
          <img alt="SEPA EPC QR" src={dataUrl.value} width={196} height={196} />
        )}
      </div>
    );
  },
);

export const BankTransferUPNQrCode = component$<BankTransferQrCodeProps>(
  ({ amount, order }) => {
    const dataUrl = useSignal('');

    useTask$(async () => {
      const result = upn.encode({
        slog: 'UPNQR',
        polog: false,
        dvig: false,
        ime_placnika: '',
        ulica_placnika: '',
        kraj_placnika: '',
        znesek: amount,
        nujno: true,
        koda_namena: 'OTHR',
        namen_placila: $localize`Stenar order: ${order}`,
        rok_placila: new Date(),
        IBAN_prejemnika: iban,
        referenca_prejemnika: 'SI99',
        ime_prejemnika: name,
        ulica_prejemnika: street,
        kraj_prejemnika: city,
      });

      const qrCode = await QRCode.toDataURL(result, {
        errorCorrectionLevel: 'H',
      }).catch(() => '');
      dataUrl.value = qrCode;
    });

    return (
      <div class="flex flex-col">
        <UiTitle>UPN QR</UiTitle>
        {dataUrl.value && (
          <img alt="UPN QR" src={dataUrl.value} width={196} height={196} />
        )}
      </div>
    );
  },
);
