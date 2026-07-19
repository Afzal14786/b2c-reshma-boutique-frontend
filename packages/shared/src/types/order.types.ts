export enum TaxProfile {
  IMITATION_JEWELLERY = 'IMITATION_JEWELLERY',
  LAC_JEWELLERY = 'LAC_JEWELLERY',
  UNSTITCHED_FABRIC = 'UNSTITCHED_FABRIC',
  STITCHED_APPAREL = 'STITCHED_APPAREL',
  GENERAL_ACCESSORY = 'GENERAL_ACCESSORY',
  FOOTWEAR = 'FOOTWEAR',
}


export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
export type OrderStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'RETURN_REQUESTED'
  | 'RETURNED';
export type PaymentMethod = 'RAZORPAY' | 'COD';

export interface OrderShippingAddress {
  fullName: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  product: string;
  name: string;
  sku: string;
  quantity: number;
  priceAtPurchase: number;
  selectedAttributes?: Record<string, string>;
  imageSnapshot: string;
  hsnCode: string;
  taxableValue: number;
  gstRate: number;
  cgst: number;
  sgst: number;
  igst: number;
}

export interface OrderPricing {
  subTotal: number;
  discountAmount: number;
  appliedCoupon: string | null;
  totalTax: number;
  totalCgst: number;
  totalSgst: number;
  totalIgst: number;
  shippingCost: number;
  shippingTax: number;
  totalAmount: number;
}

export interface Order {
  id: string;
  user: string;
  orderNumber: string;
  items: OrderItem[];
  shippingAddress: OrderShippingAddress;
  pricing: OrderPricing;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  courierName?: string;
  shiprocketOrderId?: string;
  shiprocketShipmentId?: string;
  gatewayOrderId?: string;
  gatewayPaymentId?: string;
  gatewaySignature?: string;
  invoiceUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutRequest {
  shippingAddress: OrderShippingAddress;
  paymentMethod: PaymentMethod;
}

export interface PaymentVerificationRequest {
  gatewayOrderId: string;
  gatewayPaymentId: string;
  gatewaySignature: string;
}

export interface DispatchOrderRequest {
  length: number;
  breadth: number;
  height: number;
  weight: number;
}

export interface UpdateOrderStatusRequest {
  orderStatus: OrderStatus;
  trackingNumber?: string;
  courierName?: string;
}