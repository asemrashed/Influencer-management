'use client';

import React, { useState } from 'react';
import { PageHeader, DataTable, Button, FormModal, Input, Badge, UserAvatar } from '@platform/ui';
import { useSession } from '@/providers/SessionProvider';
import { Shield, UserPlus, Key } from 'lucide-react';

interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Admin' | 'Manager';
  status: 'ACTIVE' | 'INVITED';
  twoFactorEnabled: boolean;
}

export default function RolesAdminPage() {
  const { can } = useSession();
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [users, setUsers] = useState<StaffUser[]>([
    {
      id: '1',
      name: 'Super Admin (Owner)',
      email: 'superadmin@gmail.com',
      role: 'Super Admin',
      status: 'ACTIVE',
      twoFactorEnabled: true,
    },
    {
      id: '2',
      name: 'Admin User',
      email: 'admin@gmail.com',
      role: 'Admin',
      status: 'ACTIVE',
      twoFactorEnabled: true,
    },
    {
      id: '3',
      name: 'Manager User',
      email: 'manager@gmail.com',
      role: 'Manager',
      status: 'ACTIVE',
      twoFactorEnabled: false,
    },
  ]);

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState<'Admin' | 'Manager'>('Manager');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !inviteName) return;

    const newUser: StaffUser = {
      id: String(Date.now()),
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      status: 'INVITED',
      twoFactorEnabled: false,
    };

    setUsers([...users, newUser]);
    setInviteEmail('');
    setInviteName('');
    setIsInviteModalOpen(false);
  };

  const columns = [
    {
      key: 'name',
      header: 'Staff Member',
      render: (row: StaffUser) => (
        <div className="flex items-center gap-3">
          <UserAvatar name={row.name} size="sm" />
          <div>
            <p className="font-semibold text-foreground text-xs">{row.name}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Assigned Role',
      render: (row: StaffUser) => (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
          <Shield className="h-3.5 w-3.5 text-primary" />
          {row.role}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Account Status',
      render: (row: StaffUser) => (
        <Badge variant={row.status === 'ACTIVE' ? 'success' : 'secondary'}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: 'twoFactor',
      header: '2FA Security',
      render: (row: StaffUser) => (
        <Badge variant={row.twoFactorEnabled ? 'outline' : 'secondary'}>
          <Key className="h-3 w-3 mr-1" />
          {row.twoFactorEnabled ? 'Enabled' : 'Disabled'}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Staff & Role Permissions"
        description="Manage workspace team members, role assignments, and 2FA security enforcement."
        actions={
          can('users.invite') && (
            <Button size="sm" onClick={() => setIsInviteModalOpen(true)}>
              <UserPlus className="h-4 w-4 mr-1" />
              <span>Invite Staff Member</span>
            </Button>
          )
        }
      />

      <DataTable
        columns={columns}
        data={users}
        keyField="id"
      />

      <FormModal
        isOpen={isInviteModalOpen}
        title="Invite New Staff Member"
        description="Send an invitation link with role permissions."
        onClose={() => setIsInviteModalOpen(false)}
      >
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground">Full Name</label>
            <Input
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              placeholder="Alex Smith"
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Email Address</label>
            <Input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="alex@team.com"
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Role</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as 'Admin' | 'Manager')}
              className="mt-1 flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="Manager">Manager (Brand/PR Scope)</option>
              <option value="Admin">Admin (Full Team Scope)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsInviteModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Send Invitation
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}

