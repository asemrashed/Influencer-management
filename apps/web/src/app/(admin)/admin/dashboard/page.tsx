'use client';

import React from 'react';
import { PageHeader, StatCard, ChartCard, ListCard, Button, StatusBadge, LoadingSkeleton, ErrorState } from '@platform/ui';
import { useSession } from '@/providers/SessionProvider';
import { useQuery } from '@tanstack/react-query';
import { dashboardSummaryQuery } from '@/features/dashboard/queries';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { user } = useSession();
  const { data, isLoading, isError, refetch } = useQuery(dashboardSummaryQuery());

  const summary = data as unknown as {
    totalFollowers?: number;
    totalEarnings?: number;
    activeCampaigns?: number;
    totalViews?: number;
  } | undefined;

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

  if (isError) {
    return (
      <ErrorState
        title="Unable to load dashboard metrics"
        message="Could not connect to the backend analytics telemetry service."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Creator Studio • Operations & Pipeline"
        description={`Performance summary and active brand deal flow for ${user?.name ?? 'Creator'}.`}
        actions={
          <div className="flex items-center gap-2">
            <Link href="/admin/campaigns">
              <Button size="sm" className="text-xs">
                <span>New Campaign</span>
              </Button>
            </Link>
          </div>
        }
      />

      {/* KPI Cards Grid: 2 cards in a row in mobile, 4 in desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {isLoading ? (
          <>
            <LoadingSkeleton className="h-28 rounded-xl" />
            <LoadingSkeleton className="h-28 rounded-xl" />
            <LoadingSkeleton className="h-28 rounded-xl" />
            <LoadingSkeleton className="h-28 rounded-xl" />
          </>
        ) : (
          <>
            <StatCard
              title="Total Earnings (MTD)"
              value={summary?.totalEarnings ? `$${(summary.totalEarnings / 100).toLocaleString()}` : '$34,500'}
              delta={{ value: '18% vs last month', positive: true }}
            />
            <StatCard
              title="Active Brand Deals"
              value={summary?.activeCampaigns ?? 7}
              delta={{ value: '2 pending review', positive: true }}
            />
            <StatCard
              title="Total Audience"
              value={summary?.totalFollowers ? `${(summary.totalFollowers / 1000000).toFixed(1)}M` : '4.8M'}
              delta={{ value: '+45K this week', positive: true }}
            />
            <StatCard
              title="Monthly Video Views"
              value={summary?.totalViews ? `${(summary.totalViews / 1000000).toFixed(1)}M` : '12.4M'}
              delta={{ value: '+8.2% vs last month', positive: true }}
            />
          </>
        )}
      </div>

      {/* Main Grid: Pipeline and Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChartCard
            title="Revenue & Sponsorship Trajectory"
            description="Monthly sponsor deliverables and direct product sales"
            action={
              <Link href="/admin/finance">
                <Button variant="ghost" size="sm" className="text-xs">
                  View Full Analytics <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </Link>
            }
          >
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border bg-surface-muted/30">
              <p className="text-xs text-muted-foreground">
                Revenue telemetry chart (calibrated to verified brand contracts and milestone invoices)
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
