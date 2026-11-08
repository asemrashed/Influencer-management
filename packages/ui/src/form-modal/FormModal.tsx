import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../primitives/button.js';
import { cn } from '../lib/utils.js';

export interface FormModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

export function FormModal({
  isOpen,
  title,
  description,
  children,
  onClose,
  className,
}: FormModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div
        className={cn(
          'w-full max-w-lg rounded-xl border border-border bg-surface p-6 shadow-xl text-foreground relative my-8',
          className
        )}
      >
        <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
          <div>
            <h3 className="text-lg font-semibold font-heading">{title}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}

