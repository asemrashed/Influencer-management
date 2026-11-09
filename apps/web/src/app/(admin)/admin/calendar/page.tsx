'use client';

import React, { useState } from 'react';
import { PageHeader, DataTable, Button, FormModal, Input, Badge } from '@platform/ui';
import { useSession } from '@/providers/SessionProvider';
import { Calendar, Plus, Share2, Youtube, Instagram, Twitter } from 'lucide-react';

interface ContentPost {
  id: string;
  title: string;
  platform: 'YOUTUBE' | 'INSTAGRAM' | 'TWITTER' | 'MULTI';
  scheduledDate: string;
  status: 'SCHEDULED' | 'DRAFT' | 'PUBLISHED';
}

export default function ContentCalendarAdminPage() {
  const { can } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState<ContentPost[]>([
    {
      id: '1',
      title: 'Top 5 Mechanical Keyboards of 2026 (Full Review)',
      platform: 'YOUTUBE',
      scheduledDate: '2026-11-12',
      status: 'SCHEDULED',
    },
    {
      id: '2',
      title: 'Desk Setup Tour Reel — Productivity Edition',
      platform: 'INSTAGRAM',
      scheduledDate: '2026-11-15',
      status: 'DRAFT',
    },
    {
      id: '3',
      title: 'Poll: Which processor will power your next rig?',
      platform: 'TWITTER',
      scheduledDate: '2026-11-18',
      status: 'SCHEDULED',
    },
  ]);

  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState<'YOUTUBE' | 'INSTAGRAM' | 'TWITTER' | 'MULTI'>('YOUTUBE');
  const [scheduledDate, setScheduledDate] = useState('2026-11-20');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newPost: ContentPost = {
      id: String(Date.now()),
      title,
      platform,
      scheduledDate,
      status: 'SCHEDULED',
    };

    setPosts([newPost, ...posts]);
    setTitle('');
    setIsModalOpen(false);
  };

  const handlePublishNow = (id: string) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, status: 'PUBLISHED' } : p)));
  };

  const columns = [
    {
      key: 'title',
      header: 'Content Topic / Video Title',
      render: (row: ContentPost) => (
        <span className="font-semibold text-foreground text-xs">{row.title}</span>
      ),
    },
    {
      key: 'platform',
      header: 'Target Platform',
      render: (row: ContentPost) => {
        let Icon = Share2;
        if (row.platform === 'YOUTUBE') Icon = Youtube;
        if (row.platform === 'INSTAGRAM') Icon = Instagram;
        if (row.platform === 'TWITTER') Icon = Twitter;

        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground">
            <Icon className="h-3.5 w-3.5 text-primary" />
            {row.platform}
          </span>
        );
      },
    },
    {
      key: 'date',
      header: 'Publish Date',
      render: (row: ContentPost) => (
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {row.scheduledDate}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: ContentPost) => {
        let variant: 'success' | 'warning' | 'default' = 'default';
        if (row.status === 'PUBLISHED') variant = 'success';
        if (row.status === 'SCHEDULED') variant = 'warning';
        return <Badge variant={variant}>{row.status}</Badge>;
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row: ContentPost) => (
        row.status !== 'PUBLISHED' && can('content.write') ? (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-primary hover:bg-primary/10"
            onClick={() => handlePublishNow(row.id)}
          >
            Publish Now
          </Button>
        ) : (
          <span className="text-xs text-muted-foreground">Live</span>
        )
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Content Publishing & Social Calendar"
        description="Plan video releases, schedule cross-platform social announcements, and trigger instant publishing."
        actions={
          can('content.write') && (
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              <span>Schedule Content</span>
            </Button>
          )
        }
      />

      <DataTable columns={columns} data={posts} keyField="id" />

      {/* Schedule Content Modal */}
      <FormModal
        isOpen={isModalOpen}
        title="Schedule Social Content / Video"
        description="Queue a post across YouTube, Instagram, or X."
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground">Post / Video Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Unboxing Next-Gen Smart Glass prototypes"
              className="mt-1"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as 'YOUTUBE' | 'INSTAGRAM' | 'TWITTER' | 'MULTI')}
                className="mt-1 flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="YOUTUBE">YouTube</option>
                <option value="INSTAGRAM">Instagram</option>
                <option value="TWITTER">X / Twitter</option>
                <option value="MULTI">All Platforms</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Target Date</label>
              <Input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="mt-1"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Queue Post
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}

