'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@platform/ui';
import { Menu, X } from 'lucide-react';

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-surface/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-xl font-bold tracking-tight text-foreground">
              YouTuber
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-border bg-surface-muted/50 p-1">
            <Link
              href="/"
              className="rounded-full px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About Me
            </Link>
            <Link
              href="/services"
              className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              My Services
            </Link>
            <Link
              href="/videos"
              className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Featured Videos
            </Link>
            <Link
              href="/store"
              className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Store
            </Link>
            <Link
              href="/gallery"
              className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Gallery
            </Link>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login" className="hidden sm:inline-block">
              <Button variant="ghost" size="sm" className="text-xs">
                Dashboard Login
              </Button>
            </Link>
            <Link href="/#contact" className="hidden sm:inline-block">
              <Button size="sm" className="rounded-full text-xs gap-1.5 shadow-sm">
                <span>Contact Me</span>
                <span className="text-xs">→</span>
              </Button>
            </Link>

            {/* Mobile / Tablet Menu Button */}
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden h-9 w-9 rounded-lg"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile / Tablet Slide-in Drawer from Right Side */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Drawer content sliding in from right */}
          <div className="relative z-10 w-4/5 max-w-xs h-full bg-surface border-l border-border p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="font-heading font-bold text-lg text-foreground">
                  Navigation
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <nav className="flex flex-col gap-2 mt-6">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-surface-muted transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  onClick={closeMenu}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-surface-muted transition-colors"
                >
                  About Me
                </Link>
                <Link
                  href="/services"
                  onClick={closeMenu}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-surface-muted transition-colors"
                >
                  My Services
                </Link>
                <Link
                  href="/videos"
                  onClick={closeMenu}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-surface-muted transition-colors"
                >
                  Featured Videos
                </Link>
                <Link
                  href="/store"
                  onClick={closeMenu}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-surface-muted transition-colors"
                >
                  Store & Merch
                </Link>
                <Link
                  href="/gallery"
                  onClick={closeMenu}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-surface-muted transition-colors"
                >
                  Gallery
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-border flex flex-col gap-2">
              <Link href="/login" onClick={closeMenu}>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Dashboard Portal
                </Button>
              </Link>
              <Link href="/#contact" onClick={closeMenu}>
                <Button size="sm" className="w-full text-xs">
                  Contact Me
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-surface py-12">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-heading text-lg font-bold text-foreground">
              YouTuber
            </span>
            <p className="mt-1 text-xs text-muted-foreground max-w-sm">
              Partnering with forward-thinking tech brands to tell unforgettable stories and drive verified high-impact reach.
            </p>
          </div>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <Link href="/#about" className="hover:text-foreground">About</Link>
            <Link href="/#services" className="hover:text-foreground">Services</Link>
            <Link href="/#videos" className="hover:text-foreground">Videos</Link>
            <Link href="/login" className="hover:text-foreground">Staff Portal</Link>
          </div>
        </div>
        <div className="mt-8 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Creator Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
