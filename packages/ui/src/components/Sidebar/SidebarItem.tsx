import React from 'react';
import Link from 'next/link';
import { cn } from '../../utils/cn';
import type { SidebarItemProps } from './Sidebar.types';

export const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  onClick,
  className = '',
}) => {
  const { label, icon, href, isActive, id } = item;

  const content = (
    <>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex-1 text-sm font-medium">{label}</span>
    </>
  );

  const classes = cn(
    'flex items-center gap-3 px-3 py-2.5 rounded-btn transition-all duration-200 ease-out',
    'hover:bg-white/20 dark:hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-glass hover:translate-x-1',
    isActive
      ? 'bg-white/25 dark:bg-white/15 backdrop-blur-sm text-secondary shadow-soft border-l-2 border-secondary'
      : 'text-text-secondary hover:text-text-primary',
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={() => onClick?.(item)}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={() => onClick?.(item)}
    >
      {content}
    </button>
  );
};