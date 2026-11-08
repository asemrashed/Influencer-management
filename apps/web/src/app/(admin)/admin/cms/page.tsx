'use client';

import React, { useState } from 'react';
import { PageHeader, DataTable, Button, FormModal, Input, Badge } from '@platform/ui';
import { useSession } from '@/providers/SessionProvider';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  category: 'Service' | 'Video' | 'Partner' | 'Bio';
  status: 'Published' | 'Draft';
  lastUpdated: string;
}

export default function CMSPage() {
  const { can } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'Brand Collaborations Service Offering',
      category: 'Service',
      status: 'Published',
      lastUpdated: '2 hours ago',
    },
    {
      id: '2',
      title: 'iPhone 16 Pro — 5 New Features (Featured Video)',
      category: 'Video',
      status: 'Published',
      lastUpdated: 'Yesterday',
    },
    {
      id: '3',
      title: 'Microsoft Collaboration Spotlight',
      category: 'Partner',
      status: 'Published',
      lastUpdated: '3 days ago',
    },
    {
      id: '4',
      title: 'Hero Pitch: +220% Growth Consultation',
      category: 'Bio',
      status: 'Draft',
      lastUpdated: 'Oct 28, 2026',
    },
  ]);

  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<'Service' | 'Video' | 'Partner' | 'Bio'>('Service');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return;

    const newItem: ContentItem = {
      id: String(Date.now()),
      title: formTitle,
      category: formCategory,
      status: 'Draft',
      lastUpdated: 'Just now',
    };

    setItems([newItem, ...items]);
    setFormTitle('');
    setIsModalOpen(false);
  };

  const columns = [
    {
      key: 'title',
      header: 'Title / Section',
      render: (row: ContentItem) => (
        <div>
          <span className="font-medium text-foreground">{row.title}</span>
          <span className="block text-xs text-muted-foreground">{row.category} Block</span>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (row: ContentItem) => (
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
          {row.category}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: ContentItem) => (
        <Badge variant={row.status === 'Published' ? 'success' : 'secondary'}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: 'lastUpdated',
      header: 'Last Updated',
      render: (row: ContentItem) => (
        <span className="text-xs text-muted-foreground">{row.lastUpdated}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row: ContentItem) => (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-danger"
            onClick={() => setItems(items.filter((i) => i.id !== row.id))}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="CMS & Public Site Content"
        description="Manage the live sections, featured videos, brand offerings, and partner listings on your public site."
        actions={
          can('portfolio.write') && (
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              <span>Add Content Block</span>
            </Button>
          )
        }
      />

      <DataTable
        columns={columns}
        data={items}
        keyField="id"
      />

      <FormModal
        isOpen={isModalOpen}
        title="Create New Content Block"
        description="Define a new public section or content showcase."
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground">Content Title</label>
            <Input
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g. Autumn Gear Sponsorships"
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Section Category</label>
            <select
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value as 'Service' | 'Video' | 'Partner' | 'Bio')}
              className="mt-1 flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="Service">Service</option>
              <option value="Video">Video</option>
              <option value="Partner">Partner</option>
              <option value="Bio">Bio</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Save Content Block
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}

