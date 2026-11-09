'use client';

import React, { useState } from 'react';
import { PageHeader, DataTable, Button, FormModal, Input, Badge } from '@platform/ui';
import { useSession } from '@/providers/SessionProvider';
import { Calendar, Plus, MapPin, Users, QrCode } from 'lucide-react';

interface EventItem {
  id: string;
  title: string;
  venue: string;
  date: string;
  capacity: number;
  rsvpsCount: number;
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
}

export default function EventsAdminPage() {
  const { can } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [ticketCode, setTicketCode] = useState('');
  const [scanResult, setScanResult] = useState<string | null>(null);

  const [events, setEvents] = useState<EventItem[]>([
    {
      id: '1',
      title: 'Creator Tech Summit & Live Keynote',
      venue: 'Metropolis Convention Hall, San Francisco',
      date: '2026-12-15',
      capacity: 350,
      rsvpsCount: 284,
      status: 'UPCOMING',
    },
    {
      id: '2',
      title: 'Exclusive Developer Hardware Meetup',
      venue: 'Innovation Studio, Austin',
      date: '2026-11-28',
      capacity: 80,
      rsvpsCount: 80,
      status: 'UPCOMING',
    },
  ]);

  const [formTitle, setFormTitle] = useState('');
  const [formVenue, setFormVenue] = useState('');
  const [formDate, setFormDate] = useState('2026-12-20');
  const [formCapacity, setFormCapacity] = useState('100');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formVenue) return;

    const newEvent: EventItem = {
      id: String(Date.now()),
      title: formTitle,
      venue: formVenue,
      date: formDate,
      capacity: parseInt(formCapacity, 10) || 50,
      rsvpsCount: 0,
      status: 'UPCOMING',
    };

    setEvents([newEvent, ...events]);
    setFormTitle('');
    setFormVenue('');
    setIsModalOpen(false);
  };

  const handleScanCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketCode) return;
    setScanResult(`Ticket verified! RSVP ID #${ticketCode.toUpperCase()} checked in successfully.`);
    setTicketCode('');
  };

  const columns = [
    {
      key: 'title',
      header: 'Event Name',
      render: (row: EventItem) => (
        <div>
          <span className="font-semibold text-foreground text-sm flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            {row.title}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
            <MapPin className="h-3 w-3" />
            {row.venue}
          </span>
        </div>
      ),
    },
    {
      key: 'date',
      header: 'Date',
      render: (row: EventItem) => (
        <span className="text-xs font-medium text-foreground">{row.date}</span>
      ),
    },
    {
      key: 'rsvps',
      header: 'Attendance',
      render: (row: EventItem) => (
        <div className="flex items-center gap-1.5 text-xs text-foreground">
          <Users className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{row.rsvpsCount} / {row.capacity} registered</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: EventItem) => (
        <Badge variant={row.status === 'UPCOMING' ? 'success' : 'secondary'}>
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Event Management & QR Check-In"
        description="Host creator meetups, fan conventions, and live press demos with instant QR ticket checking."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsScannerOpen(true)}>
              <QrCode className="h-4 w-4 mr-1" />
              <span>QR Ticket Check-In</span>
            </Button>
            {can('events.write') && (
              <Button size="sm" onClick={() => setIsModalOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                <span>Create Event</span>
              </Button>
            )}
          </div>
        }
      />

      <DataTable columns={columns} data={events} keyField="id" />

      {/* QR Ticket Check-In Modal */}
      <FormModal
        isOpen={isScannerOpen}
        title="QR Ticket Scanner & Check-In"
        description="Scan an attendee ticket QR code or manually enter the ticket token."
        onClose={() => {
          setIsScannerOpen(false);
          setScanResult(null);
        }}
      >
        <form onSubmit={handleScanCheckIn} className="space-y-4">
          <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl bg-surface-muted/30">
            <QrCode className="h-12 w-12 text-primary mb-2" />
            <p className="text-xs text-muted-foreground text-center">
              Camera QR scanner is ready. Position attendee ticket in view or enter code below.
            </p>
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Ticket Token / Code</label>
            <Input
              value={ticketCode}
              onChange={(e) => setTicketCode(e.target.value)}
              placeholder="e.g. TKT-984321"
              className="mt-1 font-mono uppercase"
              required
            />
          </div>

          {scanResult && (
            <div className="p-3 bg-success/10 border border-success/30 rounded-lg text-xs text-success font-medium">
              ✓ {scanResult}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => {
                setIsScannerOpen(false);
                setScanResult(null);
              }}
            >
              Close
            </Button>
            <Button size="sm" type="submit">
              Check In Attendee
            </Button>
          </div>
        </form>
      </FormModal>

      {/* Create Event Modal */}
      <FormModal
        isOpen={isModalOpen}
        title="Create New Event"
        description="Schedule an upcoming creator or brand event."
        onClose={() => setIsModalOpen(false)}
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-foreground">Event Title</label>
            <Input
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g. Annual Creator Showcase"
              className="mt-1"
              required
            />
          </div>

          <div>
            <label className="text-xs font-medium text-foreground">Venue & Location</label>
            <Input
              value={formVenue}
              onChange={(e) => setFormVenue(e.target.value)}
              placeholder="e.g. Studio 4B, New York"
              className="mt-1"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-foreground">Date</label>
              <Input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground">Capacity</label>
              <Input
                type="number"
                value={formCapacity}
                onChange={(e) => setFormCapacity(e.target.value)}
                className="mt-1"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" type="submit">
              Publish Event
            </Button>
          </div>
        </form>
      </FormModal>
    </div>
  );
}

