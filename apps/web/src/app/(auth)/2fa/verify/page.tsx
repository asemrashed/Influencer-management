'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@platform/ui';
import { api, type ApiError } from '@/lib/api/index';
import { useQueryClient } from '@tanstack/react-query';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function TwoFactorVerifyPage() {
  const router = useRouter();
  const qc = useQueryClient();
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length < 6) {
      setErrorMsg('Please enter a valid 6-digit authentication code.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await api.POST('/api/v1/auth/2fa/verify', {
        body: { code },
      });

      if (res.error) {
        const err = res.error as { message?: string };
        setErrorMsg(err.message ?? 'Invalid verification code.');
        setIsLoading(false);
        return;
      }

      await qc.invalidateQueries({ queryKey: ['me'] });
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      const e = err as ApiError;
      setErrorMsg(e.message ?? 'An error occurred during 2FA verification.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <span className="font-heading text-2xl font-black text-foreground">
              YouTuber
            </span>
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">
            Two-Factor Authentication Security Gate
          </p>
        </div>

        <Card className="border-border bg-surface shadow-md">
          <CardHeader className="space-y-1 pb-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-2">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <CardTitle className="text-xl font-bold font-heading">
              Two-Factor Authentication
            </CardTitle>
            <CardDescription className="text-xs">
              Enter the 6-digit authenticator code to complete login
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {errorMsg && (
              <div className="rounded-lg border border-danger/30 bg-danger/10 p-3 text-xs text-danger font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-foreground">Authentication Code</label>
                <Input
                  type="text"
                  maxLength={8}
                  value={code}
                  onChange={(e) => setCode(e.target.value.trim())}
                  placeholder="123456"
                  className="mt-1 text-center font-mono text-lg tracking-widest"
                  autoFocus
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full text-xs"
                disabled={isLoading}
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </Button>
            </form>

            <div className="text-center pt-2">
              <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground">
                ← Back to Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

