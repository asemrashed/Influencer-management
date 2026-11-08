import React from 'react';
import { UploadCloud } from 'lucide-react';
import { Button } from '../primitives/button.js';
import { cn } from '../lib/utils.js';

export interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMb?: number;
  isLoading?: boolean;
  className?: string;
}

export function FileUploader({
  onFileSelect,
  accept = 'image/png,image/jpeg,image/webp',
  maxSizeMb = 8,
  isLoading = false,
  className,
}: FileUploaderProps) {
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);
    if (file.size > maxSizeMb * 1024 * 1024) {
      setError(`File size exceeds maximum allowed size of ${maxSizeMb} MB.`);
      return;
    }
    onFileSelect(file);
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        onClick={() => !isLoading && inputRef.current?.click()}
        className={cn(
          'flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl p-6 bg-surface hover:bg-surface-muted transition-colors cursor-pointer text-center',
          isLoading && 'opacity-50 pointer-events-none'
        )}
      >
        <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm font-medium text-foreground">
          Click or drag file to upload
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Max file size: {maxSizeMb}MB. Supported formats: {accept}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        {isLoading && (
          <div className="mt-3">
            <Button variant="outline" size="sm" disabled>
              Uploading...
            </Button>
          </div>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-danger font-medium">{error}</p>}
    </div>
  );
}

