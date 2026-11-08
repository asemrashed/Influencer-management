import React from 'react';
import { cn } from '../lib/utils.js';

export interface DataTableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  keyField: keyof T | ((row: T) => string);
  emptyMessage?: string;
  isLoading?: boolean;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyField,
  emptyMessage = 'No records found',
  isLoading = false,
  className,
}: DataTableProps<T>) {
  const getKey = (row: T, index: number): string => {
    if (typeof keyField === 'function') return keyField(row);
    const val = row[keyField];
    return typeof val === 'string' || typeof val === 'number' ? String(val) : String(index);
  };

  return (
    <div className={cn('w-full overflow-x-auto rounded-xl border border-border bg-surface', className)}>
      <table className="w-full caption-bottom text-sm">
        <thead className="border-b border-border bg-surface-muted/50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'h-10 px-4 text-left align-middle font-medium text-muted-foreground text-xs uppercase tracking-wider',
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <span>Loading data...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="h-24 text-center text-muted-foreground text-sm">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={getKey(row, idx)}
                className="transition-colors hover:bg-surface-muted/50 data-[state=selected]:bg-muted"
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn('p-4 align-middle text-foreground', col.className)}>
                    {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

