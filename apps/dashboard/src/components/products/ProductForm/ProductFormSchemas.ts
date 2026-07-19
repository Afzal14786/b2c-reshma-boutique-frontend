import { z } from 'zod';
import { TaxProfile } from '@repo/shared';
import { productTypeConfig } from './productTypeConfig';

// Base schema shared by all types
const baseSchema = z.object({
  sku: z.string().min(3, 'SKU is required').toUpperCase(),
  name: z.string().min(2, 'Name is required'),
  mainCategory: z.enum(['Sarees', 'Apparel', 'Accessories', 'Innerwear', 'Bangles']),
  subCategory: z.string().min(2, 'Sub-category is required'),
  material: z.string().min(2, 'Material is required'),
  sellingUnit: z.enum(['Single Piece', 'Meter', 'Set', 'Pair', 'Dozen', 'Pack']),
  colors: z.string().default(''), // comma‑separated string
  basePrice: z.number().min(0, 'Price cannot be negative'),
  discount: z.number().min(0).max(100).default(0),
  currentStock: z.number().int().min(0, 'Stock cannot be negative'),
  weightGrams: z.number().min(0, 'Weight is required'),
  isFragile: z.boolean().default(false),
  hsnCode: z.string().regex(/^[0-9]{4,8}$/, 'HSN code must be 4-8 digits'),
  taxProfile: z.nativeEnum(TaxProfile, {
    message: 'Please select a valid tax profile',
  }),
  tags: z.string().default(''), // comma‑separated string
  isActive: z.boolean().default(true),
});

export function buildProductSchema(itemType: string) {
  const typeFields = productTypeConfig[itemType] || [];
  const shape: any = { itemType: z.literal(itemType) };

  typeFields.forEach((field) => {
    switch (field.type) {
      case 'number':
        shape[field.key] = field.required
          ? z.number({ message: `${field.label} is required` }).min(0)
          : z.number().optional();
        break;
      case 'checkbox':
        shape[field.key] = z.boolean().default(field.defaultValue ?? false);
        break;
      case 'multiCheckbox':
        shape[field.key] = field.required
          ? z.array(z.string()).min(1, `Select at least one ${field.label}`)
          : z.array(z.string()).optional();
        break;
      default:
        shape[field.key] = field.required
          ? z.string().min(1, `${field.label} is required`)
          : z.string().optional();
    }
  });

  return baseSchema.extend(shape);
}
