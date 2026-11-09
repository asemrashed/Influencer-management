import React, { useEffect } from 'react';
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
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Backdrop click handler */}
      <div className="fixed inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Container: 90vw on mobile, 70vw on PC */}
      <div
        className={cn(
          'relative w-[90vw] md:w-[70vw] max-w-4xl max-h-[85vh] flex flex-col rounded-2xl border border-border bg-surface shadow-2xl text-foreground overflow-hidden my-auto',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with clear title and close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-surface-muted/30 shrink-0">
          <div>
            <h3 className="text-base sm:text-lg font-bold font-heading text-foreground">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground shrink-0"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Scrollable Content Body with balanced internal padding */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}
