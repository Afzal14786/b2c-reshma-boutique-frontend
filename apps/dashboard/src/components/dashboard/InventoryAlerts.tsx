'use client';
import React from 'react';
import { Card } from '@repo/ui';
import { AlertTriangle } from 'lucide-react';

interface InventoryAlertsProps {
  alerts: Array<{ productId: string; name: string; currentStock: number }>;
}

export const InventoryAlerts: React.FC<InventoryAlertsProps> = ({ alerts }) => {
  if (alerts.length === 0) {
    return (
      <Card variant="glass" className="p-4 sm:p-5 rounded-card">
        <h3 className="font-serif text-lg font-medium text-primary dark:text-primary/90 flex items-center gap-2">
          <AlertTriangle className="text-success dark:text-success-light" size={20} />
          Inventory Status
        </h3>
        <p className="text-success dark:text-success-light mt-2 text-sm">All products are well-stocked.</p>
      </Card>
    );
  }

  return (
    <Card variant="glass" className="p-4 sm:p-5 rounded-card border-l-4 border-l-error dark:border-l-error-light">
      <h3 className="font-serif text-lg font-medium text-primary dark:text-primary/90 flex items-center gap-2">
        <AlertTriangle className="text-error dark:text-error-light" size={20} />
        Low Stock Alerts
      </h3>
      <ul className="space-y-2 mt-3">
        {alerts.map((item) => (
          <li
            key={item.productId}
            className="flex justify-between items-center text-sm border-b border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] py-2 last:border-0"
          >
            <span className="text-text-primary dark:text-text-primary/90">{item.name}</span>
            <span className="text-error dark:text-error-light font-medium">Stock: {item.currentStock}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};