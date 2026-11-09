'use client';

import React, { useState } from 'react';
import { PageHeader, DataTable, Button, FormModal, Input, Badge, Money, StatCard } from '@platform/ui';
import { useSession } from '@/providers/SessionProvider';
import { DollarSign, FileText, Download, Plus, ArrowUpRight } from 'lucide-react';

interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number; // minor units
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
}

export default function FinanceAdminPage() {
  const { can } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [invoices, setInvoices] = useState<InvoiceItem[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2026-001',
      clientName: 'NexTech Devices (Deliverable #1)',
      amount: 750000, // $7,500.00
      dueDate: '2026-11-20',
      status: 'PAID',
    },
    {
      id: '2',
      invoiceNumber: 'INV-2026-002',
      clientName: 'CloudDev Software (Q4 Retainer)',
      amount: 850000, // $8,500.00
      dueDate: '2026-11-30',
      status: 'PENDING',
    },
    {
      id: '3',
      invoiceNumber: 'INV-2026-003',
      clientName: 'AudioTech Labs (Earbuds Review)',
      amount: 450000, // $4,500.00
      dueDate: '2026-12-05',
      status: 'PENDING',
    },
  ]);

  const [clientName, setClientName] = useState('');
  const [amountStr, setAmountStr] = useState('5000');
  const [dueDate, setDueDate] = useState('2026-12-15');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName) return;

    const newInv: InvoiceItem = {
      id: String(Date.now()),
      invoiceNumber: `INV-2026-${String(invoices.length + 1).padStart(3, '0')}`,
      clientName,
      amount: Math.round(parseFloat(amountStr) * 100),
      dueDate,
      status: 'PENDING',
    };

    setInvoices([newInv, ...invoices]);
    setClientName('');
    setIsModalOpen(false);
  };

  const columns = [
    {
      key: 'invoiceNumber',
      header: 'Invoice #',
      render: (row: InvoiceItem) => (
        <span className="font-mono text-xs font-semibold text-foreground">
          {row.invoiceNumber}
        </span>
      ),
    },
    {
      key: 'clientName',
      header: 'Client / Sponsor',
      render: (row: InvoiceItem) => (
        <span className="text-xs font-medium text-foreground">{row.clientName}</span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (row: InvoiceItem) => (
        <Money amount={row.amount} currency="USD" className="text-xs font-semibold" />
      ),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      render: (row: InvoiceItem) => (
        <span className="text-xs text-muted-foreground">{row.dueDate}</span>
      ),
    },
    {
      key: 'status',
      header: 'Payment Status',
      render: (row: InvoiceItem) => {
        let variant: 'success' | 'warning' | 'danger' = 'warning';
        if (row.status === 'PAID') variant = 'success';
        if (row.status === 'OVERDUE') variant = 'danger';
        return <Badge variant={variant}>{row.status}</Badge>;
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
          <Download className="h-3.5 w-3.5" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Finance, Earnings & Milestone Invoices"
        description="Monitor sponsor payouts, generate digital milestone invoices, and track revenue ledger."
        actions={
          can('earnings.write') && (
            <Button size="sm" onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-1" />
              <span>Create Invoice</span>
            </Button>
          )
        }
      />

      {/* Revenue KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Total Gross Revenue (YTD)"
          value="$145,200"
          delta={{ value: '+24% YoY', positive: true }}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatCard
          title="Pending Payouts"
          value="$13,000"
          description="2 milestone invoices awaiting payment"
          icon={<FileText className="h-4 w-4" />}
        />
        <StatCard
          title="Merchandise Net"
          value="$8,450"
          delta={{ value: '+12% this month', positive: true }}
          icon={<ArrowUpRight className="h-4 w-4 text-success" />}
        />
      </div>

      <DataTable columns={columns} data={invoices} keyField="id" />

      {/* Create Invoice Modal */}
      <FormModal
        isOpen={isModalOpen}
        title="Generate Milestone Invoice"
        description="Issue a new invoice for sponsor deliverables or services."
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground">Client / Sponsor</label>
            <Input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. Acme Tech Corporation"
              className="mt-1"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground">Amount (USD)</label>
              <Input
                type="number"
                value={amountStr}
                onChange={(e) => setAmountStr(e.target.value)}
                placeholder="5000"
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Due Date</label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
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
              Issue Invoice
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}

