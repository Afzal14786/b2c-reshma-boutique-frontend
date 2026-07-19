export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FLAT = 'FLAT',
}

export enum PaymentRestriction {
  ANY = 'ANY',
  PREPAID = 'PREPAID',
  COD = 'COD',
}

export interface Coupon {
  id: string;
  code: string;
  discountType: DiscountType;
  discountValue: number;
  maxDiscountAmount?: number;
  minCartValue: number;
  startDate: string;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
  isFirstOrderOnly: boolean;
  paymentMethodRestriction: PaymentRestriction;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCouponRequest {
  code: string;
  discountType: DiscountType;
  discountValue: number;
  maxDiscountAmount?: number;
  minCartValue?: number;
  startDate: string;
  expiryDate: string;
  usageLimit: number;
  isActive?: boolean;
  isFirstOrderOnly?: boolean;
  paymentMethodRestriction?: PaymentRestriction;
}

export type UpdateCouponRequest = Partial<CreateCouponRequest>;

export interface ApplyCouponRequest {
  code: string;
}

export interface CouponValidationResponse {
  valid: boolean;
  discount: number;
  message?: string;
}