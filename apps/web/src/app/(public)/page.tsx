'use client';

import React, { useState } from 'react';
import { Button, Card, CardContent, FormModal, Input, ProductCard } from '@platform/ui';
import { PublicNavbar, PublicFooter } from '@/components/PublicNav';
import Link from 'next/link';
import { Play, ArrowUpRight, Youtube, Facebook, Instagram, Twitter, Calendar, ShoppingBag, Camera } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  views: string;
  duration: string;
  date: string;
  image: string;
  videoUrl: string;
}

interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  startingPrice: string;
}

export default function HomePage() {
  // Modal states
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [consultationDate, setConsultationDate] = useState('2026-11-20');
  const [consultationTime, setConsultationTime] = useState('14:00');

  // Inquiry form states
  const [inquirySent, setInquirySent] = useState(false);

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

  const featuredVideos: VideoItem[] = [
    {
      id: '1',
      title: 'iPhone 16 Pro — 5 New Features!',
      views: '1M Views',
      duration: '20 min',
      date: 'June 26, 2025',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      id: '2',
      title: 'iPad Pro Secrets You Must Know!',
      views: '1.1M Views',
      duration: '16 min',
      date: 'June 27, 2025',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
    {
      id: '3',
      title: 'Why iMac Is a Game-Changer!',
      views: '1.2M Views',
      duration: '10 min',
      date: 'June 28, 2025',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
  ];

  const services: ServiceItem[] = [
    {
      id: 'brand-collab',
      title: 'Brand Collaborations',
      desc: 'Creating impactful sponsored content and dedicated multi-platform campaigns for global tech companies.',
      startingPrice: '$8,500',
    },
    {
      id: 'video-prod',
      title: 'Tech Video Production',
      desc: 'From concept to final cut — professional-quality studio video production including scriptwriting and color grading.',
      startingPrice: '$12,000',
    },
    {
      id: 'product-reviews',
      title: 'Product Promotions',
      desc: 'Engaging, honest, and in-depth reviews of the latest gadgets, smartphones, laptops, and developer peripherals.',
      startingPrice: '$6,000',
    },
    {
      id: 'social-amplification',
      title: 'Social Media',
      desc: 'Cross-platform promotions across YouTube, Instagram, and X/Twitter tailored to amplify product awareness.',
      startingPrice: '$4,500',
    },
  ];

  const stats = [
    { label: 'Subscribers', value: '+1M' },
    { label: 'Revenue For Clients', value: '+$15M' },
    { label: 'Years Of Experience', value: '+10' },
    { label: 'Campaigns Done', value: '+250' },
  ];

  const storeItems = [
    {
      id: '1',
      name: 'Creator Studio Heavyweight Hoodie',
      price: 6500,
      image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80',
      category: 'Merch',
    },
    {
      id: '2',
      name: 'Minimalist Desk Mat (Dark Walnut)',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=400&q=80',
      category: 'Workspace',
    },
    {
      id: '3',
      name: 'Custom Mechanical Keycap Set',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80',
      category: 'Hardware',
    },
  ];

  const handleBookConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setIsBookingOpen(false);
      setBookingSuccess(false);
    }, 2000);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

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
                      Schedule a free 30-minute discovery & collaboration consultation.
                    </p>
                    <div className="mt-4">
                      <Button
                        size="sm"
                        className="rounded-full text-xs gap-1.5 shadow-sm"
                        onClick={() => setIsBookingOpen(true)}
                      >
                        <span>Schedule Call</span>
                        <Calendar className="h-3.5 w-3.5" />
                      </Button>
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
                <div className="mt-6 flex items-center gap-3">
                  <Button
                    size="sm"
                    className="rounded-full text-xs gap-1.5 shadow-sm"
                    onClick={() => {
                      const el = document.getElementById('contact');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span>Hire Now</span>
                    <span className="text-xs">→</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-full text-xs gap-1.5"
                    onClick={() => setIsBookingOpen(true)}
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Book Discovery Call</span>
                  </Button>
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

        {/* FEATURED VIDEOS WITH MODAL PLAYER */}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredVideos.map((video) => (
                <Card
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
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
                  <Button
                    size="sm"
                    className="rounded-full text-xs gap-1.5 shadow-sm"
                    onClick={() => {
                      const el = document.getElementById('contact');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span>Hire Me</span>
                    <span className="text-xs">→</span>
                  </Button>
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

        {/* SERVICES WITH DETAIL MODAL */}
        <section id="services" className="py-16 border-t border-border/50">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between pb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Offerings
                </span>
                <h2 className="text-2xl font-bold font-heading text-foreground">
                  My Services & Rate Card
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((srv) => (
                <Card
                  key={srv.id}
                  className="rounded-2xl border-border bg-accent/40 p-6 flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    <h3 className="font-heading font-semibold text-foreground text-base">
                      {srv.title}
                    </h3>
                    <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                      {srv.desc}
                    </p>
                    <div className="mt-3 inline-block rounded-md bg-surface/80 px-2.5 py-1 text-xs font-semibold text-primary">
                      Starts from {srv.startingPrice}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <button
                      type="button"
                      onClick={() => setSelectedService(srv)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline cursor-pointer"
                    >
                      <span>Read service details</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section id="gallery" className="py-16 border-t border-border/50 bg-surface/20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  <Camera className="h-3.5 w-3.5 text-primary" />
                  <span>Production & Studio Gallery</span>
                </div>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold font-heading text-foreground tracking-tight">
                  Visual Excellence Across Every Space
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Architectural installations, workspace ergonomics, and lab test setups.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link href="/services">
                  <Button size="sm" className="text-xs">
                    <span>Book Consultation</span>
                  </Button>
                </Link>
                <Link href="/gallery">
                  <Button variant="outline" size="sm" className="text-xs">
                    <span>Full Gallery</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* 8-Photo Clean Grid with High-Contrast Editorial Photography */}
            <div className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {[
                  {
                    id: 'g1',
                    title: 'Architectural Exterior',
                    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80',
                  },
                  {
                    id: 'g2',
                    title: 'Woodgrain Vanity Suite',
                    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
                  },
                  {
                    id: 'g3',
                    title: 'Bookshelf & Lounge Studio',
                    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=80',
                  },
                  {
                    id: 'g4',
                    title: 'Modern Blue Kitchenette',
                    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
                  },
                  {
                    id: 'g5',
                    title: 'Minimalist Chef Kitchen',
                    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=800&q=80',
                  },
                  {
                    id: 'g6',
                    title: 'Moody Custom Millwork',
                    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=800&q=80',
                  },
                  {
                    id: 'g7',
                    title: 'Sunroom Glass Dining',
                    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                  },
                  {
                    id: 'g8',
                    title: 'Bright Cooking Island',
                    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
                  },
                ].map((item) => (
                  <Link
                    key={item.id}
                    href="/gallery"
                    className="group relative aspect-4/3 overflow-hidden rounded-xl border border-border bg-muted shadow-xs transition-all hover:shadow-md block"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                      <span className="text-xs font-medium text-white truncate drop-shadow-sm">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MERCH STORE PREVIEW */}
        <section id="store" className="py-16 border-t border-border/50 bg-surface/30">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between pb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Creator Gear
                </span>
                <h2 className="text-2xl font-bold font-heading text-foreground">
                  Official Merchandise Store
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <ShoppingBag className="h-4 w-4" />
                  Limited Drops
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-6">
              {storeItems.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                  category={item.category}
                  onAddToCart={(id) => alert(`Product #${id} added to cart!`)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT & BOOKING FORM */}
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
              {inquirySent ? (
                <div className="p-8 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold font-heading text-foreground">
                    Inquiry Received!
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-md mx-auto">
                    Thank you for reaching out. We have received your collaboration request and will respond within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs mt-2"
                    onClick={() => setInquirySent(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleInquirySubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-foreground">Your Name</label>
                      <Input
                        type="text"
                        className="mt-1"
                        placeholder="Jane Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground">Work Email</label>
                      <Input
                        type="email"
                        className="mt-1"
                        placeholder="jane@company.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground">Campaign Details</label>
                    <textarea
                      rows={4}
                      className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      placeholder="Tell us about your brand, deliverables, and proposed timeline..."
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full text-xs">
                    Send Collaboration Inquiry
                  </Button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* VIDEO PLAYER MODAL */}
      <FormModal
        isOpen={Boolean(selectedVideo)}
        title={selectedVideo?.title ?? 'Featured Video'}
        description={`Published on ${selectedVideo?.date ?? ''} • ${selectedVideo?.views ?? ''}`}
        onClose={() => setSelectedVideo(null)}
      >
        <div className="space-y-4">
          <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black flex items-center justify-center">
            {selectedVideo && (
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedVideo(null)}
            >
              Close Video
            </Button>
          </div>
        </div>
      </FormModal>

      {/* SERVICE DETAIL MODAL */}
      <FormModal
        isOpen={Boolean(selectedService)}
        title={selectedService?.title ?? 'Service Details'}
        description={`Estimated pricing starts at ${selectedService?.startingPrice ?? ''}`}
        onClose={() => setSelectedService(null)}
      >
        <div className="space-y-4 text-xs text-foreground">
          <p className="leading-relaxed">
            {selectedService?.desc}
          </p>
          <div className="p-3 bg-surface-muted/50 rounded-lg border border-border space-y-1.5">
            <p className="font-semibold text-foreground">Included Deliverables:</p>
            <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
              <li>Comprehensive 4K studio recording and high-bitrate color grading</li>
              <li>Dedicated 60-90 second mid-roll or integrated review feature</li>
              <li>Multi-platform amplification across YouTube, Instagram, and X</li>
              <li>Audience analytics and engagement summary report after 14 days</li>
            </ul>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedService(null)}
            >
              Close
            </Button>
            <Button
              size="sm"
              onClick={() => {
                setSelectedService(null);
                const el = document.getElementById('contact');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Inquire About This Service
            </Button>
          </div>
        </div>
      </FormModal>

      {/* BOOKING CALENDAR MODAL */}
      <FormModal
        isOpen={isBookingOpen}
        title="Schedule a Discovery Consultation"
        description="Select a preferred date and time slot for a 30-minute video meeting."
        onClose={() => setIsBookingOpen(false)}
      >
        <form onSubmit={handleBookConsultation} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground">Date</label>
              <Input
                type="date"
                value={consultationDate}
                onChange={(e) => setConsultationDate(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Time Slot</label>
              <select
                value={consultationTime}
                onChange={(e) => setConsultationTime(e.target.value)}
                className="mt-1 flex h-10 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="10:00">10:00 AM (EST)</option>
                <option value="11:30">11:30 AM (EST)</option>
                <option value="14:00">2:00 PM (EST)</option>
                <option value="16:00">4:00 PM (EST)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Work Email</label>
            <Input
              type="email"
              placeholder="brand@company.com"
              className="mt-1"
              required
            />
          </div>

          {bookingSuccess && (
            <div className="p-3 bg-success/10 border border-success/30 rounded-lg text-xs text-success font-medium">
              ✓ Meeting scheduled! We have sent a calendar invite with the video link.
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => setIsBookingOpen(false)}
            >
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Confirm Meeting
            </Button>
          </div>
        </form>
      </FormModal>

      <PublicFooter />
    </div>
  );
}
