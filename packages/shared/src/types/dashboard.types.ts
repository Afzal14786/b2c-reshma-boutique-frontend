export interface TopSellingProduct {
  productId: string;
  sku: string;
  name: string;
  totalSold: number;
  revenueGenerated: number;
}

export interface InventoryAlert {
  productId: string;
  sku: string;
  name: string;
  currentStock: number;
}

export interface DashboardMetrics {
  dateRange: {
    start: string;
    end: string;
  };
  financials: {
    totalRevenue: number;
    averageOrderValue: number;
    totalOrders: number;
  };
  orderFulfillment: {
    PENDING: number;
    PROCESSING: number;
    SHIPPED: number;
    DELIVERED: number;
    CANCELLED: number;
    RETURN_REQUESTED: number;
    RETURNED: number;
  };
  topSellingProducts: TopSellingProduct[];
  inventoryAlerts: InventoryAlert[];
  userMetrics: {
    totalRegisteredUsers: number;
    newSignupsInPeriod: number;
  };
  pendingSupportTickets: number;
}

export interface DateRangeQuery {
  startDate?: string;
  endDate?: string;
}