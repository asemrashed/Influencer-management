'use client';

import React, { useState } from 'react';
import { PageHeader, ThreadView, Button, Input, UserAvatar, Badge } from '@platform/ui';
import { useSession } from '@/providers/SessionProvider';
import { Send, Mail, Search } from 'lucide-react';

interface ThreadSummary {
  id: string;
  senderName: string;
  subject: string;
  preview: string;
  timestamp: string;
  type: 'PUBLIC_INQUIRY' | 'COLLABORATION' | 'SUPPORT';
  unread: boolean;
}

export default function InboxPage() {
  const { user } = useSession();
  const [selectedThreadId, setSelectedThreadId] = useState('1');
  const [replyText, setReplyText] = useState('');

  const [threads] = useState<ThreadSummary[]>([
    {
      id: '1',
      senderName: 'Elena Rostova (Apex Tech)',
      subject: 'Q1 Flagship Video Sponsorship Inquiry',
      preview: 'Hi John, we would love to sponsor your upcoming review of...',
      timestamp: '10:30 AM',
      type: 'COLLABORATION',
      unread: true,
    },
    {
      id: '2',
      senderName: 'Marcus Bell',
      subject: 'Speaking invitation: Global Creator Summit',
      preview: 'We are thrilled to invite you as our keynote speaker for...',
      timestamp: 'Yesterday',
      type: 'PUBLIC_INQUIRY',
      unread: false,
    },
    {
      id: '3',
      senderName: 'David Chen',
      subject: 'Merchandise order tracking issue #4120',
      preview: 'Hello team, my recent hoodie order arrived with an incorrect...',
      timestamp: 'Nov 2',
      type: 'SUPPORT',
      unread: false,
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'Elena Rostova',
      content: 'Hi John! We love your tech reviews and want to sponsor a dedicated video on our new flagship earbuds launching next month.',
      timestamp: '10:30 AM',
      isSelf: false,
    },
    {
      id: 'm2',
      sender: user?.name ?? 'Creator Team',
      content: 'Thanks Elena! We are definitely interested. Could you share the brief and target publication timeline?',
      timestamp: '10:45 AM',
      isSelf: true,
    },
  ]);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newMsg = {
      id: String(Date.now()),
      sender: user?.name ?? 'Creator Team',
      content: replyText,
      timestamp: 'Just now',
      isSelf: true,
    };

    setMessages([...messages, newMsg]);
    setReplyText('');
  };

  const currentThread = threads.find((t) => t.id === selectedThreadId) ?? threads[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Unified Inbox & Messages"
        description="Consolidated messages across brand inquiries, collaboration pitches, and community support."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-160">
        {/* Left List of Threads */}
        <div className="lg:col-span-5 flex flex-col rounded-xl border border-border bg-surface overflow-hidden">
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-9 text-xs h-9" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {threads.map((t) => {
              const isSelected = t.id === selectedThreadId;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedThreadId(t.id)}
                  className={`p-4 cursor-pointer transition-colors ${
                    isSelected ? 'bg-surface-muted' : 'hover:bg-surface-muted/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <UserAvatar name={t.senderName} size="sm" />
                      <span className="font-semibold text-xs text-foreground truncate max-w-xs">
                        {t.senderName}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{t.timestamp}</span>
                  </div>
                  <p className="text-xs font-medium text-foreground truncate mt-1">
                    {t.subject}
                  </p>
                  <p className="text-xs text-muted-foreground truncate mt-0.5">
                    {t.preview}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <Badge variant="secondary" className="text-xs py-0.5 px-2">
                      {t.type}
                    </Badge>
                    {t.unread && (
                      <span className="h-2 w-2 rounded-full bg-primary inline-block" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Conversation View */}
        <div className="lg:col-span-7 flex flex-col rounded-xl border border-border bg-surface overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm text-foreground">
                {currentThread?.subject}
              </h3>
              <p className="text-xs text-muted-foreground">
                From: {currentThread?.senderName}
              </p>
            </div>
            <Badge variant="outline" className="text-xs">
              <Mail className="h-3 w-3 mr-1" />
              {currentThread?.type}
            </Badge>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            <ThreadView
              title=""
              messages={messages}
              className="border-0 shadow-none h-full"
            />
          </div>

          <form onSubmit={handleSendReply} className="p-3 border-t border-border flex items-center gap-2 bg-surface-muted/30">
            <Input
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply to sponsor or client..."
              className="text-xs"
            />
            <Button size="sm" type="submit" className="shrink-0 gap-1 text-xs">
              <span>Send</span>
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
