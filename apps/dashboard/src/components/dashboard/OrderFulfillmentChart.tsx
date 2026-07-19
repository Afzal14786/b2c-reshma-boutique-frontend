'use client';
import React, { useMemo } from 'react';
import { Card } from '@repo/ui';
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
import { useMediaQuery } from '@shared/hooks';

const COLORS = {
  PENDING: '#F39C12',
  PROCESSING: '#5B9BD5',
  SHIPPED: '#6DD5C4',
  DELIVERED: '#4ECDC4',
  CANCELLED: '#FF6B6B',
  RETURN_REQUESTED: '#C4B8D8',
  RETURNED: '#FF6B6B',
};

// Map status keys to shorter display labels
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

export const OrderFulfillmentChart: React.FC<OrderFulfillmentChartProps> = ({ data }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');

  const chartData = useMemo(() => {
    return Object.entries(data).map(([name, value]) => ({
      name: LABEL_MAP[name] || name,
      value,
    }));
  }, [data]);

  // Responsive settings
  const fontSize = isMobile ? 8 : 10;
  const angle = isMobile ? -45 : isTablet ? -20 : 0;
  const textAnchor = angle !== 0 ? 'end' : 'middle';
  const margin = isMobile ? { top: 10, right: 5, left: 5, bottom: 20 } : { top: 10, right: 10, left: 0, bottom: 10 };

  return (
    <Card variant="glass" className="p-4">
      <h3 className="font-serif text-lg font-medium text-primary dark:text-primary/90 mb-4">
        Order Fulfillment
      </h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={margin}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="name"
              tick={{ fontSize, fill: 'rgba(15,26,44,0.5)', fontWeight: 500 }}
              interval={0}
              angle={angle}
              textAnchor={textAnchor}
              axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              padding={{ left: 5, right: 5 }}
            />
            <YAxis
              tick={{ fontSize: 10, fill: 'rgba(15,26,44,0.5)' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              tickLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              allowDecimals={false}
            />
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
            <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={60}>
              {chartData.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[entry.name as keyof typeof COLORS] || '#5B9BD5'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};