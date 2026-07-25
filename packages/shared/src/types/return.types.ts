export enum ReturnStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export enum ReturnReason {
  DEFECTIVE = 'DEFECTIVE',
  WRONG_ITEM = 'WRONG_ITEM',
  SIZE_ISSUE = 'SIZE_ISSUE',
  NOT_NEEDED = 'NOT_NEEDED',
}

export interface ReturnItem {
  product: string; // ObjectId
  quantity: number;
  reason: ReturnReason;
  customerNote?: string;
}

export interface Return {
  id: string;
  user: string;
  order: string;
  items: ReturnItem[];
  status: ReturnStatus;
  proofOfDamageImages: string[];
  refundAmountEstimate: number;
  adminRejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InitiateReturnRequest {
  items: Omit<ReturnItem, 'product'> & { productId: string }[];
  images?: string[];
}

export interface ArbitrateReturnRequest {
  status: ReturnStatus.APPROVED | ReturnStatus.REJECTED;
  adminRejectionReason?: string;
}