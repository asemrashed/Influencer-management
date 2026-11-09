'use client';

import React, { useState } from 'react';
import { PageHeader, DataTable, Button, FormModal, Input, Badge } from '@platform/ui';
import { Plus, CheckCircle } from 'lucide-react';

interface TicketItem {
  id: string;
  ticketNumber: string;
  requesterEmail: string;
  subject: string;
  category: 'STORE_ORDER' | 'COLLABORATION' | 'GENERAL';
  status: 'OPEN' | 'RESOLVED' | 'PENDING';
  lastActivity: string;
}

export default function SupportAdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tickets, setTickets] = useState<TicketItem[]>([
    {
      id: '1',
      ticketNumber: 'TKT-1082',
      requesterEmail: 'david.chen@gmail.com',
      subject: 'Damaged merchandise delivery on order #4120',
      category: 'STORE_ORDER',
      status: 'OPEN',
      lastActivity: '15m ago',
    },
    {
      id: '2',
      ticketNumber: 'TKT-1079',
      requesterEmail: 'sarah.press@wire.com',
      subject: 'Interview press inquiry for Q1 tech outlook',
      category: 'COLLABORATION',
      status: 'PENDING',
      lastActivity: '2h ago',
    },
    {
      id: '3',
      ticketNumber: 'TKT-1065',
      requesterEmail: 'mark@user.io',
      subject: 'Event RSVP QR ticket resend request',
      category: 'GENERAL',
      status: 'RESOLVED',
      lastActivity: 'Yesterday',
    },
  ]);

  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<'STORE_ORDER' | 'COLLABORATION' | 'GENERAL'>('GENERAL');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !subject) return;

    const newTkt: TicketItem = {
      id: String(Date.now()),
      ticketNumber: `TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      requesterEmail: email,
      subject,
      category,
      status: 'OPEN',
      lastActivity: 'Just now',
    };

    setTickets([newTkt, ...tickets]);
    setEmail('');
    setSubject('');
    setIsModalOpen(false);
  };

  const handleResolve = (id: string) => {
    setTickets(tickets.map((t) => (t.id === id ? { ...t, status: 'RESOLVED' } : t)));
  };

  const columns = [
    {
      key: 'ticketNumber',
      header: 'Ticket ID',
      render: (row: TicketItem) => (
        <span className="font-mono text-xs font-semibold text-foreground">
          {row.ticketNumber}
        </span>
      ),
    },
    {
      key: 'subject',
      header: 'Subject & Requester',
      render: (row: TicketItem) => (
        <div>
          <span className="text-xs font-semibold text-foreground">{row.subject}</span>
          <span className="block text-xs text-muted-foreground">{row.requesterEmail}</span>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
      render: (row: TicketItem) => (
        <Badge variant="outline" className="text-xs">
          {row.category.replace(/_/g, ' ')}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: TicketItem) => {
        let variant: 'success' | 'warning' | 'danger' | 'secondary' = 'secondary';
        if (row.status === 'RESOLVED') variant = 'success';
        if (row.status === 'OPEN') variant = 'warning';
        return <Badge variant={variant}>{row.status}</Badge>;
      },
    },
    {
      key: 'lastActivity',
      header: 'Activity',
      render: (row: TicketItem) => (
        <span className="text-xs text-muted-foreground">{row.lastActivity}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row: TicketItem) => (
        row.status !== 'RESOLVED' ? (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-success hover:bg-success/10"
            onClick={() => handleResolve(row.id)}
          >
            <CheckCircle className="h-3.5 w-3.5 mr-1" />
            <span>Resolve</span>
          </Button>
        ) : (
          <span className="text-xs text-muted-foreground">Closed</span>
        )
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Community & Client Support Tickets"
        description="Review inbound help requests, store customer support issues, and fan inquiries."
        actions={
          <Button size="sm" onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            <span>Create Ticket</span>
          </Button>
        }
      />

      <DataTable columns={columns} data={tickets} keyField="id" />

      {/* Create Ticket Modal */}
      <FormModal
        isOpen={isModalOpen}
        title="Create New Support Ticket"
        description="Manually log an inbound customer or sponsor inquiry."
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground">Requester Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@email.com"
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as 'STORE_ORDER' | 'COLLABORATION' | 'GENERAL')}
              className="mt-1 flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="STORE_ORDER">Merchandise & Store Order</option>
              <option value="COLLABORATION">Brand Collaboration / Deal</option>
              <option value="GENERAL">General Support / Inquiry</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Subject & Description</label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Inquiry regarding order tracking..."
              className="mt-1"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Log Ticket
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}
