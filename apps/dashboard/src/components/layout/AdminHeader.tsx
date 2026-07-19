'use client';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import {
  Avatar,
  Search,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
} from '@repo/ui';
import { useMediaQuery } from '@shared/hooks';
import { MobileNav } from './MobileNav';
import Link from 'next/link';
import { DarkModeToggle } from '@/components/common/DarkModeToggle';

export const AdminHeader = () => {
  const { user, logout } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 h-16 glass border-b border-glass-border flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile nav */}
      {isMobile && <MobileNav />}

      {/* Center: Search (desktop only) */}
      {!isMobile && (
        <Search
          placeholder="Search orders, products, customers..."
          className="max-w-md flex-1 mx-4"
          onSearch={(val) => console.log('Search:', val)}
          inputSize="md"
          variant="glass"
        />
      )}

      {/* Right: Dark Mode Toggle + Notifications + Profile */}
      <div className="flex items-center gap-3 ml-auto">
        <DarkModeToggle />

        {/* Notifications */}
        <div ref={notificationRef} className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-text-secondary hover:text-text-primary transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-white/50 dark:border-black/30"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 glass rounded-card shadow-glass p-4 z-50">
              <h4 className="text-sm font-semibold text-text-primary mb-2">Notifications</h4>
              <p className="text-xs text-text-secondary">No new notifications</p>
            </div>
          )}
        </div>

        {/* Profile Dropdown – using @repo/ui Dropdown */}
        <Dropdown placement="bottom">
          <DropdownTrigger>
            <button className="flex items-center gap-2 p-1 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-colors">
              <Avatar
                src={user?.avatar}
                name={`${user?.firstname} ${user?.lastname}`}
                size="sm"
                className="border-2 border-glass-border"
              />
              <span className="text-sm font-medium text-text-primary hidden sm:block">
                {user?.firstname}
              </span>
              <ChevronDown size={14} className="text-text-secondary hidden sm:block" />
            </button>
          </DropdownTrigger>
          <DropdownContent align="end">
            <DropdownItem icon={<User size={16} />} asChild>
              <Link href="/dashboard/profile">Profile</Link>
            </DropdownItem>
            <DropdownItem icon={<Settings size={16} />} asChild>
              <Link href="/dashboard/settings">Settings</Link>
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem icon={<LogOut size={16} />} danger onClick={logout}>
              Logout
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    </header>
  );
};