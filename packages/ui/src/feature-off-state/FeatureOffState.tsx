import React from 'react';
import { PowerOff } from 'lucide-react';
import { cn } from '../lib/utils.js';

export interface FeatureOffStateProps {
  featureName: string;
  reason?: string;
  className?: string;
}

export function FeatureOffState({
  featureName,
  reason = 'This capability is not configured or enabled on this deployment.',
  className,
}: FeatureOffStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface p-8 text-center',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
        <PowerOff className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-foreground font-heading">
        {featureName} Unavailable
      </h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-md">{reason}</p>
    </div>
  );
}

