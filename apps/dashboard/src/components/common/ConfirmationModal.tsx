'use client';

import { Modal, Button } from '@repo/ui';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  loading?: boolean;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
}: ConfirmationModalProps) => {
  const variantColors = {
    danger: 'text-error border-error/30 bg-error/10',
    warning: 'text-warning border-warning/30 bg-warning/10',
    info: 'text-secondary border-secondary/30 bg-secondary/10',
  };

  const variantButtons = {
    danger: 'secondary',
    warning: 'grayGlass',
    info: 'primary',
  } as const;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      glass
      title={title}
      description={message}
      footer={
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
          <Button
            variant="grayGlass"
            fullWidth
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={variantButtons[variant]}
            fullWidth
            onClick={onConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <div className="flex items-center justify-center">
        <div className={`p-4 rounded-full ${variantColors[variant]}`}>
          <AlertTriangle size={28} />
        </div>
      </div>
    </Modal>
  );
};