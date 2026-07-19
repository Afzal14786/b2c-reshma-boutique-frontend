import React from 'react';
import { Skeleton } from '../Skeleton';

export const CartSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-3 p-3 sm:p-4 glass rounded-card">
          <Skeleton variant="rect" width="64px" height="64px" className="rounded-btn" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="30%" />
            <div className="flex gap-2">
              <Skeleton variant="rect" width="80px" height="32px" />
              <Skeleton variant="rect" width="60px" height="32px" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};