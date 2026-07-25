'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Card, Button, Badge } from '@repo/ui';
import { Check, X, CreditCard, ArrowLeft, AlertCircle } from 'lucide-react';

interface ReturnDetailProps {
  returnReq: any;
  loading: boolean;
  processing: boolean;
  onApprove: () => void;
  onReject: (reason: string) => void;
  onProcessRefund: () => void;
  onBack: () => void;
}

export const ReturnDetail = ({
  returnReq,
  loading,
  processing,
  onApprove,
  onReject,
  onProcessRefund,
  onBack
}: ReturnDetailProps) => {
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  if (loading) return <div className="p-8 text-center text-slate-500">Loading...</div>;
  if (!returnReq) return null;

  const isTerminalState = returnReq.status === 'REFUNDED' || returnReq.status === 'REJECTED';

  return (
    <div className="space-y-6">
        
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <Button variant="ghost" onClick={onBack} className="p-2 shrink-0 border border-slate-200 dark:border-slate-800">
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">
            Return #{returnReq.id?.slice(-6).toUpperCase()}
          </h1>
          <p className="text-sm text-text-secondary">Order Ref: {returnReq.order?.slice(-6).toUpperCase()}</p>
        </div>
        <div className="sm:ml-auto">
          <Badge variant={
            returnReq.status === 'REFUNDED' ? 'success' : 
            returnReq.status === 'REJECTED' ? 'error' : 
            returnReq.status === 'PENDING_APPROVAL' ? 'warning' : 'default'
          }>
            {returnReq.status}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card variant="glass" className="p-6">
            <h3 className="text-lg font-medium mb-4">Returned Items</h3>
            <div className="space-y-4">
              {returnReq.items?.map((item: any, idx: number) => (
                <div key={idx} className="flex flex-col gap-3 p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-sm">Product ID: {item.product}</p>
                      <p className="text-sm text-text-secondary mt-1">Quantity: {item.quantity}</p>
                    </div>
                    <Badge variant="default">{item.reason}</Badge>
                  </div>
                  {item.customerNote && (
                    <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-md text-sm italic">
                      "{item.customerNote}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          {returnReq.proofOfDamageImages && returnReq.proofOfDamageImages.length > 0 && (
            <Card variant="glass" className="p-6">
              <h3 className="text-lg font-medium mb-4">Uploaded Evidence</h3>
              <div className="flex gap-4 overflow-x-auto">
                {returnReq.proofOfDamageImages.map((imgUrl: string, idx: number) => (
                  <div key={idx} className="relative h-32 w-32 shrink-0 rounded-md overflow-hidden">
                    <Image src={imgUrl} alt="Evidence" fill className="object-cover" />
                  </div>
                ))}
              </div>
            </Card>
          )}
          
          {returnReq.status === 'REJECTED' && returnReq.adminRejectionReason && (
            <Card variant="glass" className="p-6 border-error/30 bg-error/5">
              <h3 className="text-error font-medium flex items-center gap-2 mb-2">
                <AlertCircle size={18} /> Rejection Reason
              </h3>
              <p className="text-sm">{returnReq.adminRejectionReason}</p>
            </Card>
          )}
        </div>

        {/* Right Column: Actions */}
        <div className="space-y-6">
          <Card variant="glass" className="p-6">
            <h3 className="text-lg font-medium mb-4">Action Required</h3>
            
            {returnReq.status === 'PENDING_APPROVAL' && !showRejectInput && (
              <div className="flex flex-col gap-3">
                <Button onClick={onApprove} disabled={processing} className="w-full bg-success text-white">
                  <Check size={18} className="mr-2" /> Approve Request
                </Button>
                <Button onClick={() => setShowRejectInput(true)} disabled={processing} variant="outline" className="w-full text-error">
                  <X size={18} className="mr-2" /> Reject Request
                </Button>
              </div>
            )}

            {showRejectInput && (
              <div className="space-y-3 p-3 bg-error/5 rounded-lg border border-error/20">
                <label className="text-sm font-medium">Rejection Reason (min 10 chars)</label>
                <textarea 
                  className="w-full p-2 border rounded-md text-sm" 
                  rows={3} 
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
                <div className="flex gap-2">
                  <Button onClick={() => onReject(rejectionReason)} disabled={processing || rejectionReason.length < 10} className="w-full bg-error text-white">Confirm</Button>
                  <Button onClick={() => setShowRejectInput(false)} variant="ghost" className="w-full">Cancel</Button>
                </div>
              </div>
            )}

            {returnReq.status === 'APPROVED' && (
              <div className="space-y-4">
                <Button onClick={onProcessRefund} disabled={processing} className="w-full bg-primary text-white">
                  <CreditCard size={18} className="mr-2" /> Process Refund: ₹{returnReq.refundAmountEstimate}
                </Button>
              </div>
            )}

            {isTerminalState && (
              <div className="text-center py-4">
                <p className="text-sm font-medium">Status: {returnReq.status}</p>
                <p className="text-xs mt-1">No further action can be taken.</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};