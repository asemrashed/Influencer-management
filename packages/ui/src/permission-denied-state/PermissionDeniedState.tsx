import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils.js';

export interface PermissionDeniedStateProps {
  title?: string;
  message?: string;
  className?: string;
}

export function PermissionDeniedState({
  title = 'Access Restricted',
  message = "You don't have permission to access or view this module.",
  className,
}: PermissionDeniedStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface p-8 text-center',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10 text-warning mb-4">
        <ShieldAlert className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-foreground font-heading">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-md">{message}</p>
    </div>
  );
}

