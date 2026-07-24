'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/contexts/SidebarContext';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  RefreshCw,
  Ticket,
  Tags,
  Warehouse,
  Settings,
  LogOut,
} from 'lucide-react';
import { Badge, Avatar } from '@repo/ui';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { href: '/dashboard/products', icon: Package, label: 'Products' },
  { href: '/dashboard/orders', icon: ShoppingCart, label: 'Orders' },
  { href: '/dashboard/customers', icon: Users, label: 'Customers' },
  { href: '/dashboard/returns', icon: RefreshCw, label: 'Returns' },
  { href: '/dashboard/support', icon: Ticket, label: 'Support' },
  { href: '/dashboard/coupons', icon: Tags, label: 'Coupons' },
  { href: '/dashboard/inventory', icon: Warehouse, label: 'Inventory' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* Overlay (mobile) */}
      <div
        className={`
          fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300
          lg:hidden
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={close}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 z-40
          glass border-r border-glass-border shadow-glass
          transition-transform duration-300 ease-in-out
          flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Brand */}
        <div className="flex items-center justify-center p-4 border-b border-gray-300 dark:border-glass-border h-20">
          <span className="font-serif text-2xl italic font-semibold text-secondary hover:text-accent transition-colors tracking-wide cursor-default">
            Reshma
          </span>
          <span className="text-xs text-text-secondary/60 tracking-[0.2em] uppercase mt-0.5 font-light ml-1">
            Admin
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = 
              href === '/dashboard' 
                ? pathname === href 
                : pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                onClick={() => close()}
                className={`
                  group flex items-center gap-3 px-3 py-2.5 rounded-btn 
                  transition-all duration-200 ease-out
                  hover:bg-white/20 dark:hover:bg-white/10 
                  hover:backdrop-blur-sm hover:shadow-glass 
                  hover:translate-x-1
                  ${isActive
                    ? 'bg-white/25 dark:bg-white/15 backdrop-blur-sm text-secondary shadow-soft border-l-2 border-secondary'
                    : 'text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2 : 1.5}
                  className={`
                    transition-colors duration-200
                    ${isActive ? 'text-secondary' : 'text-text-secondary group-hover:text-text-primary'}
                  `}
                />
                <span className="text-sm font-medium">{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer – logout */}
        <div className="p-4 border-t border-gray-300 dark:border-glass-border space-y-3">
          <button
            onClick={() => logout()}
            className="
              group flex items-center gap-3 px-3 py-2.5 w-full rounded-btn 
              transition-all duration-200 ease-out
              text-text-secondary hover:bg-error/10 hover:text-error hover:translate-x-1
            "
          >
            <LogOut size={20} strokeWidth={1.5} className="transition-colors duration-200 group-hover:text-error" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};