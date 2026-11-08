import React from 'react';
import { ToggleLeft } from 'lucide-react';
import { cn } from '../lib/utils.js';

export interface ModuleOffStateProps {
  moduleName: string;
  className?: string;
}

export function ModuleOffState({ moduleName, className }: ModuleOffStateProps) {
  return (
    <div
      className={cn(
        'flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface p-8 text-center',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-4">
        <ToggleLeft className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-foreground font-heading">
        Module Disabled
      </h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-md">
        The <span className="font-semibold text-foreground">{moduleName}</span> module is currently disabled for this influencer account.
      </p>
    </div>
  );
}

