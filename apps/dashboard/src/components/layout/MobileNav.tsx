'use client';
import { Menu, X } from 'lucide-react';
import { useSidebar } from '@/contexts/SidebarContext';

export const MobileNav = () => {
  const { isOpen, toggle } = useSidebar();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full glass hover:shadow-lg transition-all duration-200 lg:hidden"
      aria-label="Toggle menu"
    >
      {isOpen ? <X size={24} className="text-text-primary" /> : <Menu size={24} className="text-text-primary" />}
    </button>
  );
};