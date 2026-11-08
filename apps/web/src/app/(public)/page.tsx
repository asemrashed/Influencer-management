'use client';

import Link from 'next/link';
import { Button, Card, CardContent } from '@platform/ui';
import { PublicNavbar, PublicFooter } from '@/components/PublicNav';
import { Play, ArrowUpRight, Youtube, Facebook, Instagram, Twitter } from 'lucide-react';

export default function HomePage() {
  const partners = [
    'Microchip',
    'Microsoft',
    'Enphase',
    'Seagate',
    'Oracle',
    'Fortive',
    'Autodesk',
    'ServiceNow',
    'Qualcomm',
  ];

  const featuredVideos = [
    {
      id: '1',
      title: 'iPhone 16 Pro — 5 New Features!',
      views: '1M Views',
      duration: '20 min',
      date: 'June 26, 2025',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '2',
      title: 'iPad Pro Secrets You Must Know!',
      views: '1.1M Views',
      duration: '16 min',
      date: 'June 27, 2025',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: '3',
      title: 'Why iMac Is a Game-Changer!',
      views: '1.2M Views',
      duration: '10 min',
      date: 'June 28, 2025',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const services = [
    {
      title: 'Brand Collaborations',
      desc: 'Creating impactful sponsored content and dedicated multi-platform campaigns for global tech companies.',
    },
    {
      title: 'Tech Video Production',
      desc: 'From concept to final cut — professional-quality studio video production including scriptwriting and color grading.',
    },
    {
      title: 'Product Promotions',
      desc: 'Engaging, honest, and in-depth reviews of the latest gadgets, smartphones, laptops, and developer peripherals.',
    },
    {
      title: 'Social Media',
      desc: 'Cross-platform promotions across YouTube, Instagram, and X/Twitter tailored to amplify product awareness.',
    },
  ];

  const stats = [
    { label: 'Subscribers', value: '+1M' },
    { label: 'Revenue For Clients', value: '+$15M' },
    { label: 'Years Of Experience', value: '+10' },
    { label: 'Campaigns Done', value: '+250' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <PublicNavbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section id="home" className="relative overflow-hidden pt-8 pb-16 lg:py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl border border-border/80 bg-surface/50 p-6 sm:p-10 lg:p-14 backdrop-blur-sm shadow-sm">
              {/* Creator Watermark */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10 select-none overflow-hidden">
                <span className="font-heading text-8xl sm:text-9xl font-black tracking-tighter text-primary">
                  Mr. John
                </span>
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Floating Card & Pitch */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <div className="rounded-2xl border border-border bg-accent/60 p-6 backdrop-blur-md">
                    <h2 className="text-xl font-bold font-heading text-foreground">
                      Let&apos;s Unlock Your Growth Potential.
                    </h2>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Get a free 30-minute discovery & collaboration consultation.
                    </p>
                    <div className="mt-4">
                      <Link href="#contact">
                        <Button size="sm" className="rounded-full text-xs gap-1.5 shadow-sm">
                          <span>Get A Call</span>
                          <span className="text-xs">→</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      — A YouTuber and social tech influencer.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="flex items-center gap-1 text-xs rounded-full border border-border bg-surface px-2.5 py-1 text-foreground">
                        <Youtube className="h-3.5 w-3.5 text-danger" /> 1.2M+
                      </span>
                      <span className="flex items-center gap-1 text-xs rounded-full border border-border bg-surface px-2.5 py-1 text-foreground">
                        <Facebook className="h-3.5 w-3.5 text-primary" /> 1.1M+
                      </span>
                      <span className="flex items-center gap-1 text-xs rounded-full border border-border bg-surface px-2.5 py-1 text-foreground">
                        <Instagram className="h-3.5 w-3.5 text-accent-foreground" /> 1.4M+
                      </span>
                      <span className="flex items-center gap-1 text-xs rounded-full border border-border bg-surface px-2.5 py-1 text-foreground">
                        <Twitter className="h-3.5 w-3.5 text-foreground" /> 1.3M+
                      </span>
                    </div>
                  </div>
                </div>

                {/* Center Creator Portrait */}
                <div className="lg:col-span-4 flex justify-center">
                  <div className="relative h-72 w-72 sm:h-80 sm:w-80 rounded-full border-4 border-surface shadow-2xl overflow-hidden bg-accent/40">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80"
                      alt="Creator Portrait"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </div>

                {/* Right Stat Highlight Card */}
                <div className="lg:col-span-4 flex flex-col lg:items-end">
                  <div className="rounded-2xl border border-border bg-accent/60 p-6 backdrop-blur-md max-w-sm">
                    <p className="text-xs text-foreground font-medium leading-relaxed">
                      I&apos;ll help brands boost sales, qualified leads & active awareness with authentic, high-retention video content.
                    </p>
                    <div className="mt-4 border-t border-border/60 pt-3">
                      <div className="text-xl font-bold font-heading text-primary">
                        +220%
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Clients average engagement & reach growth
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="py-16 border-t border-border/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  About Me
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold font-heading tracking-tight text-foreground">
                  I work with leading <span className="text-primary font-black">global brands</span> to showcase their latest innovations through authentic reviews and engaging content.
                </h2>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                  With over a decade of production excellence and a dedicated community of creators, engineers, and early adopters, every campaign is calibrated to deliver genuine engagement.
                </p>
                <div className="mt-6">
                  <Link href="#contact">
                    <Button size="sm" className="rounded-full text-xs gap-1.5 shadow-sm">
                      <span>Hire Now</span>
                      <span className="text-xs">→</span>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:col-span-5 flex justify-center">
                <Card className="overflow-hidden border-border bg-surface max-w-sm shadow-md">
                  <div className="relative aspect-video w-full bg-muted">
                    <img
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80"
                      alt="Creator Studio"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">
                      A passionate tech creator trusted by millions of viewers worldwide for candid, high-standard gear reviews.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED VIDEOS */}
        <section id="videos" className="py-16 border-t border-border/50 bg-surface/30">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between pb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Portfolio Highlights
                </span>
                <h2 className="text-2xl font-bold font-heading text-foreground">
                  Featured Videos
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                  ‹
                </Button>
                <Button size="icon" className="h-8 w-8 rounded-full">
                  ›
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-video w-full bg-muted overflow-hidden">
                    <img
                      src={video.image}
                      alt={video.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-surface/90 px-2.5 py-0.5 text-xs font-semibold text-foreground backdrop-blur-sm">
                      {video.views}
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface/80 text-primary shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
                        <Play className="h-5 w-5 fill-current ml-0.5" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-foreground text-sm font-heading group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>⏱ {video.duration}</span>
                      <span>📅 {video.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link href="#contact">
                <Button variant="secondary" size="sm" className="rounded-full text-xs">
                  View All Videos
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* TRUSTED PARTNERS */}
        <section id="partners" className="py-14 border-t border-border/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Collaborations
            </span>
            <h3 className="text-xl font-bold font-heading text-foreground mt-1">
              Trusted Partners
            </h3>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              {partners.map((p) => (
                <div
                  key={p}
                  className="rounded-full border border-border bg-accent/40 px-5 py-2 text-xs font-semibold text-foreground shadow-xs"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY ME & STATS */}
        <section className="py-16 border-t border-border/50 bg-surface/40">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Proven Track Record
                </span>
                <h2 className="mt-1 text-2xl sm:text-3xl font-bold font-heading text-foreground">
                  Why Work With Me
                </h2>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  With years of experience and a loyal, high-intent audience, I turn complex consumer and enterprise technology into stories that inspire and convert.
                </p>
                <div className="mt-6">
                  <Link href="#contact">
                    <Button size="sm" className="rounded-full text-xs gap-1.5 shadow-sm">
                      <span>Hire Me</span>
                      <span className="text-xs">→</span>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-7 grid grid-cols-2 gap-4">
                {stats.map((st) => (
                  <Card key={st.label} className="p-6 bg-accent/50 border-border">
                    <div className="text-3xl font-extrabold font-heading text-foreground">
                      {st.value}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground font-medium">
                      {st.label}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-16 border-t border-border/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between pb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Offerings
                </span>
                <h2 className="text-2xl font-bold font-heading text-foreground">
                  My Services
                </h2>
              </div>
              <Link href="#contact">
                <Button size="sm" variant="outline" className="rounded-full text-xs">
                  Hire Me
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((srv) => (
                <Card
                  key={srv.title}
                  className="rounded-2xl border-border bg-accent/40 p-6 flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-base">
                      {srv.title}
                    </h3>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <Link
                      href="#contact"
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <span>Read more</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT & BOOKING */}
        <section id="contact" className="py-16 border-t border-border/50 bg-surface/50">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Ready to Collaborate?
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold font-heading text-foreground">
              Start a Conversation
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Submit your project brief or campaign goals. Our management team reviews all brand inquiries within 24 hours.
            </p>
            <div className="mt-8 rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm text-left">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-foreground">Your Name</label>
                    <input
                      type="text"
                      className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground">Work Email</label>
                    <input
                      type="email"
                      className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground">Campaign Details</label>
                  <textarea
                    rows={4}
                    className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Tell us about your brand, deliverables, and proposed timeline..."
                  />
                </div>
                <Button type="submit" className="w-full text-xs">
                  Send Collaboration Inquiry
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
