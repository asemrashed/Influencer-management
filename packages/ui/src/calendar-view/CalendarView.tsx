import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../primitives/card.js';
import { cn } from '../lib/utils.js';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type?: string;
}

export interface CalendarViewProps {
  events: CalendarEvent[];
  selectedDate?: string;
  onSelectDate?: (date: string) => void;
  className?: string;
}

export function CalendarView({
  events,
  selectedDate,
  onSelectDate,
  className,
}: CalendarViewProps) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Schedule & Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">
            No events or meetings scheduled for this period.
          </p>
        ) : (
          <div className="space-y-2">
            {events.map((ev) => (
              <div
                key={ev.id}
                onClick={() => onSelectDate?.(ev.date)}
                className={cn(
                  'flex items-center justify-between p-3 rounded-lg border border-border bg-surface-muted/40 cursor-pointer hover:bg-surface-muted transition-colors',
                  selectedDate === ev.date && 'border-primary'
                )}
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{ev.title}</p>
                  <p className="text-xs text-muted-foreground">{ev.date}</p>
                </div>
                {ev.type && (
                  <span className="text-xs bg-surface border border-border px-2 py-0.5 rounded-full text-foreground">
                    {ev.type}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

