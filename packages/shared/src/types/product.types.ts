import { TaxProfile } from './order.types'; // reuse from order.types

export type ItemType = 'BANGLE' | 'APPAREL' | 'FABRIC' | 'INNERWEAR' | 'ACCESSORY';
export type MainCategory = 'Sarees' | 'Apparel' | 'Accessories' | 'Innerwear' | 'Bangles';
export type SellingUnit = 'Single Piece' | 'Meter' | 'Set' | 'Pair' | 'Dozen' | 'Pack';

export interface RatingsDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface RatingsMetadata {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: RatingsDistribution;
}

// Base product – shared fields
export interface BaseProduct {
  id: string;
  itemType: ItemType;
  sku: string;
  name: string;
  mainCategory: MainCategory;
  subCategory: string;
  material: string;
  sellingUnit: SellingUnit;
  colors: string[];
  basePrice: number;
  discount: number;
  currentStock: number;
  weightGrams: number;
  isFragile: boolean;
  images: string[];
  tags: string[];
  ratingsMetadata: RatingsMetadata;
  isActive: boolean;
  hsnCode: string;
  taxProfile: TaxProfile;
  createdAt: string;
  updatedAt: string;
}

// Discriminated union for each type
export interface BangleProduct extends BaseProduct {
  itemType: 'BANGLE';
  bangleSizes: ('2.2' | '2.4' | '2.6' | '2.8')[];
  packSize: number;
}

export interface ApparelProduct extends BaseProduct {
  itemType: 'APPAREL';
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Free Size' | '34' | '36' | '38' | '40')[];
  customTailoring: boolean;
  careInstructions?: string;
}

export interface FabricProduct extends BaseProduct {
  itemType: 'FABRIC';
  lengthMeters: number;
  customTailoring: boolean;
}

export interface InnerwearProduct extends BaseProduct {
  itemType: 'INNERWEAR';
  cupSizes: ('32B' | '34B' | '36C' | '34C' | '36D')[];
  isReturnable: boolean;
}

export interface AccessoryProduct extends BaseProduct {
  itemType: 'ACCESSORY';
  sizeDetails: string;
}

export type Product = BangleProduct | ApparelProduct | FabricProduct | InnerwearProduct | AccessoryProduct;

// DTOs for creation / update
export type CreateProductRequest = Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'ratingsMetadata'>;
export type UpdateProductRequest = Partial<CreateProductRequest>;