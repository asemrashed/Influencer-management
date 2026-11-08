'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from '@/providers/SessionProvider';
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  Calendar,
  Users,
  Video,
  ShoppingBag,
  DollarSign,
  Sparkles,
  BarChart2,
  LifeBuoy,
  Settings,
  LogOut,
  Shield,
} from 'lucide-react';
import { Button, UserAvatar, LoadingSkeleton } from '@platform/ui';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  permission?: string;
  module?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'CMS & Site Content', href: '/admin/cms', icon: Video, permission: 'portfolio.read' },
  { label: 'Inbox', href: '/admin/inbox', icon: Inbox, module: 'inbox', permission: 'inbox.read' },
  { label: 'Campaigns & Deals', href: '/admin/campaigns', icon: Briefcase, module: 'campaigns', permission: 'campaigns.read' },
  { label: 'Content Calendar', href: '/admin/calendar', icon: Calendar, module: 'content', permission: 'content.read' },
  { label: 'Contacts & CRM', href: '/admin/contacts', icon: Users, module: 'contacts', permission: 'contacts.read' },
  { label: 'Portfolio & Media', href: '/admin/portfolio', icon: Video, module: 'portfolio', permission: 'portfolio.read' },
  { label: 'Store & Merch', href: '/admin/store', icon: ShoppingBag, module: 'store', permission: 'store.read' },
  { label: 'Finance & Earnings', href: '/admin/finance', icon: DollarSign, module: 'earnings', permission: 'earnings.read' },
  { label: 'AI Assistant', href: '/admin/ai', icon: Sparkles, module: 'ai', permission: 'ai.generate' },
  { label: 'Growth Analytics', href: '/admin/analytics', icon: BarChart2, module: 'analytics', permission: 'analytics.read' },
  { label: 'Support Tickets', href: '/admin/support', icon: LifeBuoy, module: 'support', permission: 'support.read' },
  { label: 'Roles & Staff', href: '/admin/roles', icon: Shield, permission: 'roles.read' },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { status, user, can, isModuleEnabled, logout } = useSession();
  const pathname = usePathname();

  if (status === 'loading') {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background p-6">
        <div className="flex flex-col items-center gap-4 max-w-sm w-full">
          <LoadingSkeleton className="h-10 w-10 rounded-full" />
          <LoadingSkeleton className="h-4 w-48" />
          <LoadingSkeleton className="h-3 w-32" />
        </div>
      </div>
    );
  }

  // Filter navigation items by active user role, permissions, and client-enabled modules
  const visibleNav = NAV_ITEMS.filter((item) => {
    if (item.module && !isModuleEnabled(item.module)) return false;
    if (item.permission && !can(item.permission)) return false;
    return true;
  });

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-border bg-surface">
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <span className="font-heading font-bold text-lg text-foreground">
              Creator Studio
            </span>
          </Link>
          <span className="rounded-full bg-accent/60 px-2 py-0.5 text-xs font-semibold text-foreground uppercase tracking-wider">
            Admin
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {visibleNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:bg-surface-muted hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Footer Profile & Role */}
        <div className="border-t border-border p-4 bg-surface-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              <UserAvatar name={user?.name ?? 'Admin User'} src={user?.avatarUrl} size="sm" />
              <div className="truncate">
                <p className="text-xs font-semibold text-foreground truncate">
                  {user?.name ?? 'Staff User'}
                </p>
                <p className="text-xs text-muted-foreground truncate capitalize">
                  {user?.role ?? 'Role Authenticated'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-danger"
              onClick={() => logout()}
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-surface/80 px-8 backdrop-blur-md">
          <div className="text-xs font-medium text-muted-foreground">
            Influencer Management System
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="text-xs">
                View Public Site ↗
              </Button>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
