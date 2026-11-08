'use client';

import React, { createContext, useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api, unwrap } from '../lib/api/index';
import { STALE } from '../lib/api/stale';

export interface ModuleInfo {
  key: string;
  enabled: boolean;
}

export interface PermissionInfo {
  key: string;
  scope: 'all' | 'assigned' | 'own';
}

export interface UserSession {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
  role: string;
}

export interface SessionContextType {
  status: 'loading' | 'anonymous' | '2fa' | 'authenticated';
  user: UserSession | null;
  roles: string[];
  permissions: PermissionInfo[];
  modules: Record<string, boolean>;
  can: (permissionKey: string) => boolean;
  isModuleEnabled: (moduleKey: string) => boolean;
  logout: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const qc = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['me'],
    queryFn: () => unwrap(api.GET('/api/v1/me')),
    staleTime: STALE.me,
    retry: false,
  });

  const value = React.useMemo<SessionContextType>(() => {
    if (isLoading) {
      return {
        status: 'loading',
        user: null,
        roles: [],
        permissions: [],
        modules: {},
        can: () => false,
        isModuleEnabled: () => false,
        logout: async () => {},
      };
    }

    if (isError || !data) {
      return {
        status: 'anonymous',
        user: null,
        roles: [],
        permissions: [],
        modules: {},
        can: () => false,
        isModuleEnabled: () => false,
        logout: async () => {},
      };
    }

    // Cast response safely from GET /api/v1/me
    const me = data as unknown as {
      user?: UserSession;
      roles?: string[];
      permissions?: PermissionInfo[];
      modules?: Array<{ key: string; enabled: boolean }>;
      twoFactorRequired?: boolean;
    };

    if (me.twoFactorRequired) {
      return {
        status: '2fa',
        user: me.user ?? null,
        roles: me.roles ?? [],
        permissions: me.permissions ?? [],
        modules: {},
        can: () => false,
        isModuleEnabled: () => false,
        logout: async () => {
          await api.POST('/api/v1/auth/logout').catch(() => {});
          qc.clear();
          window.location.href = '/login';
        },
      };
    }

    const modMap: Record<string, boolean> = {};
    if (Array.isArray(me.modules)) {
      me.modules.forEach((m) => {
        modMap[m.key] = m.enabled;
      });
    }

    const perms = me.permissions ?? [];

    return {
      status: 'authenticated',
      user: me.user ?? null,
      roles: me.roles ?? [],
      permissions: perms,
      modules: modMap,
      can: (permKey: string) => {
        if (me.roles?.includes('Super Admin')) return true;
        return perms.some((p) => p.key === permKey);
      },
      isModuleEnabled: (modKey: string) => {
        return modMap[modKey] ?? true;
      },
      logout: async () => {
        await api.POST('/api/v1/auth/logout').catch(() => {});
        qc.clear();
        window.location.href = '/login';
      },
    };
  }, [data, isLoading, isError, qc]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionContextType {
  const ctx = useContext(SessionContext);
  if (!ctx) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return ctx;
}

export function useCan(permissionKey: string): boolean {
  const { can } = useSession();
  return can(permissionKey);
}

