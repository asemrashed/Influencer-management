import * as React from 'react';
import DOMPurify from 'isomorphic-dompurify';
import { cn } from '../lib/utils.js';

export interface SafeHtmlProps extends React.HTMLAttributes<HTMLDivElement> {
  html: string;
}

export function SafeHtml({ html, className, ...props }: SafeHtmlProps) {
  const clean = React.useMemo(() => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'p', 'b', 'i', 'em', 'strong', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'ul', 'ol', 'li', 'br', 'span', 'blockquote', 'code', 'pre'
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    });
  }, [html]);

  return (
    <div
      className={cn('prose max-w-none text-foreground', className)}
      dangerouslySetInnerHTML={{ __html: clean }}
      {...props}
    />
  );
}

