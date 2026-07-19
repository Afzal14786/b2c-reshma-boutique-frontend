export enum InteractionType {
  REVIEW = 'REVIEW',
  COMMENT = 'COMMENT',
}

export interface Interaction {
  id: string;
  productId: string;
  userId: string;
  type: InteractionType;
  rating?: number;
  title?: string;
  content: string;
  images: string[];
  likes: string[];
  dislikes: string[];
  parentId: string | null;
  isVerifiedPurchase: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInteractionRequest {
  productId: string;
  type: InteractionType;
  rating?: number;
  title?: string;
  content: string;
  images?: string[];
  parentId?: string | null;
}

export interface VoteInteractionRequest {
  action: 'LIKE' | 'DISLIKE';
}