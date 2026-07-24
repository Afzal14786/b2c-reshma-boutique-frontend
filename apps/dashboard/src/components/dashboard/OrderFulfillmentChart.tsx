'use client';

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card } from '@repo/ui';
import { useMediaQuery } from '@shared/hooks';


const COLORS = {
  PENDING: '#F39C12',        // Amber
  PROCESSING: '#5B9BD5',     // Sky Blue
  SHIPPED: '#6DD5C4',        // Mint
  DELIVERED: '#4ECDC4',      // Teal
  CANCELLED: '#FF6B6B',      // Coral
  RETURN_REQUESTED: '#C4B8D8', // Lavender
  RETURNED: '#FF6B6B',       // Coral
};

// ─── Label mapping (shorter labels for clean display) ──────────

const LABEL_MAP: Record<string, string> = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  RETURN_REQUESTED: 'Return Req.',
  RETURNED: 'Returned',
};

interface OrderFulfillmentChartProps {
  data: Record<string, number>;
}

export const OrderFulfillmentChart = ({ data }: OrderFulfillmentChartProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  // Transform data for recharts
  const chartData = useMemo(() => {
    return Object.entries(data).map(([key, value]) => ({
      name: LABEL_MAP[key] || key,
      value,
      key,
    }));
  }, [data]);

  // Responsive settings
  const fontSize = isMobile ? 8 : 10;
  const angle = isMobile ? -45 : isTablet ? -20 : 0;
  const textAnchor = angle !== 0 ? 'end' : 'middle';
  const margin = isMobile
    ? { top: 10, right: 5, left: 5, bottom: 20 }
    : { top: 10, right: 10, left: 0, bottom: 10 };

  return (
    <Card variant="glass" className="p-4">
      <h3 className="font-serif text-lg font-medium text-primary dark:text-primary/90 mb-4">
        Order Fulfillment
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={margin}>
            {/* Subtle grid lines */}
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700/50" vertical={false} />

            {/* X‑axis with responsive labels */}
            <XAxis
              dataKey="name"
              tick={{ fontSize,fontWeight: 500 }}
              className="fill-slate-600 dark:fill-slate-400"
              interval={0}
              angle={angle}
              textAnchor={textAnchor}
              axisLine={{ stroke: 'currentColor', strokeOpacity: 0.2 }}
              tickLine={{ stroke: 'currentColor', strokeOpacity: 0.2 }}
              padding={{ left: 5, right: 5 }}
            />

            {/* Y‑axis with integer ticks */}
            <YAxis
              tick={{ fontSize: 10}}
              className="fill-slate-600 dark:fill-slate-400"
              axisLine={{ stroke: 'currentColor', strokeOpacity: 0.2 }}
              tickLine={{ stroke: 'currentColor', strokeOpacity: 0.2 }}
              allowDecimals={false}
            />

            {/* Glassy tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.25)',
                borderRadius: '8px',
                color: '#0F1A2C',
                fontSize: '12px',
                padding: '8px 12px',
              }}
              formatter={(value: number) => [`${value}`, 'Orders']}
            />

            {/* Bar with rounded corners and dynamic colors */}
            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.key}
                  fill={COLORS[entry.key as keyof typeof COLORS] || '#5B9BD5'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};