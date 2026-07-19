export type AttributeValue = string | number | boolean;

export interface CartItem {
  productId: string; // we'll use productId in requests
  quantity: number;
  selectedAttributes?: Record<string, AttributeValue>;
}

export interface CartItemResponse {
  product: {
    _id: string;
    name: string;
    price: number;
    images: { url: string; altText?: string }[];
    inStock: boolean;
    stockQuantity: number;
    productType: string;
  } | null;
  quantity: number;
  selectedAttributes?: Record<string, AttributeValue>;
  itemTotal: number;
  error?: string;
}

export interface CartResponse {
  _id: string;
  user: string;
  items: CartItemResponse[];
  subtotal: number;
  totalQuantity: number;
  appliedCoupon?: string | null;
  discountAmount: number;
  totalAfterDiscount: number;
}

export interface AddItemRequest {
  productId: string;
  quantity: number;
  selectedAttributes?: Record<string, AttributeValue>;
}

export interface UpdateItemRequest {
  productId: string;
  quantity?: number;
  selectedAttributes?: Record<string, AttributeValue>;
}

export interface MergeCartRequest {
  items: CartItem[];
}