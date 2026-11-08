import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../primitives/card.js';
import { UserAvatar } from '../user-avatar/UserAvatar.js';
import { cn } from '../lib/utils.js';

export interface ThreadMessage {
  id: string;
  sender: string;
  avatar?: string | null;
  content: string;
  timestamp: string;
  isSelf?: boolean;
}

export interface ThreadViewProps {
  title?: string;
  messages: ThreadMessage[];
  className?: string;
}

export function ThreadView({
  title = 'Conversation',
  messages,
  className,
}: ThreadViewProps) {
  return (
    <Card className={cn('overflow-hidden flex flex-col h-96', className)}>
      <CardHeader className="py-3 border-b border-border">
        <CardTitle className="text-sm font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">
            No messages in this thread yet.
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex gap-3 max-w-md',
                msg.isSelf ? 'ml-auto flex-row-reverse' : ''
              )}
            >
              <UserAvatar name={msg.sender} src={msg.avatar} size="sm" />
              <div
                className={cn(
                  'rounded-xl px-4 py-2.5 text-sm',
                  msg.isSelf
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface-muted text-foreground'
                )}
              >
                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="font-semibold text-xs opacity-90">{msg.sender}</span>
                  <span className="text-xs opacity-75">{msg.timestamp}</span>
                </div>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
