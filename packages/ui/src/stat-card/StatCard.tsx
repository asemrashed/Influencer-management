import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../primitives/card.js';
import { cn } from '../lib/utils.js';

export interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  delta?: {
    value: string | number;
    positive?: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  description,
  delta,
  icon,
  className,
}: StatCardProps) {
  return (
    <Card className={cn('overflow-hidden transition-all hover:shadow-md', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground font-heading">{value}</div>
        {(delta || description) && (
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            {delta && (
              <span
                className={cn(
                  'font-medium',
                  delta.positive ? 'text-success' : 'text-danger'
                )}
              >
                {delta.positive ? '↑ ' : '↓ '}
                {delta.value}
              </span>
            )}
            {description && <span>{description}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

