'use client';

import React, { useState } from 'react';
import { FormModal, Button } from '@platform/ui';
import { PublicNavbar, PublicFooter } from '@/components/PublicNav';
import { ZoomIn, Camera } from 'lucide-react';
import Link from 'next/link';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
}

const GALLERY: GalleryItem[] = [
  {
    id: '1',
    title: 'Architectural Heritage Estate',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1000&q=80',
    caption: 'Classic brick facade framed by manicured hedges and natural sunlight.',
  },
  {
    id: '2',
    title: 'Custom Walnut Vanity Suite',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    caption: 'Architectural custom wood vanity with backlit mirrors and marble countertops.',
  },
  {
    id: '3',
    title: 'Studio Library & Mid-Century Lounge',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1000&q=80',
    caption: 'Integrated wood bookshelves and designer acoustic wall treatments for broadcast.',
  },
  {
    id: '4',
    title: 'Electric Blue Minimalist Cabinetry',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
    caption: 'High-contrast custom matte lacquer casework with brass hardware accents.',
  },
  {
    id: '5',
    title: 'Clean Marble Kitchen Island',
    category: 'Interior',
    image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=1000&q=80',
    caption: 'Calacatta marble waterfall countertop illuminated by dual pendant cones.',
  },
  {
    id: '6',
    title: 'Moody Gunmetal Wet Bar & Cabinetry',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80',
    caption: 'Custom painted deep slate cabinetry with unlacquered brass ring pulls.',
  },
  {
    id: '7',
    title: 'Timber Vaulted Dining Sunroom',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    caption: 'Tongue-and-groove cedar ceiling with panoramic floor-to-ceiling forest views.',
  },
  {
    id: '8',
    title: 'Chef Kitchen & Matte Black Fixtures',
    category: 'Editorial',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80',
    caption: 'Commercial-grade induction cooktop with wood beam lighting installation.',
  },
  {
    id: '9',
    title: 'Minimalist Walnut Desk Rig',
    category: 'Workspace',
    image: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1000&q=80',
    caption: 'Solid American walnut tabletop paired with articulated monitor mounts.',
  },
  {
    id: '10',
    title: 'Open-Air Test Bench Station',
    category: 'Lab',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
    caption: 'Thermal testing station equipped with calibrated thermocouple probes.',
  },
  {
    id: '11',
    title: 'Overhead 4K Cinema Track Rail',
    category: 'Studio',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
    caption: 'Ceiling mounted motorized track rail for silky smooth top-down shots.',
  },
  {
    id: '12',
    title: 'Artisan Mechanical Switches',
    category: 'Gear',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
    caption: 'Hand-lubed custom switches tested in studio acoustic chamber.',
  },
];

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Architecture', 'Interior', 'Commercial', 'Editorial', 'Studio'];

  const filtered = activeFilter === 'All'
    ? GALLERY
    : GALLERY.filter((g) => g.category === activeFilter);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <PublicNavbar />

      <main className="flex-1 py-10 sm:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Top Headline Layout matching Editorial Reference */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/60">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 text-xs font-medium text-muted-foreground">
                <Camera className="h-3.5 w-3.5 text-primary" />
                <span>Production & Studio Gallery</span>
              </div>
              <h1 className="mt-3 text-3xl sm:text-4xl font-bold font-heading text-foreground tracking-tight">
                Visual Excellence Across Every Space
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                Behind the scenes of studio lab setups, acoustics, custom rigs, and workstation environments.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/services">
                <Button size="sm" className="text-xs">
                  <span>Book Consultation</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-1 overflow-x-auto py-5">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  activeFilter === f
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground bg-surface-muted/60'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Gallery Showcase Grid */}
          <div className="mt-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedPhoto(item)}
                  className="group relative aspect-4/3 overflow-hidden rounded-xl border border-border bg-muted cursor-pointer shadow-xs transition-all hover:shadow-lg"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <span className="text-xs font-semibold text-accent uppercase">
                      {item.category}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white leading-tight mt-1 truncate">
                      {item.title}
                    </p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-white/80">
                      <ZoomIn className="h-3.5 w-3.5" />
                      <span>View full photo</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      <FormModal
        isOpen={Boolean(selectedPhoto)}
        title={selectedPhoto?.title ?? 'Photo Preview'}
        description={selectedPhoto ? `${selectedPhoto.category} • Full Resolution` : undefined}
        onClose={() => setSelectedPhoto(null)}
      >
        {selectedPhoto && (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-border bg-black">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="h-auto max-h-[60vh] w-full object-contain mx-auto"
              />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {selectedPhoto.caption}
            </p>
            <div className="flex justify-end pt-2">
              <Button size="sm" onClick={() => setSelectedPhoto(null)}>
                Close Preview
              </Button>
            </div>
          </div>
        )}
      </FormModal>

      <PublicFooter />
    </div>
  );
}
