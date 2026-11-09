'use client';

import React, { useState } from 'react';
import { Card, CardContent, FormModal } from '@platform/ui';
import { PublicNavbar, PublicFooter } from '@/components/PublicNav';
import { Play, Eye, Calendar } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  views: string;
  duration: string;
  date: string;
  category: string;
  image: string;
  videoUrl: string;
  description: string;
}

const VIDEOS: VideoItem[] = [
  {
    id: '1',
    title: 'Custom Liquid-Cooled AI Rig Build 2026',
    views: '1.4M views',
    duration: '22:15',
    date: '3 weeks ago',
    category: 'Hardware',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    description: 'Deep dive building an ultra-quiet multi-GPU deep learning workstation with custom copper loop tubing.',
  },
  {
    id: '2',
    title: 'The Full Desk Setup Transformation',
    views: '890K views',
    duration: '18:40',
    date: '1 month ago',
    category: 'Setup',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    description: 'Complete room and ergonomic workspace overhaul with custom acoustic panels and smart atmospheric lighting.',
  },
  {
    id: '3',
    title: 'Top 10 Developer Productivity Tools & Apps',
    views: '620K views',
    duration: '14:20',
    date: '2 months ago',
    category: 'Software',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    description: 'Reviewing modern command-line tools, terminal emulators, AI coding extensions, and automated build helpers.',
  },
  {
    id: '4',
    title: 'Mechanical Keyboards: Custom Switch Shootout',
    views: '450K views',
    duration: '16:05',
    date: '2 months ago',
    category: 'Hardware',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    description: 'Comparing tactile vs linear switches with studio microphone sound tests and force curve measurements.',
  },
  {
    id: '5',
    title: 'Ultimate 4K Camera Setup for Tech Creators',
    views: '780K views',
    duration: '20:12',
    date: '3 months ago',
    category: 'Production',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    description: 'Cinema lenses, overhead rigging systems, and wireless audio setups tested in real-world YouTube production.',
  },
  {
    id: '6',
    title: 'Smart Home Automation: 1 Year Later',
    views: '540K views',
    duration: '17:30',
    date: '4 months ago',
    category: 'Setup',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    description: 'Local-first home automation protocols, sensor reliability benchmarks, and power efficiency analysis.',
  },
];

export default function FeaturedVideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Hardware', 'Setup', 'Software', 'Production'];

  const filtered = activeCategory === 'All'
    ? VIDEOS
    : VIDEOS.filter((v) => v.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PublicNavbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-border/60">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                Watch & Learn
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground mt-1">
                Featured Videos & Episodes
              </h1>
              <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                Explore in-depth hardware tear-downs, studio workflow walkthroughs, and hands-on reviews viewed by millions worldwide.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1 overflow-x-auto rounded-md border border-border bg-surface-muted/60 p-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filtered.map((video) => (
              <Card
                key={video.id}
                className="group overflow-hidden rounded-2xl border-border bg-surface hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div
                  className="relative aspect-video w-full overflow-hidden bg-muted cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  <img
                    src={video.image}
                    alt={video.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="h-5 w-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-0.5 text-xs font-semibold text-white">
                    {video.duration}
                  </span>
                  <span className="absolute top-3 left-3 rounded-full bg-surface/90 px-2.5 py-0.5 text-xs font-medium text-foreground backdrop-blur-sm border border-border/50">
                    {video.category}
                  </span>
                </div>

                <CardContent className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3
                      onClick={() => setSelectedVideo(video)}
                      className="font-heading font-semibold text-foreground text-base hover:text-primary transition-colors cursor-pointer line-clamp-2"
                    >
                      {video.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {video.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {video.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {video.date}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Video Player Modal */}
      <FormModal
        isOpen={Boolean(selectedVideo)}
        title={selectedVideo?.title ?? 'Featured Video'}
        description={selectedVideo ? `${selectedVideo.views} • ${selectedVideo.date}` : undefined}
        onClose={() => setSelectedVideo(null)}
      >
        {selectedVideo && (
          <div className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black border border-border">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {selectedVideo.description}
            </p>
          </div>
        )}
      </FormModal>

      <PublicFooter />
    </div>
  );
}
