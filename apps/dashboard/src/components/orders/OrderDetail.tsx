'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import {
  Card,
  Badge,
  StatusBadge,
  Button,
  Select,
  DataTable,
  Avatar,
  Spinner,
} from '@repo/ui';
import {
  Truck,
  FileText,
  Package,
  User,
  MapPin,
  Receipt,
} from 'lucide-react';
import type { Order } from '@repo/shared';

// ─── Props ──────────────────────────────────────────────────────

interface OrderDetailProps {
  order: Order;
  loading?: boolean;
  onStatusUpdate: (orderId: string, newStatus: Order['orderStatus']) => Promise<void>;
  onDispatch: () => void;
  onInvoice: () => void;
}

// ─── Status options ────────────────────────────────────────────

const statusOptions = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'PROCESSING', label: 'Processing' },
  { value: 'SHIPPED', label: 'Shipped' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'RETURN_REQUESTED', label: 'Return Requested' },
  { value: 'RETURNED', label: 'Returned' },
];

// ─── Component ─────────────────────────────────────────────────

export const OrderDetail = ({
  order,
  loading = false,
  onStatusUpdate,
  onDispatch,
  onInvoice,
}: OrderDetailProps) => {
  const [updating, setUpdating] = useState(false);

  const handleStatusChange = async (newStatus: Order['orderStatus']) => {
    setUpdating(true);
    try {
      await onStatusUpdate(order.id, newStatus);
    } finally {
      setUpdating(false);
    }
  };

  // ─── Order items table columns ───────────────────────────────

  const itemColumns = [
    {
      key: 'image',
      header: 'Product',
      render: (item: Order['items'][0]) => (
        <div className="flex items-center gap-3">
          <img
            src={item.imageSnapshot || '/placeholder.png'}
            alt={item.name}
            className="w-12 h-12 object-cover rounded-btn border border-glass-border"
          />
          <div>
            <p className="font-medium text-text-primary">{item.name}</p>
            <p className="text-xs text-text-secondary">SKU: {item.sku}</p>
          </div>
        </div>
      ),
    },
    { key: 'quantity', header: 'Qty' },
    {
      key: 'priceAtPurchase',
      header: 'Price',
      render: (item: Order['items'][0]) => `₹${item.priceAtPurchase.toFixed(2)}`,
    },
    {
      key: 'taxableValue',
      header: 'Taxable Value',
      render: (item: Order['items'][0]) => `₹${item.taxableValue.toFixed(2)}`,
    },
    {
      key: 'total',
      header: 'Total',
      render: (item: Order['items'][0]) =>
        `₹${(item.priceAtPurchase * item.quantity).toFixed(2)}`,
    },
  ];

  // ─── Loading state ────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" variant="glass" />
      </div>
    );
  }

  // ─── Render ────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* ─── Header ────────────────────────────────────────────── */}
      <Card variant="glass" className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-serif font-semibold text-primary">
              Order #{order.orderNumber}
            </h1>
            <p className="text-sm text-text-secondary">
              Placed on {format(new Date(order.createdAt), 'dd MMM yyyy, HH:mm')}
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status={order.orderStatus} variant="order" />
            <Badge
              variant={
                order.paymentStatus === 'PAID'
                  ? 'success'
                  : order.paymentStatus === 'FAILED' || order.paymentStatus === 'REFUNDED'
                  ? 'error'
                  : 'warning'
              }
            >
              {order.paymentStatus}
            </Badge>
            <Badge variant="secondary">{order.paymentMethod}</Badge>
          </div>
        </div>
      </Card>

      {/* ─── Customer & Shipping ────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card variant="glass" className="p-6">
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2 mb-4">
            <User size={16} />
            Customer
          </h3>
          <div className="flex items-center gap-3">
            <Avatar
              name={`${order.user?.firstname} ${order.user?.lastname}`}
              size="md"
            />
            <div>
              <p className="font-medium text-text-primary">
                {order.user?.firstname} {order.user?.lastname}
              </p>
              <p className="text-sm text-text-secondary">{order.user?.email}</p>
            </div>
          </div>
        </Card>

        <Card variant="glass" className="p-6">
          <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2 mb-4">
            <MapPin size={16} />
            Shipping Address
          </h3>
          <div className="space-y-1 text-sm">
            <p className="font-medium text-text-primary">
              {order.shippingAddress.fullName}
            </p>
            <p className="text-text-secondary">{order.shippingAddress.streetAddress}</p>
            <p className="text-text-secondary">
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.postalCode}
            </p>
            <p className="text-text-secondary">{order.shippingAddress.country}</p>
            <p className="text-text-secondary">Phone: {order.shippingAddress.phone}</p>
          </div>
        </Card>
      </div>

      {/* ─── Logistics ──────────────────────────────────────────── */}
      <Card variant="glass" className="p-6">
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2 mb-4">
          <Truck size={16} />
          Logistics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-text-secondary">Tracking Number:</span>
            <p className="font-medium text-text-primary">
              {order.trackingNumber || 'Not assigned'}
            </p>
          </div>
          <div>
            <span className="text-text-secondary">Courier:</span>
            <p className="font-medium text-text-primary">
              {order.courierName || 'Not assigned'}
            </p>
          </div>
          <div>
            <span className="text-text-secondary">Shiprocket ID:</span>
            <p className="font-medium text-text-primary">
              {order.shiprocketOrderId || 'Not dispatched'}
            </p>
          </div>
        </div>
      </Card>

      {/* ─── Items ──────────────────────────────────────────────── */}
      <Card variant="glass" className="p-6">
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2 mb-4">
          <Package size={16} />
          Order Items
        </h3>
        <DataTable
          data={order.items}
          columns={itemColumns}
          className="overflow-x-auto"
        />
      </Card>

      {/* ─── Pricing Summary ────────────────────────────────────── */}
      <Card variant="glass" className="p-6">
        <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2 mb-4">
          <Receipt size={16} />
          Pricing Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Subtotal</span>
            <span className="font-medium">₹{order.pricing.subTotal.toFixed(2)}</span>
          </div>
          {order.pricing.discountAmount > 0 && (
            <div className="flex justify-between text-sm text-success">
              <span>Discount</span>
              <span>-₹{order.pricing.discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Shipping</span>
            <span className="font-medium">₹{order.pricing.shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Tax (Total)</span>
            <span className="font-medium">₹{order.pricing.totalTax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base font-bold border-t border-glass-border pt-2 col-span-2">
            <span>Total</span>
            <span className="text-secondary">₹{order.pricing.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      {/* ─── Actions ────────────────────────────────────────────── */}
      <Card variant="glass" className="p-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* Status update */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Update Status:</span>
            <Select
              value={order.orderStatus}
              onChange={(e) =>
                handleStatusChange(e.target.value as Order['orderStatus'])
              }
              options={statusOptions}
              variant="glass"
              size="sm"
              className="min-w-[140px]"
              disabled={updating}
            />
            {updating && <Spinner size="sm" />}
          </div>

          <div className="flex-1" />

          {/* Action buttons */}
          <Button variant="glass" size="md" onClick={onDispatch}>
            <Truck size={16} className="mr-2" />
            Dispatch
          </Button>
          <Button variant="glass" size="md" onClick={onInvoice}>
            <FileText size={16} className="mr-2" />
            Invoice
          </Button>
        </div>
      </Card>
    </div>
  );
};