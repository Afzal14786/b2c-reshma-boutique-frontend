'use client';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Bell, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { Avatar } from '@repo/ui';
import { useMediaQuery } from '@shared/hooks';
import { MobileNav } from './MobileNav';
import { SearchBar } from '@/components/common/SearchBar';
import { DarkModeToggle } from '@/components/common/DarkModeToggle';
import Link from 'next/link';

export const AdminHeader = () => {
  const { user, logout } = useAuth();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    console.log('Global search:', query);
    // TODO: Navigate to search results page or show dropdown
  };

  return (
    <header className="sticky top-0 z-30 h-16 glass border-b border-[rgba(0,0,0,0.06)] dark:border-b-[rgba(255,255,255,0.06)] flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile nav */}
      {isMobile && <MobileNav />}

      {/* Center: Search (desktop only) */}
      {!isMobile && (
        <SearchBar
          placeholder="Search orders, products, customers..."
          className="max-w-md flex-1 mx-4"
          onSearch={handleSearch}
          debounce={400}
        />
      )}

      {/* Right: Dark Mode Toggle + Notifications + Profile */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Dark Mode Toggle */}
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

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
          >
            <Avatar
              src={user?.avatar}
              name={`${user?.firstname} ${user?.lastname}`}
              size="sm"
              className="border-2 border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)]"
            />
            <span className="text-sm font-medium text-text-primary hidden sm:block">
              {user?.firstname}
            </span>
            <ChevronDown size={14} className="text-text-secondary hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 glass rounded-card shadow-glass py-2 z-50">
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-3 px-4 py-2 text-sm text-text-primary hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
              >
                <User size={16} />
                Profile
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 px-4 py-2 text-sm text-text-primary hover:bg-white/20 dark:hover:bg-white/10 transition-colors"
              >
                <Settings size={16} />
                Settings
              </Link>
              <hr className="border-[rgba(0,0,0,0.06)] dark:border-[rgba(255,255,255,0.06)] my-1" />
              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors w-full text-left"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};