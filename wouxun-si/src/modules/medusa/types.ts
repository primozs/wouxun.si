import type { ProductVariant } from '@medusajs/client-types';

export type CalculatedVariant = ProductVariant & {
  calculated_price: number;
  calculated_price_type: 'sale' | 'default';
  original_price: number;
};

export type ProductPreviewType = {
  id: string;
  title: string;
  handle: string | null;
  thumbnail: string | null;
  created_at?: Date | string;
  price?: {
    calculated_price: string;
    original_price: string;
    difference: string;
    price_type: 'default' | 'sale';
  };
  isFeatured?: boolean;
};
