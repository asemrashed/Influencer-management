import React from 'react';
import { Badge } from '../primitives/badge.js';
import { cn } from '../lib/utils.js';

export interface ConnectionStatusProps {
  connected: boolean;
  username?: string | null;
  className?: string;
}

export function ConnectionStatus({
  connected,
  username,
  className,
}: ConnectionStatusProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Badge variant={connected ? 'success' : 'secondary'}>
        <span
          className={cn(
            'mr-1.5 h-1.5 w-1.5 rounded-full inline-block',
            connected ? 'bg-success' : 'bg-muted-foreground'
          )}
        />
        {connected ? 'Connected' : 'Disconnected'}
      </Badge>
      {username && (
        <span className="text-xs text-muted-foreground">@{username}</span>
      )}
    </div>
  );
}

