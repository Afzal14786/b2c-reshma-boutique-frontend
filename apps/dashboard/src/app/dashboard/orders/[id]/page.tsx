'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ordersApi, type Order } from '@repo/shared';
import { OrderDetail, DispatchForm } from '@/components/orders';
import { PageHeader } from '@/components/common';
import { Spinner } from '@repo/ui';
import { useToast } from '@repo/ui';

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToast } = useToast();
  const id = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const res = await ordersApi.getOrderById(id);
      setOrder(res.data as undefined);  // for now because this api is not defined inside backend 
    } catch (error) {
      console.error('Failed to fetch order:', error);
      addToast({
        title: 'Error',
        message: 'Order not found or failed to load.',
        variant: 'error',
        duration: 5000,
      });
      router.push('/dashboard/orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleStatusUpdate = async (orderId: string, newStatus: Order['orderStatus']) => {
    await ordersApi.updateOrderStatus(orderId, { orderStatus: newStatus });
    await fetchOrder();
    addToast({
      title: 'Status Updated',
      message: `Order status changed to ${newStatus}.`,
      variant: 'success',
    });
  };

  const handleDispatch = () => {
    setIsDispatchModalOpen(true);
  };

  const handleInvoice = async () => {
    if (!order) return;
    try {
      const res = await ordersApi.getInvoice(order.id);
      if (res.data.url) {
        window.open(res.data.url, '_blank');
      } else {
        addToast({
          title: 'Invoice',
          message: 'Invoice URL not available.',
          variant: 'warning',
        });
      }
    } catch (error) {
      addToast({
        title: 'Error',
        message: 'Failed to generate invoice.',
        variant: 'error',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" variant="glass" />
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="space-y-4">
      <PageHeader
        title={`Order #${order.orderNumber}`}
        subtitle={`Placed on ${new Date(order.createdAt).toLocaleDateString()}`}
        onBack={() => router.push('/dashboard/orders')}
      />

      <OrderDetail
        order={order}
        onStatusUpdate={handleStatusUpdate}
        onDispatch={handleDispatch}
        onInvoice={handleInvoice}
      />

      {/* Dispatch Modal */}
      <DispatchForm
        isOpen={isDispatchModalOpen}
        onClose={() => setIsDispatchModalOpen(false)}
        orderId={order.id}
        onSuccess={() => {
          setIsDispatchModalOpen(false);
          fetchOrder();
        }}
      />
    </div>
  );
}