import React from 'react';
import { cn } from '../lib/utils.js';

export interface DateTimeProps {
  date: string | Date | number;
  format?: 'date' | 'datetime' | 'relative';
  className?: string;
}

export function DateTime({ date, format = 'date', className }: DateTimeProps) {
  const formatted = React.useMemo(() => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return 'Invalid date';

    if (format === 'datetime') {
      return d.toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });
    }

    if (format === 'relative') {
      const now = Date.now();
      const diffSec = Math.floor((now - d.getTime()) / 1000);
      if (diffSec < 60) return 'just now';
      if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
      if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
      return `${Math.floor(diffSec / 86400)}d ago`;
    }

    return d.toLocaleDateString('en-US', {
      dateStyle: 'medium',
    });
  }, [date, format]);

  return <span className={cn('text-muted-foreground', className)}>{formatted}</span>;
}

