'use client';

import { Card, Button } from '@repo/ui';
import { Clock } from 'lucide-react';

interface PendingTicketsProps {
  count: number;
  onViewTickets?: () => void;
}

export const PendingTickets = ({ count, onViewTickets }: PendingTicketsProps) => {
  return (
    <Card variant="glass" className="p-4 flex flex-col items-start">
      <div className="flex items-center gap-2 mb-2">
        <Clock className="h-5 w-5 text-secondary" strokeWidth={1.5} />
        <h3 className="font-serif text-lg font-medium text-primary dark:text-primary/90">
          Pending Support
        </h3>
      </div>

      <p className="text-3xl font-bold text-secondary dark:text-secondary-light mt-1">
        {count}
      </p>

      <p className="text-sm text-text-secondary dark:text-text-secondary/80 mt-1">
        Open tickets waiting for reply
      </p>

      <Button
        variant="glass"
        size="md"
        className="mt-4 w-full sm:w-auto"
        onClick={onViewTickets}
      >
        View Tickets
      </Button>
    </Card>
  );
};