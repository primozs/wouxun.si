import { Region } from '@medusajs/client-types';

export type RegionInfo = Pick<
  Region,
  'currency_code' | 'tax_code' | 'tax_rate'
>;
