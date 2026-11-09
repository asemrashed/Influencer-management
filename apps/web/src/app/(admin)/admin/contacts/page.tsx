'use client';

import React, { useState } from 'react';
import { PageHeader, DataTable, Button, FormModal, Input, Badge } from '@platform/ui';
import { useSession } from '@/providers/SessionProvider';
import { Users, Plus, Building2, Mail, Phone } from 'lucide-react';

interface ContactItem {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  status: 'ACTIVE' | 'LEAD';
  dealsCount: number;
}

export default function ContactsAdminPage() {
  const { can } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [contacts, setContacts] = useState<ContactItem[]>([
    {
      id: '1',
      name: 'Elena Rostova',
      company: 'Apex Tech Inc.',
      email: 'elena@apextech.com',
      phone: '+1 555-0192',
      status: 'ACTIVE',
      dealsCount: 3,
    },
    {
      id: '2',
      name: 'Marcus Vance',
      company: 'CloudDev Software',
      email: 'marcus@clouddev.io',
      phone: '+1 555-4821',
      status: 'ACTIVE',
      dealsCount: 2,
    },
    {
      id: '3',
      name: 'Sarah Jenkins',
      company: 'AudioLuxe Gear',
      email: 'sarah.j@audioluxe.com',
      status: 'LEAD',
      dealsCount: 0,
    },
  ]);

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newContact: ContactItem = {
      id: String(Date.now()),
      name,
      company: company || 'Independent Sponsor',
      email,
      phone: phone || undefined,
      status: 'LEAD',
      dealsCount: 0,
    };

    setContacts([newContact, ...contacts]);
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
    setIsModalOpen(false);
  };

  const columns = [
    {
      key: 'name',
      header: 'Contact & Company',
      render: (row: ContactItem) => (
        <div>
          <span className="font-semibold text-foreground text-xs flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5 text-primary" />
            {row.name}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <Building2 className="h-3 w-3" />
            {row.company}
          </span>
        </div>
      ),
    },
    {
      key: 'email',
      header: 'Communication',
      render: (row: ContactItem) => (
        <div className="text-xs">
          <span className="text-foreground flex items-center gap-1">
            <Mail className="h-3 w-3 text-muted-foreground" />
            {row.email}
          </span>
          {row.phone && (
            <span className="text-muted-foreground flex items-center gap-1 mt-0.5">
              <Phone className="h-3 w-3" />
              {row.phone}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'deals',
      header: 'Campaign History',
      render: (row: ContactItem) => (
        <span className="text-xs text-foreground font-medium">
          {row.dealsCount} sponsored deals
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: ContactItem) => (
        <Badge variant={row.status === 'ACTIVE' ? 'success' : 'secondary'}>
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contacts & Sponsor CRM Directory"
        description="Directory of tech brand representatives, PR managers, and agency contacts."
        actions={
          can('contacts.write') && (
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              <span>Add Contact</span>
            </Button>
          )
        }
      />

      <DataTable columns={columns} data={contacts} keyField="id" />

      {/* Add Contact Modal */}
      <FormModal
        isOpen={isModalOpen}
        title="Add Brand Representative Contact"
        description="Register a new sponsor or company representative."
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground">Contact Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Rachel Adams"
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Company / Brand</label>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Keychron Technology"
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground">Work Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rachel@brand.com"
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Phone</label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555-0100"
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Save Contact
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}

