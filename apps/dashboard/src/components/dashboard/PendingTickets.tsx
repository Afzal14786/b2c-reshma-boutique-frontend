'use client';
import React from 'react';
import { Card } from '@repo/ui';
import { Clock } from 'lucide-react';
import { Button } from '@repo/ui';

interface PendingTicketsProps {
  count: number;
}

export const PendingTickets: React.FC<PendingTicketsProps> = ({ count }) => {
  return (
    <Card variant="glass" className="p-4 sm:p-5 rounded-card">
      <h3 className="font-serif text-lg font-medium text-primary dark:text-primary/90 flex items-center gap-2">
        <Clock className="text-secondary dark:text-secondary-light" size={20} />
        Pending Support
      </h3>

      <p className="text-3xl sm:text-4xl font-bold text-secondary dark:text-secondary-light mt-3">
        {count}
      </p>

      <p className="text-sm text-text-secondary dark:text-text-secondary/80 mt-1">
        Open tickets waiting for reply
      </p>

      <Button
        variant="glass"
        size="md"
        className="mt-4 w-full sm:w-auto"
        onClick={() => console.log('Navigate to support')}
      >
        View Tickets
      </Button>
    </Card>
  );
};