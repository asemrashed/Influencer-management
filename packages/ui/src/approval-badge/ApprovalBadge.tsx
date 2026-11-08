import React from 'react';
import { Badge } from '../primitives/badge.js';
import { cn } from '../lib/utils.js';

export interface ApprovalBadgeProps {
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | string;
  className?: string;
}

export function ApprovalBadge({ status, className }: ApprovalBadgeProps) {
  const norm = status.toUpperCase();
  let variant: 'warning' | 'success' | 'danger' | 'secondary' = 'secondary';
  let label = status;

  if (norm.includes('PENDING')) {
    variant = 'warning';
    label = 'Awaiting Approval';
  } else if (norm.includes('APPROV')) {
    variant = 'success';
    label = 'Approved';
  } else if (norm.includes('REJECT')) {
    variant = 'danger';
    label = 'Rejected';
  }

  return (
    <Badge variant={variant} className={cn('font-medium text-xs', className)}>
      {label}
    </Badge>
  );
}

