export interface WishlistItem {
  product: string; // ObjectId
  addedAt: string;
}

export interface Wishlist {
  id: string;
  user: string;
  items: WishlistItem[];
  createdAt: string;
  updatedAt: string;
}

export interface AddWishlistItemRequest {
  productId: string;
}

export interface MoveToCartRequest {
  quantity?: number;
  selectedAttributes?: Record<string, string | number | boolean>;
}