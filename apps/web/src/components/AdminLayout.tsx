'use client';

import React, { useState } from 'react';
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
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
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
  { label: 'Inbox & AI Copilot', href: '/admin/inbox', icon: Inbox, module: 'inbox', permission: 'inbox.read' },
  { label: 'Campaigns & Deals', href: '/admin/campaigns', icon: Briefcase, module: 'campaigns', permission: 'campaigns.read' },
  { label: 'Content Calendar', href: '/admin/calendar', icon: Calendar, module: 'content', permission: 'content.read' },
  { label: 'PR & Events', href: '/admin/events', icon: Calendar, module: 'events', permission: 'events.read' },
  { label: 'Contacts & CRM', href: '/admin/contacts', icon: Users, module: 'contacts', permission: 'contacts.read' },
  { label: 'Store & Merch', href: '/admin/store', icon: ShoppingBag, module: 'store', permission: 'store.read' },
  { label: 'Finance & Earnings', href: '/admin/finance', icon: DollarSign, module: 'earnings', permission: 'earnings.read' },
  { label: 'Social & Growth', href: '/admin/social', icon: BarChart2, module: 'social', permission: 'social.read' },
  { label: 'AI Studio', href: '/admin/ai', icon: Sparkles, module: 'ai', permission: 'ai.generate' },
  { label: 'Support Tickets', href: '/admin/support', icon: LifeBuoy, module: 'support', permission: 'support.read' },
  { label: 'Roles & Staff', href: '/admin/roles', icon: Shield, permission: 'roles.read' },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { status, user, roles, can, isModuleEnabled, logout } = useSession();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const primaryRoleName = roles.length > 0 ? (roles[0]?.name ?? 'Team Member') : 'Team Member';

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
      {/* Mobile Drawer (from right side on < md screens) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer container */}
          <div className="relative w-72 max-w-[85vw] h-full bg-surface border-l border-border shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
            <div className="flex h-16 items-center justify-between border-b border-border px-5">
              <span className="font-heading font-bold text-base text-foreground">Creator Studio</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="px-5 py-3 border-b border-border bg-surface-muted/30">
              <span className="rounded-md bg-surface-muted px-2.5 py-1 text-xs font-medium text-muted-foreground tracking-wide">
                {primaryRoleName}
              </span>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {visibleNav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-surface-muted text-foreground font-semibold shadow-xs border border-border/80'
                        : 'text-muted-foreground hover:bg-surface-muted/60 hover:text-foreground'
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-border p-4 bg-surface-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <UserAvatar name={user?.name ?? 'Admin User'} src={user?.avatarUrl} size="sm" />
                  <div className="truncate">
                    <p className="text-xs font-semibold text-foreground truncate">{user?.name ?? 'Staff User'}</p>
                    <p className="text-xs text-muted-foreground truncate capitalize">{primaryRoleName}</p>
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
          </div>
        </div>
      )}

      {/* Desktop Sidebar (hidden on mobile, collapsible on PC) */}
      <aside
        className={`hidden md:flex fixed inset-y-0 left-0 z-30 flex-col border-r border-border bg-surface transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-3">
          {!isCollapsed ? (
            <>
              <Link href="/admin/dashboard" className="flex items-center min-w-0">
                <span className="font-heading font-bold text-base text-foreground whitespace-nowrap">
                  Creator Studio
                </span>
              </Link>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="rounded-md bg-surface-muted px-2 py-0.5 text-xs font-medium text-muted-foreground whitespace-nowrap">
                  {primaryRoleName}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground shrink-0"
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  title="Collapse sidebar"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 mx-auto text-muted-foreground hover:text-foreground"
              onClick={() => setIsCollapsed(!isCollapsed)}
              title="Expand sidebar"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {visibleNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={`flex items-center gap-3 rounded-md py-2 text-xs font-medium transition-colors ${
                  isCollapsed ? 'justify-center px-2' : 'px-3'
                } ${
                  isActive
                    ? 'bg-surface-muted text-foreground font-semibold shadow-xs border border-border/80'
                    : 'text-muted-foreground hover:bg-surface-muted/60 hover:text-foreground'
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Footer Profile & Role */}
        <div className="border-t border-border p-3 bg-surface-muted/30">
          <div className="flex items-center justify-between">
            <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'justify-center w-full' : ''}`}>
              <UserAvatar name={user?.name ?? 'Admin User'} src={user?.avatarUrl} size="sm" />
              {!isCollapsed && (
                <div className="truncate">
                  <p className="text-xs font-semibold text-foreground truncate">
                    {user?.name ?? 'Staff User'}
                  </p>
                  <p className="text-xs text-muted-foreground truncate capitalize">
                    {primaryRoleName}
                  </p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-danger"
                onClick={() => logout()}
                title="Sign Out"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex flex-1 flex-col transition-all duration-300 w-full ${
          isCollapsed ? 'md:pl-20' : 'md:pl-64'
        }`}
      >
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-surface/80 px-4 sm:px-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="text-xs font-medium text-muted-foreground truncate">
              Influencer Management System
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/" target="_blank">
              <Button variant="outline" size="sm" className="text-xs">
                View Public Site ↗
              </Button>
            </Link>
            {/* Mobile Navbar 3-liner Menu Button at the right */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden h-9 w-9 rounded-lg"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation drawer"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
