'use client';

import React from 'react';
import { Card, Button } from '@platform/ui';
import { PublicNavbar, PublicFooter } from '@/components/PublicNav';
import Link from 'next/link';

export default function AboutPage() {
  const milestones = [
    { year: '2020', title: 'Channel Inception', desc: 'Started posting weekly tutorials and hardware reviews from a bedroom workstation.' },
    { year: '2022', title: 'First 500,000 Subscribers', desc: 'Expanded into custom liquid cooling builds, developer setup tours, and audio testing.' },
    { year: '2024', title: 'Studio Headquarters', desc: 'Built out a dedicated 2,500 sq ft production lab and high-speed editing facility.' },
    { year: '2026', title: 'Global Tech Community', desc: 'Over 4.8 million dedicated creators, engineers, and enthusiasts across platforms.' },
  ];

  const stats = [
    { label: 'Total Audience', value: '4.8M+' },
    { label: 'Lifetime Views', value: '320M+' },
    { label: 'Brand Collaborations', value: '180+' },
    { label: 'Average Watch Time', value: '78%' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PublicNavbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Bio Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pb-12 border-b border-border/60">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                About The Creator
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-heading text-foreground tracking-tight">
                Crafting authentic, engineering-grade tech stories.
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Hi, I am a software engineer turned full-time tech educator and video creator. Over the past six years, my channel has grown into one of the most trusted destinations for honest hardware evaluations, ergonomic setups, and deep-dive technical tutorials.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                My mission is to help people build smarter workspaces and discover tools that accelerate their craft. Whether tearing down a GPU, analyzing AI developer workflows, or designing custom gear, I prioritize clarity, high production values, and technical accuracy.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link href="/services">
                  <Button size="sm" className="rounded-full text-xs">
                    Work With Me
                  </Button>
                </Link>
                <Link href="/videos">
                  <Button variant="outline" size="sm" className="rounded-full text-xs">
                    Watch Featured Episodes
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-4/5 w-full rounded-3xl overflow-hidden border border-border shadow-2xl bg-muted">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
                  alt="Creator Portrait"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-12 border-b border-border/60">
            {stats.map((st) => (
              <Card key={st.label} className="p-6 bg-accent/40 border-border text-center">
                <div className="text-3xl font-extrabold font-heading text-foreground">
                  {st.value}
                </div>
                <div className="mt-1 text-xs text-muted-foreground font-medium">
                  {st.label}
                </div>
              </Card>
            ))}
          </div>

          {/* Journey Timeline */}
          <div className="py-12">
            <h2 className="text-2xl font-bold font-heading text-foreground pb-6">
              The Journey So Far
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {milestones.map((m) => (
                <div key={m.year} className="p-5 rounded-2xl border border-border bg-surface">
                  <span className="text-lg font-extrabold font-heading text-primary">
                    {m.year}
                  </span>
                  <h3 className="font-heading font-semibold text-foreground text-sm mt-1">
                    {m.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}
