'use client';

import { useState } from 'react';
import { Modal, Button, Input, Spinner } from '@repo/ui';
import { useToast } from '@repo/ui';
import { ordersApi } from '@repo/shared';
import { Package, Truck } from 'lucide-react';

interface DispatchFormProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  onSuccess: () => void;
}

export const DispatchForm = ({
  isOpen,
  onClose,
  orderId,
  onSuccess,
}: DispatchFormProps) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    length: '',
    breadth: '',
    height: '',
    weight: '',
  });

  // ─── Validation ──────────────────────────────────────────────

  const isFormValid = () => {
    const { length, breadth, height, weight } = formData;
    return (
      length.trim() !== '' &&
      breadth.trim() !== '' &&
      height.trim() !== '' &&
      weight.trim() !== '' &&
      parseFloat(length) > 0 &&
      parseFloat(breadth) > 0 &&
      parseFloat(height) > 0 &&
      parseFloat(weight) > 0
    );
  };


  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setLoading(true);
    try {
      await ordersApi.dispatchOrder(orderId, {
        length: parseFloat(formData.length),
        breadth: parseFloat(formData.breadth),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
      });

      addToast({
        title: 'Dispatch Successful',
        message: 'Order has been dispatched via Shiprocket.',
        variant: 'success',
        duration: 3000,
      });

      onSuccess();
      onClose();
      // Reset form
      setFormData({ length: '', breadth: '', height: '', weight: '' });
    } catch (error: any) {
      addToast({
        title: 'Dispatch Failed',
        message: error?.response?.data?.message || 'Failed to dispatch order. Please try again.',
        variant: 'error',
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Dispatch Order"
      description="Enter package dimensions to generate shipping label via Shiprocket."
      size="sm"
      glass
      footer={
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button
            variant="grayGlass"
            fullWidth
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={loading || !isFormValid()}
            loading={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Dispatching...
              </>
            ) : (
              <>
                <Truck size={16} className="mr-2" />
                Dispatch
              </>
            )}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 glass rounded-card text-sm text-text-secondary">
          <Package size={18} className="text-secondary flex-shrink-0" />
          <span>Enter the exact dimensions of the package for accurate shipping label generation.</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Length (cm)"
            type="number"
            step="0.1"
            min="0.1"
            value={formData.length}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({ ...prev, length: e.target.value }))
            }
            disabled={loading}
            required
            variant="glass"
          />
          <Input
            label="Breadth (cm)"
            type="number"
            step="0.1"
            min="0.1"
            value={formData.breadth}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({ ...prev, breadth: e.target.value }))
            }
            disabled={loading}
            required
            variant="glass"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Height (cm)"
            type="number"
            step="0.1"
            min="0.1"
            value={formData.height}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({ ...prev, height: e.target.value }))
            }
            disabled={loading}
            required
            variant="glass"
          />
          <Input
            label="Weight (kg)"
            type="number"
            step="0.01"
            min="0.01"
            value={formData.weight}   // ← syntax fix
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({ ...prev, weight: e.target.value }))
            }
            disabled={loading}
            required
            variant="glass"
          />
        </div>
      </div>
    </Modal>
  );
};