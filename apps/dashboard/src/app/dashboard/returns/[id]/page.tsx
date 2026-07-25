'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { returnsApi } from '@repo/shared';
import { ReturnStatus, type Return } from '@repo/shared/src/types/return.types';
import { useToast } from '@repo/ui';
import { ReturnDetail } from '@/components/returns';

export default function ReturnDetailsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { addToast } = useToast();

  const [returnReq, setReturnReq] = useState<Return | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // ─── Fetch All and Find ─────────────────────────────
  const fetchReturnDetails = async () => {
    setLoading(true);
    try {
      const res = await returnsApi.getAllReturns({ limit: 100 });
      const found = res.data.returns.find((r) => r.id === id);
      
      if (found) {
        setReturnReq(found);
      } else {
        throw new Error('Return not found in the list');
      }
    } catch (error) {
      addToast({ title: 'Error', message: 'Failed to load return details.', variant: 'error' });
      router.push('/dashboard/returns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchReturnDetails();
  }, [id]);

  // ─── Actions ──────────────────────────────────────────────────
  const handleApprove = async () => {
    if (!confirm('Are you sure you want to approve this return request?')) return;
    setProcessing(true);
    try {
      await returnsApi.arbitrateReturn(id, { status: ReturnStatus.APPROVED });
      addToast({ title: 'Approved', message: 'Return request has been approved.', variant: 'success' });
      fetchReturnDetails(); 
    } catch (error: any) {
      addToast({ title: 'Error', message: 'Failed to approve return.', variant: 'error' });
    } finally {
      setProcessing(false);
    }
  };

  const handleReject = async (reason: string) => {
    setProcessing(true);
    try {
      await returnsApi.arbitrateReturn(id, { status: ReturnStatus.REJECTED, adminRejectionReason: reason });
      addToast({ title: 'Rejected', message: 'Return request rejected.', variant: 'success' });
      fetchReturnDetails();
    } catch (error: any) {
      addToast({ title: 'Error', message: 'Failed to reject return.', variant: 'error' });
    } finally {
      setProcessing(false);
    }
  };

  const handleProcessRefund = async () => {
    if (!confirm('WARNING: Execute Razorpay refund and restock inventory?')) return;
    setProcessing(true);
    try {
      await returnsApi.processRefund(id);
      addToast({ title: 'Refunded', message: 'Refund processed successfully!', variant: 'success' });
      fetchReturnDetails();
    } catch (error: any) {
      addToast({ title: 'Error', message: 'Refund failed. Check Razorpay.', variant: 'error' });
      fetchReturnDetails();
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ReturnDetail
      returnReq={returnReq}
      loading={loading}
      processing={processing}
      onApprove={handleApprove}
      onReject={handleReject}
      onProcessRefund={handleProcessRefund}
      onBack={() => router.push('/dashboard/returns')}
    />
  );
}