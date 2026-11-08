'use client';

import React, { useState } from 'react';
import { PageHeader, DataTable, Button, FormModal, Input, StatusBadge, Money } from '@platform/ui';
import { useSession } from '@/providers/SessionProvider';
import { Plus, Briefcase, Calendar, CheckCircle2 } from 'lucide-react';

interface CampaignItem {
  id: string;
  name: string;
  brand: string;
  budget: number;
  status: 'PLANNING' | 'ACTIVE' | 'IN_REVIEW' | 'COMPLETED' | 'CANCELLED';
  startDate: string;
  endDate: string;
  deliverablesCount: number;
}

export default function CampaignsPage() {
  const { can } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaigns, setCampaigns] = useState<CampaignItem[]>([
    {
      id: '1',
      name: 'Summer Tech Launch Spotlight',
      brand: 'NexTech Devices',
      budget: 1500000, // $15,000.00
      status: 'ACTIVE',
      startDate: '2026-11-01',
      endDate: '2026-11-30',
      deliverablesCount: 3,
    },
    {
      id: '2',
      name: 'Developer Workstation Tour',
      brand: 'CloudDev Software',
      budget: 850000, // $8,500.00
      status: 'IN_REVIEW',
      startDate: '2026-10-15',
      endDate: '2026-11-10',
      deliverablesCount: 2,
    },
    {
      id: '3',
      name: 'Smart Home Automation Review',
      brand: 'HomeTech',
      budget: 1200000, // $12,000.00
      status: 'PLANNING',
      startDate: '2026-12-01',
      endDate: '2026-12-20',
      deliverablesCount: 4,
    },
  ]);

  const [formName, setFormName] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formBudget, setFormBudget] = useState('10000');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formBrand) return;

    const newCampaign: CampaignItem = {
      id: String(Date.now()),
      name: formName,
      brand: formBrand,
      budget: Math.round(parseFloat(formBudget) * 100),
      status: 'PLANNING',
      startDate: new Date().toISOString().split('T')[0] ?? '2026-11-04',
      endDate: '2026-12-31',
      deliverablesCount: 1,
    };

    setCampaigns([newCampaign, ...campaigns]);
    setFormName('');
    setFormBrand('');
    setIsModalOpen(false);
  };

  const statusToneMap: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
    ACTIVE: 'success',
    IN_REVIEW: 'warning',
    PLANNING: 'info',
    COMPLETED: 'default',
    CANCELLED: 'danger',
  };

  const columns = [
    {
      key: 'name',
      header: 'Campaign & Brand',
      render: (row: CampaignItem) => (
        <div>
          <div className="font-semibold text-foreground flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-primary shrink-0" />
            <span>{row.name}</span>
          </div>
          <span className="text-xs text-muted-foreground">{row.brand}</span>
        </div>
      ),
    },
    {
      key: 'budget',
      header: 'Budget',
      render: (row: CampaignItem) => (
        <Money amount={row.budget} currency="USD" className="text-sm font-semibold text-foreground" />
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: CampaignItem) => (
        <StatusBadge status={row.status} tone={statusToneMap[row.status] ?? 'default'} />
      ),
    },
    {
      key: 'deliverablesCount',
      header: 'Deliverables',
      render: (row: CampaignItem) => (
        <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
          <CheckCircle2 className="h-3.5 w-3.5 text-success" />
          {row.deliverablesCount} items
        </span>
      ),
    },
    {
      key: 'dates',
      header: 'Timeline',
      render: (row: CampaignItem) => (
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          {row.startDate} → {row.endDate}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Campaigns & Brand Collaborations"
        description="Track active sponsorships, negotiated budgets, deliverables, and approval states."
        actions={
          can('campaigns.write') && (
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              <span>Create Campaign</span>
            </Button>
          )
        }
      />

      <DataTable
        columns={columns}
        data={campaigns}
        keyField="id"
      />

      <FormModal
        isOpen={isModalOpen}
        title="New Brand Collaboration"
        description="Enter sponsorship campaign details and budget allocation."
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground">Campaign Title</label>
            <Input
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g. Winter Gadget Showcase"
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Brand / Sponsor Name</label>
            <Input
              value={formBrand}
              onChange={(e) => setFormBrand(e.target.value)}
              placeholder="e.g. TechCorp Inc."
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Budget (USD)</label>
            <Input
              type="number"
              value={formBudget}
              onChange={(e) => setFormBudget(e.target.value)}
              placeholder="10000"
              className="mt-1"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Save Campaign
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}

