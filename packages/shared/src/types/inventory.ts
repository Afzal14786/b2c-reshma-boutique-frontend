export interface Inventory {
  productId: string;
  productName: string;
  stock: number;
  threshold: number;
  variantId?: string;
  variantAttributes?: Record<string, any>;
  lastUpdated: string;
}