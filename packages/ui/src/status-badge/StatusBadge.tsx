import React from 'react';
import { Badge } from '../primitives/badge.js';
import { cn } from '../lib/utils.js';

export interface StatusBadgeProps {
  status: string;
  tone?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export function StatusBadge({ status, tone = 'default', className }: StatusBadgeProps) {
  const variant = tone === 'info' ? 'secondary' : tone;
  return (
    <Badge
      variant={variant}
      className={cn('capitalize font-medium tracking-wide', className)}
    >
      {status.replace(/_/g, ' ')}
    </Badge>
  );
}

