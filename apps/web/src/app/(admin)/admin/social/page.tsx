'use client';

import React, { useState } from 'react';
import { PageHeader, Card, CardHeader, CardTitle, CardContent, Button, ConnectionStatus, Input, SourceTag } from '@platform/ui';
import { useSession } from '@/providers/SessionProvider';
import { Youtube, Instagram, Twitter, TrendingUp, RefreshCw, BarChart3 } from 'lucide-react';

interface PlatformMetric {
  platform: string;
  followers: number;
  handle: string;
  connected: boolean;
  growthDelta: string;
  source: 'synced' | 'manual';
}

export default function SocialGrowthAdminPage() {
  const { can } = useSession();
  const [isSyncing, setIsSyncing] = useState(false);
  const [manualCount, setManualCount] = useState('');
  const [manualPlatform, setManualPlatform] = useState('youtube');

  const [metrics, setMetrics] = useState<PlatformMetric[]>([
    {
      platform: 'YouTube',
      followers: 1240000,
      handle: '@MrJohnTech',
      connected: true,
      growthDelta: '+18.4K this month',
      source: 'synced',
    },
    {
      platform: 'Instagram',
      followers: 1420000,
      handle: '@john_creator',
      connected: true,
      growthDelta: '+22.1K this month',
      source: 'synced',
    },
    {
      platform: 'X / Twitter',
      followers: 1310000,
      handle: '@mr_john',
      connected: false,
      growthDelta: '+5.2K this month',
      source: 'manual',
    },
  ]);

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1200);
  };

  const handleSaveManual = (e: React.FormEvent) => {
    e.preventDefault();
    const count = parseInt(manualCount, 10);
    if (!count) return;

    setMetrics(
      metrics.map((m) =>
        m.platform.toLowerCase().includes(manualPlatform)
          ? { ...m, followers: count, source: 'manual' }
          : m
      )
    );
    setManualCount('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Social Hub & Follower Telemetry"
        description="Monitor cross-platform audience metrics, configure OAuth connections, and view growth analytics."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSyncAll}
              disabled={isSyncing}
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Follower Counts'}</span>
            </Button>
          </div>
        }
      />

      {/* Social Platforms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((item) => (
          <Card key={item.platform} className="p-6 bg-surface border-border flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.platform === 'YouTube' && <Youtube className="h-5 w-5 text-danger" />}
                  {item.platform === 'Instagram' && <Instagram className="h-5 w-5 text-accent-foreground" />}
                  {item.platform.includes('Twitter') && <Twitter className="h-5 w-5 text-foreground" />}
                  <span className="font-bold text-sm text-foreground">{item.platform}</span>
                </div>
                <SourceTag source={item.source} />
              </div>

              <div className="mt-4">
                <div className="text-3xl font-extrabold text-foreground font-heading">
                  {(item.followers / 1000000).toFixed(2)}M
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{item.handle}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-success font-medium">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>{item.growthDelta}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <ConnectionStatus connected={item.connected} />
              {can('social.write') && (
                <Button variant="ghost" size="sm" className="text-xs">
                  {item.connected ? 'Settings' : 'Connect'}
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Manual Follower Entry Section */}
      {can('social.write') && (
        <Card className="p-6 bg-surface border-border">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              <span>Manual Follower Telemetry Entry</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSaveManual} className="flex flex-col sm:flex-row items-end gap-3 max-w-xl">
              <div className="flex-1 w-full">
                <label className="text-xs font-medium text-foreground">Select Platform</label>
                <select
                  value={manualPlatform}
                  onChange={(e) => setManualPlatform(e.target.value)}
                  className="mt-1 flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="youtube">YouTube</option>
                  <option value="instagram">Instagram</option>
                  <option value="twitter">X / Twitter</option>
                </select>
              </div>

              <div className="flex-1 w-full">
                <label className="text-xs font-medium text-foreground">Current Follower Count</label>
                <Input
                  type="number"
                  value={manualCount}
                  onChange={(e) => setManualCount(e.target.value)}
                  placeholder="e.g. 1250000"
                  className="mt-1"
                  required
                />
              </div>

              <Button size="sm" type="submit" className="shrink-0">
                Update Count
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
