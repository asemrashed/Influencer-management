'use client';

import React, { useState } from 'react';
import { PageHeader, Card, CardHeader, CardTitle, CardContent, Button, Input } from '@platform/ui';
import { useSession } from '@/providers/SessionProvider';
import { Bell, Lock, User, Save, Check } from 'lucide-react';

export default function SettingsAdminPage() {
  const { user } = useSession();
  const [name, setName] = useState(user?.name ?? 'Super Admin');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dealAlerts, setDealAlerts] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings & Platform Configuration"
        description="Configure account profile, security credentials, notification channels, and platform preferences."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card className="p-6 bg-surface border-border">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span>Profile Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground">Display Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-foreground">Email Address</label>
                <Input
                  value={user?.email ?? 'superadmin@gmail.com'}
                  disabled
                  className="mt-1 opacity-70"
                />
                <span className="text-xs text-muted-foreground mt-1 block">
                  Email change requires Super Admin authorization.
                </span>
              </div>

              {saveSuccess && (
                <div className="p-2.5 rounded-lg bg-success/10 border border-success/30 text-success text-xs font-medium flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <Button size="sm" type="submit" className="gap-1.5">
                <Save className="h-3.5 w-3.5" />
                <span>Save Changes</span>
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Notifications & System Toggles */}
        <Card className="p-6 bg-surface border-border">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" />
              <span>Notification Preferences</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-surface-muted/30">
              <div>
                <p className="text-xs font-semibold text-foreground">New Sponsor Deals & Inquiries</p>
                <p className="text-xs text-muted-foreground">Receive instant alerts when brands submit proposals</p>
              </div>
              <Button
                type="button"
                variant={dealAlerts ? 'default' : 'outline'}
                size="sm"
                onClick={() => setDealAlerts(!dealAlerts)}
                className="text-xs"
              >
                {dealAlerts ? 'Enabled' : 'Disabled'}
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-surface-muted/30">
              <div>
                <p className="text-xs font-semibold text-foreground">Email Notifications Digest</p>
                <p className="text-xs text-muted-foreground">Weekly analytics summary and scheduled video reports</p>
              </div>
              <Button
                type="button"
                variant={emailNotifications ? 'default' : 'outline'}
                size="sm"
                onClick={() => setEmailNotifications(!emailNotifications)}
                className="text-xs"
              >
                {emailNotifications ? 'Enabled' : 'Disabled'}
              </Button>
            </div>

            <div className="pt-2">
              <Button variant="outline" size="sm" className="text-xs gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                <span>Configure 2FA Security</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
