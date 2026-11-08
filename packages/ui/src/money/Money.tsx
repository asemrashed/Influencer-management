import React from 'react';
import { cn } from '../lib/utils.js';

export interface MoneyProps {
  amount: number; // minor units (cents / paisa)
  currency?: string;
  className?: string;
}

export function Money({ amount, currency = 'USD', className }: MoneyProps) {
  const formatted = React.useMemo(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount / 100);
  }, [amount, currency]);

  return <span className={cn('font-mono font-medium', className)}>{formatted}</span>;
}

