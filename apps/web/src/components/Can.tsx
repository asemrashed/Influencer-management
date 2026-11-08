'use client';

import React from 'react';
import { useSession } from '@/providers/SessionProvider';

export interface CanProps {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function Can({ permission, children, fallback = null }: CanProps) {
  const { can } = useSession();
  if (!can(permission)) {
    return <>{fallback}</>;
  }
  return <>{children}</>;
}

