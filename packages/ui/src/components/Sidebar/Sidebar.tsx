'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { SidebarItem } from './SidebarItem';
import { SidebarHeader } from './SidebarHeader';
import { SidebarFooter } from './SidebarFooter';
import type { SidebarProps } from './Sidebar.types';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export const Sidebar: React.FC<SidebarProps> = ({
  items,
  brand,
  footer,
  open: controlledOpen,
  onOpenChange,
  className = '',
  glass = true,
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [internalOpen, setInternalOpen] = useState(!isMobile);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  // Auto-close on mobile when not open
  useEffect(() => {
    if (isMobile) {
      setInternalOpen(false);
    } else {
      setInternalOpen(true);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    const newOpen = !isOpen;
    if (!isControlled) setInternalOpen(newOpen);
    onOpenChange?.(newOpen);
  };

  const closeSidebar = () => {
    if (!isControlled) setInternalOpen(false);
    onOpenChange?.(false);
  };

  const glassClasses = glass
    ? 'bg-[rgba(246,246,246,0.6)] dark:bg-[rgba(30,30,30,0.55)] backdrop-blur-[20px] saturate-[140%] dark:backdrop-blur-[30px] dark:saturate-[150%] border-r border-[rgba(0,0,0,0.08)] dark:border-r-[rgba(255,255,255,0.08)] shadow-glass'
    : 'bg-surface dark:bg-[#1E1E2A] border-r border-border';

  // ─── Render sidebar content ──────────────────────────────────

  const sidebarContent = (
    <aside
      className={cn(
        'fixed top-0 left-0 h-full w-64 z-40 flex flex-col transition-transform duration-300 ease-in-out',
        glassClasses,
        isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0',
        className,
      )}
    >
      <SidebarHeader>{brand}</SidebarHeader>
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {items.map((item) => (
          <SidebarItem key={item.id} item={item} onClick={() => isMobile && closeSidebar()} />
        ))}
      </nav>
      {footer && <SidebarFooter>{footer}</SidebarFooter>}
    </aside>
  );

  // ─── Mobile overlay ───────────────────────────────────────────

  if (isMobile && isOpen) {
    return createPortal(
      <>
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={closeSidebar}
        />
        {sidebarContent}
      </>,
      document.body,
    );
  }

  return sidebarContent;
};