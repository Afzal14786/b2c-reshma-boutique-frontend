'use client';
import React from 'react';
import { MetricCard } from '@repo/ui';
import { TrendingUp, ShoppingBag, Package, Users } from 'lucide-react';

interface MetricsGridProps {
  financials: { totalRevenue: number; totalOrders: number; averageOrderValue: number };
  userMetrics: { totalRegisteredUsers: number; newSignupsInPeriod: number };
}

export const MetricsGrid: React.FC<MetricsGridProps> = ({ financials, userMetrics }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        label="Total Revenue"
        value={`₹${financials.totalRevenue.toFixed(2)}`}
        icon={<TrendingUp className="text-secondary dark:text-secondary-light" size={24} />}
        glass
      />
      <MetricCard
        label="Total Orders"
        value={financials.totalOrders}
        icon={<ShoppingBag className="text-secondary dark:text-secondary-light" size={24} />}
        glass
      />
      <MetricCard
        label="Average Order Value"
        value={`₹${financials.averageOrderValue.toFixed(2)}`}
        icon={<Package className="text-secondary dark:text-secondary-light" size={24} />}
        glass
      />
      <MetricCard
        label="Total Users"
        value={userMetrics.totalRegisteredUsers}
        icon={<Users className="text-secondary dark:text-secondary-light" size={24} />}
        trend={
          userMetrics.newSignupsInPeriod > 0
            ? { value: userMetrics.newSignupsInPeriod, isPositive: true }
            : undefined
        }
        glass
      />
    </div>
  );
};