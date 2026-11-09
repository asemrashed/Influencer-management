'use client';

import React, { useState } from 'react';
import { Card, FormModal, Button, Input } from '@platform/ui';
import { PublicNavbar, PublicFooter } from '@/components/PublicNav';
import { ArrowUpRight, CheckCircle2, Calendar } from 'lucide-react';
import Link from 'next/link';

interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  startingPrice: string;
  deliverables: string[];
  timeline: string;
  idealFor: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Dedicated YouTube Video',
    desc: 'Full 10-15 minute production showcasing your software, developer tool, or consumer electronics with deep hands-on testing.',
    startingPrice: '$8,500',
    deliverables: [
      '1x 10-15 minute dedicated 4K video',
      'Pinned comment with trackable referral link for 30 days',
      'Permanent YouTube video description placement',
      'Full usage rights for digital paid advertising (90 days)',
    ],
    timeline: '2-3 weeks production',
    idealFor: 'Product launches, enterprise SaaS, developer tooling',
  },
  {
    id: '2',
    title: 'Integrated Video Sponsorship',
    desc: '60-90 second mid-roll integration seamlessly woven into a high-engagement long-form episode.',
    startingPrice: '$4,200',
    deliverables: [
      '60-90 second integrated brand segment',
      'On-screen brand logo watermark and CTA overlay',
      'First link in video description',
      'Included in video chapters',
    ],
    timeline: '1-2 weeks production',
    idealFor: 'Ongoing brand awareness, mobile apps, hardware accessories',
  },
  {
    id: '3',
    title: 'Multi-Platform Social Push',
    desc: 'High-energy vertical videos across YouTube Shorts, Instagram Reels, and TikTok optimized for virality and click-through.',
    startingPrice: '$3,800',
    deliverables: [
      '1x YouTube Short + 1x Instagram Reel + 1x TikTok',
      'Custom scripted story-driven tech demo',
      'Link-in-bio inclusion for 14 days',
      'Cross-posted story with direct swipe/sticker link',
    ],
    timeline: '5-7 business days',
    idealFor: 'Consumer electronics, games, viral product releases',
  },
  {
    id: '4',
    title: 'Keynote & Technical Consultation',
    desc: 'Live keynotes, virtual fireside chats, developer workshop hosting, or product feedback advisory.',
    startingPrice: '$5,000',
    deliverables: [
      '45-60 minute keynote or panel participation',
      'Pre-event promotional social posts (2x)',
      '1-on-1 private product advisory roadmap session',
      'Recording redistribution rights',
    ],
    timeline: 'Scheduled by event calendar',
    idealFor: 'Conferences, developer summits, executive hackathons',
  },
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState('2026-11-25');
  const [bookingTime, setBookingTime] = useState('14:00');
  const [booked, setBooked] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PublicNavbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-border/60">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Brand Collaborations
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground mt-1">
                Services & Rate Card
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                High-impact sponsorship packages, bespoke creative productions, and technical advisory for tech-forward brands.
              </p>
            </div>

            <Button
              size="sm"
              className="rounded-full text-xs shadow-sm self-start md:self-auto"
              onClick={() => {
                setBooked(false);
                setIsBookingOpen(true);
              }}
            >
              <Calendar className="h-4 w-4 mr-1.5" />
              <span>Book Discovery Call</span>
            </Button>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {SERVICES.map((srv) => (
              <Card
                key={srv.id}
                className="rounded-2xl border-border bg-surface p-6 sm:p-8 flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-accent text-accent-foreground">
                      Package #{srv.id}
                    </span>
                    <span className="text-base font-bold text-primary font-heading">
                      Starts from {srv.startingPrice}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-heading text-foreground mt-4">
                    {srv.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {srv.desc}
                  </p>

                  <div className="mt-6 space-y-2">
                    <p className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Included Deliverables:
                    </p>
                    <ul className="space-y-1.5">
                      {srv.deliverables.map((d, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Timeline: <strong className="text-foreground">{srv.timeline}</strong>
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs gap-1"
                    onClick={() => setSelectedService(srv)}
                  >
                    <span>View Inclusions</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Service Details Modal */}
      <FormModal
        isOpen={Boolean(selectedService)}
        title={selectedService?.title ?? 'Service Details'}
        description={`Starting from ${selectedService?.startingPrice} • ${selectedService?.timeline}`}
        onClose={() => setSelectedService(null)}
      >
        {selectedService && (
          <div className="space-y-4">
            <div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {selectedService.desc}
              </p>
            </div>

            <div className="rounded-xl border border-border bg-accent/30 p-4 space-y-2">
              <p className="text-xs font-semibold text-foreground">Standard Deliverables</p>
              <ul className="space-y-1.5">
                {selectedService.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-foreground">
                    <span className="text-success font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-xs text-muted-foreground">
              <strong>Ideal for:</strong> {selectedService.idealFor}
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-border">
              <Button variant="outline" size="sm" onClick={() => setSelectedService(null)}>
                Close
              </Button>
              <Link href="/#contact" onClick={() => setSelectedService(null)}>
                <Button size="sm">Request Proposal</Button>
              </Link>
            </div>
          </div>
        )}
      </FormModal>

      {/* Discovery Call Booking Modal */}
      <FormModal
        isOpen={isBookingOpen}
        title="Book 30-Min Discovery Consultation"
        description="Schedule a 1-on-1 strategy call with our talent and partnerships manager."
        onClose={() => setIsBookingOpen(false)}
      >
        {booked ? (
          <div className="py-6 text-center space-y-3">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success text-xl">
              ✓
            </div>
            <h4 className="text-base font-bold font-heading text-foreground">
              Consultation Reserved!
            </h4>
            <p className="text-xs text-muted-foreground">
              Invitation sent for {bookingDate} at {bookingTime} UTC. Check your email for calendar invite.
            </p>
            <Button size="sm" onClick={() => setIsBookingOpen(false)}>
              Done
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setBooked(true);
            }}
            className="space-y-4"
          >
            <div>
              <label className="text-xs font-medium text-foreground">Select Date</label>
              <Input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-foreground">Select Time (UTC)</label>
              <select
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                aria-label="Select Time"
                className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="10:00">10:00 AM UTC</option>
                <option value="12:00">12:00 PM UTC</option>
                <option value="14:00">02:00 PM UTC</option>
                <option value="16:00">04:00 PM UTC</option>
                <option value="18:00">06:00 PM UTC</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-foreground">Brand / Company Name</label>
              <Input placeholder="e.g. Acme Tech Corp" className="mt-1" required />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsBookingOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" type="submit">
                Confirm Slot
              </Button>
            </div>
          </form>
        )}
      </FormModal>

      <PublicFooter />
    </div>
  );
}
