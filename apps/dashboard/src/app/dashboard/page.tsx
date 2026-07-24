'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

// ─── Fallback data ─────────────────────────────────────────────────

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

// ─── Component ─────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter();

  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  // ─── Fetch metrics ──────────────────────────────────────────────

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
        console.error('Dashboard fetch error:', err);
        setError(err?.response?.data?.message || 'Failed to load dashboard data');
        setMetrics(fallbackMetrics);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, [dateRange]);

  // ─── Loading state ──────────────────────────────────────────────

  if (loading) {
    return (
      <div className="space-y-6">
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
  const {
    financials,
    userMetrics,
    orderFulfillment,
    topSellingProducts,
    inventoryAlerts,
    pendingSupportTickets,
  } = currentMetrics;

  // ─── Render ──────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Page header – glassy title */}
      <div className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-serif font-semibold italic text-primary dark:text-primary/90 tracking-wide">
          Dashboard
        </h1>
        <p className="text-sm text-text-secondary dark:text-text-secondary/80 mt-1 font-light italic tracking-wide">
          Welcome back! Here's what's happening with your boutique today.
        </p>
      </div>

      {/* Date range picker */}
      <DateRangePicker
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onStartDateChange={(val) =>
          setDateRange((prev) => ({ ...prev, startDate: val }))
        }
        onEndDateChange={(val) =>
          setDateRange((prev) => ({ ...prev, endDate: val }))
        }
      />

      {/* Metrics grid */}
      <MetricsGrid financials={financials} userMetrics={userMetrics} />

      {/* Charts & tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrderFulfillmentChart data={orderFulfillment} />
        <TopSellingProducts products={topSellingProducts} />
      </div>

      {/* Alerts & support */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InventoryAlerts alerts={inventoryAlerts} />
        <PendingTickets
          count={pendingSupportTickets}
          onViewTickets={() => router.push('/dashboard/support')}
        />
      </div>
    </div>
  );
}