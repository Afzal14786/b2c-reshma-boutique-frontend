'use client';

import { Card } from '@repo/ui';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface InventoryAlert {
  productId: string;
  name: string;
  currentStock: number;
}

interface InventoryAlertsProps {
  alerts: InventoryAlert[];
}

export const InventoryAlerts = ({ alerts }: InventoryAlertsProps) => {
  // ─── Empty state ─────────────────────────────────────────────────

  if (alerts.length === 0) {
    return (
      <Card variant="glass" className="p-4 flex flex-col items-center justify-center text-center min-h-[120px]">
        <CheckCircle className="h-8 w-8 text-success dark:text-success-light mb-2" strokeWidth={1.5} />
        <p className="text-success dark:text-success-light text-sm font-medium">
          All products are well‑stocked.
        </p>
      </Card>
    );
  }

  // ─── Render alerts ──────────────────────────────────────────────

  return (
    <Card variant="glass" className="p-4 border-l-4 border-l-error">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="h-5 w-5 text-error" strokeWidth={1.5} />
        <h3 className="font-serif text-lg font-medium text-primary dark:text-primary/90">
          Low Stock Alerts
        </h3>
      </div>

      <ul className="space-y-2">
        {alerts.map((item) => (
          <li
            key={item.productId}
            className="flex items-center justify-between text-sm border-b border-glass-border/50 py-2 last:border-0"
          >
            <span className="text-text-primary dark:text-text-primary/90">{item.name}</span>
            <span className="text-error dark:text-error-light font-medium">
              Stock: {item.currentStock}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
};