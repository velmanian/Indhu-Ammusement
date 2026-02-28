'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Settings,
  LogOut,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface AdminWrapperProps {
  children: ReactNode;
}

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Enquiries', href: '/admin/enquiries', icon: MessageSquare },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminWrapper({ children }: AdminWrapperProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  // Get breadcrumb segments
  const segments = pathname.split('/').filter(Boolean);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-brand-navy transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-accent flex items-center justify-center">
              <span className="text-brand-navy font-bold text-sm">II</span>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              Indhu Admin
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? 'bg-white/15 text-white shadow-lg shadow-black/10'
                      : 'text-white/60 hover:bg-white/8 hover:text-white'
                  }
                `}
              >
                <item.icon
                  size={20}
                  className={`transition-colors ${
                    isActive ? 'text-brand-accent' : 'text-white/40 group-hover:text-white/70'
                  }`}
                />
                {item.label}
                {isActive && (
                  <ChevronRight size={16} className="ml-auto text-brand-accent" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-4 py-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:bg-red-500/15 hover:text-red-400 transition-all duration-200"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 flex items-center px-6 gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm">
            {segments.map((segment, index) => (
              <span key={index} className="flex items-center gap-1.5">
                {index > 0 && <ChevronRight size={14} className="text-gray-300" />}
                <span
                  className={`capitalize ${
                    index === segments.length - 1
                      ? 'text-brand-primary font-semibold'
                      : 'text-gray-400'
                  }`}
                >
                  {segment}
                </span>
              </span>
            ))}
          </nav>
        </header>

        {/* Page Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
