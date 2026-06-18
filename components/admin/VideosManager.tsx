'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {
  Loader2,
  Plus,
  Trash2,
  Pencil,
  X,
  Video as VideoIcon,
  Eye,
  EyeOff,
  ExternalLink,
} from 'lucide-react';
import { Card, Field, inputClass, AdminButton, EmptyState, Badge } from '@/components/admin/ui';
import { cn } from '@/lib/utils';

export type AdminVideo = {
  id: string;
  title: string;
  youtube_url: string;
  youtube_id: string | null;
  description: string | null;
  sort_order: number;
  active: boolean;
};

/** Client-side YouTube id parser — mirrors lib/videos.ts youtubeId() for live preview. */
function parseYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtube\.com\/live\/)([A-Za-z0-9_-]{11})/,
    /^([A-Za-z0-9_-]{11})$/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}

const thumbOf = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

type FormState = {
  title: string;
  youtube_url: string;
  description: string;
  sort_order: string;
  active: boolean;
};

const emptyForm: FormState = {
  title: '',
  youtube_url: '',
  description: '',
  sort_order: '0',
  active: true,
};

export function VideosManager({ initial }: { initial: AdminVideo[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  const previewId = useMemo(() => parseYouTubeId(form.youtube_url.trim()), [form.youtube_url]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function startEdit(video: AdminVideo) {
    setEditingId(video.id);
    setForm({
      title: video.title,
      youtube_url: video.youtube_url,
      description: video.description ?? '',
      sort_order: String(video.sort_order ?? 0),
      active: video.active,
    });
    setOpen(true);
  }

  function closeForm() {
    setOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function save() {
    if (form.title.trim().length < 1) {
      toast.error('Please add a title.');
      return;
    }
    if (!previewId) {
      toast.error('Please paste a valid YouTube link.');
      return;
    }
    setSaving(true);
    try {
      const body = {
        ...(editingId ? { id: editingId } : {}),
        title: form.title.trim(),
        youtube_url: form.youtube_url.trim(),
        description: form.description.trim() || null,
        sort_order: Number(form.sort_order) || 0,
        active: form.active,
      };
      const res = await fetch('/api/admin/videos', {
        method: editingId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not save the video.');
        return;
      }
      toast.success(editingId ? 'Video updated.' : 'Video added.');
      closeForm();
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(video: AdminVideo) {
    setBusyId(video.id);
    try {
      const res = await fetch('/api/admin/videos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: video.id, active: !video.active }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not update the video.');
        return;
      }
      toast.success(video.active ? 'Video hidden from the site.' : 'Video is now live.');
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setBusyId(null);
    }
  }

  async function remove(video: AdminVideo) {
    if (!window.confirm(`Delete "${video.title}"? This cannot be undone.`)) return;
    setBusyId(video.id);
    try {
      const res = await fetch(`/api/admin/videos?id=${encodeURIComponent(video.id)}`, {
        method: 'DELETE',
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not delete the video.');
        return;
      }
      toast.success('Video deleted.');
      router.refresh();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <AdminButton variant="primary" onClick={open ? closeForm : startCreate}>
          {open ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {open ? 'Close' : 'Add video'}
        </AdminButton>
      </div>

      {open && (
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">{editingId ? 'Edit video' : 'New video'}</p>
            <button
              onClick={closeForm}
              className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition hover:bg-muted"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_1.3fr]">
            {/* Live thumbnail preview */}
            <div>
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-muted">
                {previewId ? (
                  <Image
                    key={previewId}
                    src={thumbOf(previewId)}
                    alt="Video thumbnail preview"
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-center text-sm text-ink-muted">
                    <span className="flex flex-col items-center gap-2 px-4">
                      <VideoIcon className="h-7 w-7 opacity-60" />
                      Paste a YouTube link to preview the thumbnail
                    </span>
                  </div>
                )}
              </div>
              {previewId && (
                <p className="mt-2 truncate text-xs text-ink-muted">
                  Detected video id: <span className="font-mono text-ink">{previewId}</span>
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Field label="Title">
                <input
                  className={inputClass}
                  value={form.title}
                  placeholder="e.g. How to perform Tawaf — step by step"
                  onChange={(e) => set('title', e.target.value)}
                />
              </Field>
              <Field label="YouTube link" hint="watch, youtu.be, shorts or live URLs all work">
                <input
                  className={inputClass}
                  value={form.youtube_url}
                  placeholder="https://www.youtube.com/watch?v=..."
                  onChange={(e) => set('youtube_url', e.target.value)}
                />
              </Field>
              <Field label="Description" hint="Optional — shown beneath the player">
                <textarea
                  className={cn(inputClass, 'min-h-[88px] resize-y')}
                  value={form.description}
                  placeholder="A short summary of what this video covers."
                  onChange={(e) => set('description', e.target.value)}
                />
              </Field>
              <div className="grid grid-cols-2 items-end gap-3">
                <Field label="Sort order" hint="Lower shows first">
                  <input
                    type="number"
                    className={inputClass}
                    value={form.sort_order}
                    onChange={(e) => set('sort_order', e.target.value)}
                  />
                </Field>
                <label className="flex h-[46px] cursor-pointer items-center justify-between gap-3 rounded-xl border border-border bg-background/60 px-3.5">
                  <span className="text-sm font-semibold text-ink">Visible on site</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={form.active}
                    onClick={() => set('active', !form.active)}
                    className={cn(
                      'relative h-6 w-11 shrink-0 rounded-full transition',
                      form.active ? 'bg-brand-600' : 'bg-muted-foreground/30',
                    )}
                  >
                    <span
                      className={cn(
                        'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition',
                        form.active ? 'left-[22px]' : 'left-0.5',
                      )}
                    />
                  </button>
                </label>
              </div>
              <AdminButton variant="primary" onClick={save} disabled={saving} className="w-full">
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                {editingId ? 'Save changes' : 'Add video'}
              </AdminButton>
            </div>
          </div>
        </Card>
      )}

      {initial.length === 0 ? (
        <EmptyState
          icon={<VideoIcon className="h-6 w-6" />}
          title="No videos yet"
          description="Add your first YouTube video to start building the public Videos page."
          action={
            <AdminButton variant="primary" onClick={startCreate}>
              <Plus className="h-4 w-4" /> Add video
            </AdminButton>
          }
        />
      ) : (
        <div className="space-y-3">
          {initial.map((video) => {
            const yt = video.youtube_id || parseYouTubeId(video.youtube_url);
            const busy = busyId === video.id;
            return (
              <Card key={video.id} className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl bg-muted sm:w-44">
                  {yt ? (
                    <Image
                      src={thumbOf(yt)}
                      alt={video.title}
                      fill
                      sizes="176px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center text-ink-muted">
                      <VideoIcon className="h-6 w-6" />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-semibold text-ink">{video.title}</p>
                    <Badge tone={video.active ? 'emerald' : 'gray'}>
                      {video.active ? 'Live' : 'Hidden'}
                    </Badge>
                    <Badge tone="gold">#{video.sort_order}</Badge>
                  </div>
                  {video.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{video.description}</p>
                  )}
                  <a
                    href={video.youtube_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-800"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Open on YouTube
                  </a>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-stretch">
                  <AdminButton
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActive(video)}
                    disabled={busy}
                  >
                    {busy ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : video.active ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    {video.active ? 'Hide' : 'Show'}
                  </AdminButton>
                  <AdminButton variant="outline" size="sm" onClick={() => startEdit(video)} disabled={busy}>
                    <Pencil className="h-4 w-4" /> Edit
                  </AdminButton>
                  <AdminButton variant="danger" size="sm" onClick={() => remove(video)} disabled={busy}>
                    <Trash2 className="h-4 w-4" /> Delete
                  </AdminButton>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
