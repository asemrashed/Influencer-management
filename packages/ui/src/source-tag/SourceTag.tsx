import React from 'react';
import { Badge } from '../primitives/badge.js';
import { cn } from '../lib/utils.js';

export interface SourceTagProps {
  source: 'manual' | 'synced' | string;
  className?: string;
}

export function SourceTag({ source, className }: SourceTagProps) {
  const isSynced = source.toLowerCase() === 'synced';
  return (
    <Badge
      variant="outline"
      className={cn(
        'text-[10px] uppercase font-mono px-1.5 py-0 border-border text-muted-foreground',
        className
      )}
    >
      {isSynced ? '⚡ Synced' : '✎ Manual'}
    </Badge>
  );
}

