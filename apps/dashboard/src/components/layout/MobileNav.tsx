'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    window.dispatchEvent(new CustomEvent('toggleSidebar', { detail: { isOpen: !isOpen } }));
  };

  return (
    <button
      onClick={toggleSidebar}
      className="p-2 rounded-full glass hover:shadow-lg transition-all duration-200"
      aria-label="Toggle menu"
    >
      {isOpen ? <X size={24} className="text-text-primary" /> : <Menu size={24} className="text-text-primary" />}
    </button>
  );
};