import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../primitives/button.js';
import { cn } from '../lib/utils.js';

export interface PaginationProps {
  hasPrevious: boolean;
  hasNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  currentPage?: number;
  className?: string;
}

export function Pagination({
  hasPrevious,
  hasNext,
  onPrevious,
  onNext,
  currentPage,
  className,
}: PaginationProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-t border-border px-4 py-3 sm:px-6',
        className
      )}
    >
      <div className="flex flex-1 justify-between sm:justify-end gap-2 items-center">
        {currentPage !== undefined && (
          <span className="text-xs text-muted-foreground mr-4">
            Page {currentPage}
          </span>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={onPrevious}
          disabled={!hasPrevious}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={!hasNext}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}

