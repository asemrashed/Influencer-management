'use client';

import React from 'react';
import { PageHeader, StatCard, ChartCard, ListCard, Button, StatusBadge } from '@platform/ui';
import { useSession } from '@/providers/SessionProvider';
import { DollarSign, Users, Briefcase, Eye, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { user } = useSession();

  const recentDeals = [
    {
      id: '1',
      title: 'Acme Hardware — Summer Campaign',
      subtitle: '$12,500 • 2 Deliverables',
      meta: <StatusBadge status="ACTIVE" tone="success" />,
    },
    {
      id: '2',
      title: 'NexTech — Flagship Review',
      subtitle: '$8,000 • 1 Deliverable',
      meta: <StatusBadge status="IN_REVIEW" tone="warning" />,
    },
    {
      id: '3',
      title: 'CloudDev — Developer Toolkit',
      subtitle: '$15,000 • 3 Deliverables',
      meta: <StatusBadge status="PROPOSAL_SENT" tone="info" />,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.name ?? 'Creator'}!`}
        description="Here is your real-time performance summary, brand pipeline, and platform activity."
        actions={
          <div className="flex items-center gap-2">
            <Link href="/admin/campaigns">
              <Button size="sm">
                <span>New Campaign</span>
                <span className="text-xs"> +</span>
              </Button>
            </Link>
          </div>
        }
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Earnings (MTD)"
          value="$34,500"
          delta={{ value: '18% vs last month', positive: true }}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatCard
          title="Active Brand Deals"
          value="7"
          delta={{ value: '2 pending review', positive: true }}
          icon={<Briefcase className="h-4 w-4" />}
        />
        <StatCard
          title="Total Audience"
          value="4.8M"
          delta={{ value: '+45K this week', positive: true }}
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Monthly Video Views"
          value="12.4M"
          delta={{ value: '+8.2%', positive: true }}
          icon={<Eye className="h-4 w-4" />}
        />
      </div>

      {/* Main Grid: Pipeline and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChartCard
            title="Revenue & Sponsorship Trajectory"
            description="Monthly sponsor deliverables and direct product sales"
            action={
              <Button variant="ghost" size="sm" className="text-xs">
                View Full Analytics <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            }
          >
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border bg-surface-muted/30">
              <p className="text-xs text-muted-foreground">
                Revenue telemetry chart (visual representation calibrated to active brand sponsorships)
              </p>
            </div>
          </ChartCard>
        </div>

        <div>
          <ListCard
            title="Recent Campaigns"
            items={recentDeals}
            action={
              <Link href="/admin/campaigns">
                <Button variant="ghost" size="sm" className="text-xs">
                  All Deals
                </Button>
              </Link>
            }
          />
        </div>
      </div>
    </div>
  );
}

