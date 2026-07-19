'use client';
import { useEffect, useState } from 'react';
import { dashboardApi, type DashboardMetrics } from '@repo/shared';
import { Skeleton } from '@repo/ui';
import {
  DateRangePicker,
  MetricsGrid,
  OrderFulfillmentChart,
  TopSellingProducts,
  InventoryAlerts,
  PendingTickets,
} from '@/components/dashboard';

const fallbackMetrics: DashboardMetrics = {
  dateRange: { start: '', end: '' },
  financials: { totalRevenue: 0, averageOrderValue: 0, totalOrders: 0 },
  orderFulfillment: {
    PENDING: 0,
    PROCESSING: 0,
    SHIPPED: 0,
    DELIVERED: 0,
    CANCELLED: 0,
    RETURN_REQUESTED: 0,
    RETURNED: 0,
  },
  topSellingProducts: [],
  inventoryAlerts: [],
  userMetrics: { totalRegisteredUsers: 0, newSignupsInPeriod: 0 },
  pendingSupportTickets: 0,
};

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await dashboardApi.getMetrics({
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        });
        setMetrics(res.data);
      } catch (err: any) {
        console.error(err);
        setError('Failed to load dashboard data');
        setMetrics(fallbackMetrics);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, [dateRange]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-[rgba(246,246,246,0.4)] dark:bg-[rgba(30,30,30,0.3)] rounded animate-pulse" />
        <Skeleton variant="card" className="h-16" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} variant="card" className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton variant="card" className="h-64" />
          <Skeleton variant="card" className="h-64" />
        </div>
      </div>
    );
  }

  const currentMetrics = metrics || fallbackMetrics;
  const { financials, userMetrics, orderFulfillment, topSellingProducts, inventoryAlerts, pendingSupportTickets } = currentMetrics;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold italic text-primary dark:text-primary/90 tracking-wide">
          Dashboard
        </h1>
        <p className="text-sm text-text-secondary dark:text-text-secondary/80 mt-1 font-light italic tracking-wide">
          Welcome back! Here's what's happening with your boutique today.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-[rgba(246,246,246,0.6)] dark:bg-[rgba(30,30,30,0.55)] backdrop-blur-[20px] border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)] rounded-card text-text-primary dark:text-text-primary/90 text-sm flex items-center justify-between flex-wrap gap-2 shadow-glass">
          <span>{error}</span>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-1.5 bg-secondary text-text-inverse rounded-btn text-xs hover:bg-secondary/80 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      <DateRangePicker
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onStartDateChange={(val) => setDateRange((prev) => ({ ...prev, startDate: val }))}
        onEndDateChange={(val) => setDateRange((prev) => ({ ...prev, endDate: val }))}
      />

      <MetricsGrid financials={financials} userMetrics={userMetrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrderFulfillmentChart data={orderFulfillment} />
        <TopSellingProducts products={topSellingProducts} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InventoryAlerts alerts={inventoryAlerts} />
        <PendingTickets count={pendingSupportTickets} />
      </div>
    </div>
  );
}