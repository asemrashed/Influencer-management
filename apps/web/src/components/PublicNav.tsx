import Link from 'next/link';
import { Button } from '@platform/ui';

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-surface/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-xl font-bold tracking-tight text-foreground">
            YouTuber
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-border bg-surface-muted/50 p-1">
          <Link
            href="/#home"
            className="rounded-full px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-surface"
          >
            Home
          </Link>
          <Link
            href="/#about"
            className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            About Me
          </Link>
          <Link
            href="/#services"
            className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            My Services
          </Link>
          <Link
            href="/#videos"
            className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Featured Videos
          </Link>
          <Link
            href="/#partners"
            className="rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Partners
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-xs">
              Dashboard Login
            </Button>
          </Link>
          <Link href="/#contact">
            <Button size="sm" className="rounded-full text-xs gap-1.5 shadow-sm">
              <span>Contact Me</span>
              <span className="text-xs">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
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

