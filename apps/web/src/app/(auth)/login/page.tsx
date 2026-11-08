'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@platform/ui';
import { api, ApiError } from '@/lib/api/index';
import { useQueryClient } from '@tanstack/react-query';
import { ShieldCheck, UserCheck, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const qc = useQueryClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (loginEmail?: string, loginPassword?: string) => {
    const finalEmail = loginEmail ?? email;
    const finalPass = loginPassword ?? password;
    if (!finalEmail || !finalPass) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await api.POST('/api/v1/auth/login', {
        body: {
          email: finalEmail,
          password: finalPass,
        },
      });

      if (res.error) {
        const err = res.error as { message?: string };
        setErrorMsg(err.message ?? 'Invalid email or password.');
        setIsLoading(false);
        return;
      }

      await qc.invalidateQueries({ queryKey: ['me'] });

      // Check if 2FA is needed
      const meRes = await api.GET('/api/v1/me');
      const meData = meRes.data as unknown as { twoFactorRequired?: boolean } | undefined;

      if (meData?.twoFactorRequired) {
        router.push('/2fa/verify');
      } else {
        router.push('/admin/dashboard');
      }
    } catch (err: unknown) {
      const e = err as ApiError;
      setErrorMsg(e.message ?? 'An error occurred during sign in.');
    } finally {
      setIsLoading(false);
    }
  };

  const instantLogin = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('Asdfghjk');
    handleLogin(roleEmail, 'Asdfghjk');
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
            Influencer Management Platform & Creator Studio
          </p>
        </div>

        <Card className="border-border bg-surface shadow-md">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl font-bold font-heading text-center">
              Sign In
            </CardTitle>
            <CardDescription className="text-center text-xs">
              Enter your credentials to access the management portal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {errorMsg && (
              <div className="rounded-lg border border-danger/30 bg-danger/10 p-3 text-xs text-danger font-medium">
                {errorMsg}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-medium text-foreground">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-foreground">Password</label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="mt-1"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full text-xs"
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            {/* Instant Role Login Buttons */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs font-semibold text-muted-foreground text-center mb-3">
                Quick Role Logins (Development / Demo)
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center justify-center h-auto py-2 px-1 text-center"
                  onClick={() => instantLogin('superadmin@gmail.com')}
                  disabled={isLoading}
                >
                  <ShieldCheck className="h-4 w-4 mb-1 text-primary" />
                  <span className="text-xs font-medium">Super Admin</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center justify-center h-auto py-2 px-1 text-center"
                  onClick={() => instantLogin('admin@gmail.com')}
                  disabled={isLoading}
                >
                  <UserCheck className="h-4 w-4 mb-1 text-foreground" />
                  <span className="text-xs font-medium">Admin</span>
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex flex-col items-center justify-center h-auto py-2 px-1 text-center"
                  onClick={() => instantLogin('manager@gmail.com')}
                  disabled={isLoading}
                >
                  <Briefcase className="h-4 w-4 mb-1 text-foreground" />
                  <span className="text-xs font-medium">Manager</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

