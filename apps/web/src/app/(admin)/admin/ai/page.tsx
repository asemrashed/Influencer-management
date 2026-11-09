'use client';

import React, { useState } from 'react';
import { PageHeader, Card, CardHeader, CardTitle, CardContent, Button, ApprovalBadge } from '@platform/ui';
import { useSession } from '@/providers/SessionProvider';
import { Sparkles, Check, X, Copy, Wand2 } from 'lucide-react';

interface AiDraft {
  id: string;
  task: 'BRAND_PITCH' | 'VIDEO_SCRIPT' | 'SOCIAL_CAPTION' | 'INBOX_REPLY';
  prompt: string;
  result: string;
  status: 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';
}

export default function AiStudioPage() {
  const { can } = useSession();
  const [task, setTask] = useState<'BRAND_PITCH' | 'VIDEO_SCRIPT' | 'SOCIAL_CAPTION'>('BRAND_PITCH');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const [drafts, setDrafts] = useState<AiDraft[]>([
    {
      id: '1',
      task: 'BRAND_PITCH',
      prompt: 'Sponsorship pitch to Anker for upcoming travel charging kit review',
      result: 'Hi Team Anker, I am preparing a 3-part series on optimal remote developer setups for my 1.2M+ subscribers. Given your latest multi-port gallium-nitride chargers, I would love to integrate a 60-second dedicated mid-roll segment showcasing...',
      status: 'PENDING_APPROVAL',
    },
    {
      id: '2',
      task: 'SOCIAL_CAPTION',
      prompt: 'Instagram reel announcement for iPhone 16 Pro camera review',
      result: 'Is the new 5x optical telephoto actually worth the upgrade? Tested it over 7 days in Tokyo rain & night cityscapes. Full breakdown link in bio! 📸✨ #TechReview #CreatorStudio',
      status: 'APPROVED',
    },
  ]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;

    setIsGenerating(true);
    setTimeout(() => {
      const newDraft: AiDraft = {
        id: String(Date.now()),
        task,
        prompt,
        result: `Generated Draft for "${prompt}":\n\nDear Partner,\n\nWe would love to highlight your products across our verified audience. Our audience consists of 85% tech professionals and creators. Let's schedule a call to review deliverables and engagement rates.\n\nBest regards,\nCreator Management`,
        status: 'PENDING_APPROVAL',
      };
      setDrafts([newDraft, ...drafts]);
      setPrompt('');
      setIsGenerating(false);
    }, 1000);
  };

  const handleDecide = (id: string, status: 'APPROVED' | 'REJECTED') => {
    setDrafts(drafts.map((d) => (d.id === id ? { ...d, status } : d)));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Creative Studio & Automation"
        description="Generate sponsored brand pitches, video scripts, and caption drafts with strict human-in-the-loop review."
      />

      {/* Generation Prompt Box */}
      {can('ai.generate') && (
        <Card className="p-6 bg-surface border-border shadow-sm">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Create AI Generation Brief</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button
                  type="button"
                  variant={task === 'BRAND_PITCH' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTask('BRAND_PITCH')}
                  className="text-xs"
                >
                  Brand Sponsor Pitch
                </Button>
                <Button
                  type="button"
                  variant={task === 'VIDEO_SCRIPT' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTask('VIDEO_SCRIPT')}
                  className="text-xs"
                >
                  Video Segment Script
                </Button>
                <Button
                  type="button"
                  variant={task === 'SOCIAL_CAPTION' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTask('SOCIAL_CAPTION')}
                  className="text-xs"
                >
                  Multi-Platform Caption
                </Button>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground">Brief / Context / Objectives</label>
                <textarea
                  rows={3}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Write an outreach email to Logitech proposing a dedicated desk makeover video for Q1..."
                  className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
              </div>

              <div className="flex justify-end">
                <Button size="sm" type="submit" disabled={isGenerating} className="gap-1.5">
                  <Wand2 className="h-4 w-4" />
                  <span>{isGenerating ? 'Generating Draft...' : 'Generate with AI'}</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Generated Drafts List */}
      <div className="space-y-4">
        <h3 className="font-heading font-semibold text-foreground text-sm">
          Pending & Reviewed Drafts
        </h3>

        {drafts.map((draft) => (
          <Card key={draft.id} className="p-5 bg-surface border-border">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-xs text-primary uppercase tracking-wider">
                  {draft.task.replace(/_/g, ' ')}
                </span>
                <span className="text-xs text-muted-foreground">• &ldquo;{draft.prompt}&rdquo;</span>
              </div>
              <ApprovalBadge status={draft.status} />
            </div>

            <div className="mt-3 p-4 rounded-lg bg-surface-muted/40 text-xs text-foreground font-mono leading-relaxed whitespace-pre-wrap border border-border/50">
              {draft.result}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground gap-1"
                onClick={() => navigator.clipboard.writeText(draft.result)}
              >
                <Copy className="h-3.5 w-3.5" />
                <span>Copy Draft</span>
              </Button>

              {draft.status === 'PENDING_APPROVAL' && can('ai.approve') && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs text-danger hover:bg-danger/10"
                    onClick={() => handleDecide(draft.id, 'REJECTED')}
                  >
                    <X className="h-3.5 w-3.5 mr-1" />
                    <span>Reject</span>
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs text-success-foreground bg-success hover:opacity-90"
                    onClick={() => handleDecide(draft.id, 'APPROVED')}
                  >
                    <Check className="h-3.5 w-3.5 mr-1" />
                    <span>Approve Draft</span>
                  </Button>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
