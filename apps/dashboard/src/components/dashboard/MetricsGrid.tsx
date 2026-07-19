'use client';

import { MetricCard } from '@repo/ui';
import { TrendingUp, ShoppingBag, Package, Users } from 'lucide-react';

interface MetricsGridProps {
  financials: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
  };
  userMetrics: {
    totalRegisteredUsers: number;
    newSignupsInPeriod: number;
  };
}

export const MetricsGrid = ({ financials, userMetrics }: MetricsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Total Revenue"
        value={`₹${financials.totalRevenue.toFixed(2)}`}
        icon={<TrendingUp className="text-secondary" size={24} />}
        variant="glass"
        trend={
          financials.totalRevenue > 0
            ? { value: 12.5, isPositive: true }
            : undefined
        }
      />
      <MetricCard
        label="Total Orders"
        value={financials.totalOrders}
        icon={<ShoppingBag className="text-secondary" size={24} />}
        variant="glass"
      />
      <MetricCard
        label="Average Order Value"
        value={`₹${financials.averageOrderValue.toFixed(2)}`}
        icon={<Package className="text-secondary" size={24} />}
        variant="glass"
      />
      <MetricCard
        label="Total Users"
        value={userMetrics.totalRegisteredUsers}
        icon={<Users className="text-secondary" size={24} />}
        variant="glass"
        trend={
          userMetrics.newSignupsInPeriod > 0
            ? { value: userMetrics.newSignupsInPeriod, isPositive: true }
            : undefined
        }
        subtitle={`+${userMetrics.newSignupsInPeriod} new this period`}
      />
    </div>
  );
};