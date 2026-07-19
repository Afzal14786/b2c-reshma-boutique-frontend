'use client';

import { Button } from '@repo/ui';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader = ({
  title,
  subtitle,
  onBack,
  actions,
  className = '',
}: PageHeaderProps) => {
  return (
    <div className={`flex items-start justify-between gap-4 mb-6 ${className}`}>
      <div className="flex items-center gap-3">
        {onBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            aria-label="Go back"
            className="p-2 -ml-2"
          >
            <ArrowLeft size={20} />
          </Button>
        )}
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-semibold italic text-primary dark:text-primary/90 tracking-wide">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-text-secondary dark:text-text-secondary/80 mt-1 font-light italic">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {actions && <div className="flex-shrink-0">{actions}</div>}
    </div>
  );
};