import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../primitives/card.js';
import { cn } from '../lib/utils.js';

export interface ListCardItem {
  id: string;
  title: string;
  subtitle?: string;
  meta?: React.ReactNode;
  icon?: React.ReactNode;
}

export interface ListCardProps {
  title: string;
  items: ListCardItem[];
  emptyText?: string;
  action?: React.ReactNode;
  className?: string;
}

export function ListCard({
  title,
  items,
  emptyText = 'No recent items',
  action,
  className,
}: ListCardProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {action && <div>{action}</div>}
      </CardHeader>
      <CardContent className="pt-0">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">{emptyText}</p>
        ) : (
          <div className="divide-y divide-border">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-3">
                  {item.icon && <div className="text-muted-foreground">{item.icon}</div>}
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    {item.subtitle && (
                      <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                    )}
                  </div>
                </div>
                {item.meta && <div className="text-xs text-muted-foreground">{item.meta}</div>}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

