'use client';

import { forwardRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import {
  Upload,
  Loader2,
  Trash2,
  Eye,
  Download,
  FileText,
  BookUser,
  StickerIcon,
  Plane,
  Syringe,
  Hotel,
  FileQuestion,
  Lock,
  ShieldCheck,
  FileImage,
  X,
} from 'lucide-react';
import { formatDate, cn } from '@/lib/utils';
import { EmptyState } from '@/components/dashboard/ui';

export type VaultItem = {
  id: string;
  title: string;
  doc_type: string;
  file_url: string; // storage path (private)
  file_type: string | null;
  notes: string | null;
  created_at: string | null;
  signedUrl?: string | null; // minted server-side for the initial list
};

const DOC_TYPES = [
  'Passport',
  'Visa',
  'Air Ticket',
  'Vaccine Certificate',
  'Hotel Voucher',
  'Other',
] as const;

const MAX_MB = 12;

const typeIcon: Record<string, typeof FileText> = {
  Passport: BookUser,
  Visa: StickerIcon,
  'Air Ticket': Plane,
  'Vaccine Certificate': Syringe,
  'Hotel Voucher': Hotel,
  Other: FileQuestion,
};

const fieldBase =
  'w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-brand-600 focus:bg-card focus:ring-2 focus:ring-brand-600/15';

export function VaultManager({ initialItems }: { initialItems: VaultItem[] }) {
  const [items, setItems] = useState<VaultItem[]>(initialItems);
  const [title, setTitle] = useState('');
  const [docType, setDocType] = useState<string>(DOC_TYPES[0]);
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [openingId, setOpeningId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function resetForm() {
    setTitle('');
    setDocType(DOC_TYPES[0]);
    setNotes('');
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    if (!file) {
      toast.error('Please choose a file to upload.');
      return;
    }
    if (title.trim().length < 2) {
      toast.error('Please give this document a title.');
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      toast.error(`File is too large. Maximum size is ${MAX_MB}MB.`);
      return;
    }

    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('title', title.trim());
      fd.append('doc_type', docType);
      fd.append('notes', notes.trim());

      const res = await fetch('/api/vault/upload', { method: 'POST', body: fd });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Upload failed. Please try again.');
        return;
      }

      setItems((prev) => [data.item as VaultItem, ...prev]);
      toast.success('Document uploaded to your secure vault.');
      resetForm();
    } catch {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function resolveUrl(item: VaultItem): Promise<string | null> {
    if (item.signedUrl) return item.signedUrl;
    try {
      const res = await fetch(`/api/vault/${item.id}/url`);
      const data = await res.json().catch(() => ({}));
      if (res.ok && data?.ok && data.url) return data.url as string;
    } catch {
      // fall through
    }
    return null;
  }

  async function handleView(item: VaultItem) {
    setOpeningId(item.id);
    try {
      const url = await resolveUrl(item);
      if (!url) {
        toast.error('Could not open the document. Please try again.');
        return;
      }
      window.open(url, '_blank', 'noopener,noreferrer');
    } finally {
      setOpeningId(null);
    }
  }

  async function handleDownload(item: VaultItem) {
    const url = await resolveUrl(item);
    if (!url) {
      toast.error('Could not download the document. Please try again.');
      return;
    }
    const a = document.createElement('a');
    a.href = url;
    a.download = item.title || 'document';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function handleDelete(item: VaultItem) {
    if (deletingId) return;
    setDeletingId(item.id);
    try {
      const res = await fetch(`/api/vault/${item.id}`, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? 'Could not delete the document.');
        return;
      }
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      toast.success('Document deleted.');
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Privacy banner */}
      <div className="flex items-start gap-3 rounded-3xl border border-brand-600/15 bg-brand-50/70 p-4 sm:p-5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-600 text-white">
          <Lock className="h-5 w-5" />
        </span>
        <div>
          <p className="text-sm font-semibold text-brand-900">Your documents are private &amp; encrypted at rest</p>
          <p className="mt-0.5 text-sm text-ink-muted">
            Files are stored in a private, access-controlled vault — only you can view them while signed in.
            Links are time-limited and expire automatically. We never share your documents with third parties.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Upload form */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-6"
          >
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-100 text-gold-700">
                <Upload className="h-4.5 w-4.5" />
              </span>
              <h2 className="font-display text-lg font-semibold text-ink">Upload a document</h2>
            </div>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-ink">Title</span>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Passport — Md. Abdur Rahman"
                  maxLength={160}
                  className={fieldBase}
                />
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-ink">Document type</span>
                <select
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className={fieldBase}
                >
                  {DOC_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>

              <div className="block">
                <span className="mb-1.5 block text-sm font-semibold text-ink">File</span>
                <FileDrop
                  ref={fileInputRef}
                  file={file}
                  onChange={setFile}
                  onClear={() => {
                    setFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                />
                <p className="mt-1.5 text-xs text-ink-muted">
                  PDF or image (JPG, PNG, WebP). Images are optimised to WebP. Max {MAX_MB}MB.
                </p>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-ink">Notes (optional)</span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  maxLength={1000}
                  placeholder="Expiry date, reference number, anything worth remembering."
                  className={cn(fieldBase, 'resize-y')}
                />
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 font-semibold text-white shadow-emerald transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Uploading…
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" /> Upload to vault
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Document list */}
        <div className="lg:col-span-3">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-ink">Your documents</h2>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              <ShieldCheck className="h-3.5 w-3.5" /> {items.length} stored
            </span>
          </div>

          {items.length === 0 ? (
            <EmptyState
              icon={ShieldCheck}
              title="Your vault is empty"
              description="Upload your passport, visa, air ticket and other travel documents to keep them safe and ready for your journey."
            />
          ) : (
            <ul className="space-y-3">
              {items.map((item) => {
                const Icon = typeIcon[item.doc_type] ?? FileText;
                const isImage = (item.file_type ?? '').startsWith('image/');
                const busy = openingId === item.id;
                return (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft transition hover:border-brand-600/25"
                  >
                    <span
                      className={cn(
                        'grid h-11 w-11 shrink-0 place-items-center rounded-2xl',
                        isImage ? 'bg-gold-100 text-gold-700' : 'bg-brand-50 text-brand-600',
                      )}
                    >
                      {isImage ? <FileImage className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{item.title}</p>
                      <p className="mt-0.5 truncate text-xs text-ink-muted">
                        {item.doc_type}
                        {item.created_at ? ` · added ${formatDate(item.created_at)}` : ''}
                      </p>
                      {item.notes && (
                        <p className="mt-1 line-clamp-1 text-xs text-ink-muted/90">{item.notes}</p>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      <IconButton
                        label="View"
                        onClick={() => handleView(item)}
                        disabled={busy}
                      >
                        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Eye className="h-4 w-4" />}
                      </IconButton>
                      <IconButton label="Download" onClick={() => handleDownload(item)}>
                        <Download className="h-4 w-4" />
                      </IconButton>
                      <IconButton
                        label="Delete"
                        tone="danger"
                        onClick={() => handleDelete(item)}
                        disabled={deletingId === item.id}
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </IconButton>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

const FileDrop = forwardRef<
  HTMLInputElement,
  {
    file: File | null;
    onChange: (f: File | null) => void;
    onClear: () => void;
  }
>(function FileDrop({ file, onChange, onClear }, ref) {
  return (
    <div className="relative">
      <input
        ref={ref}
        type="file"
        accept="application/pdf,image/*"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
        className="peer absolute inset-0 z-10 cursor-pointer opacity-0"
        aria-label="Choose a file to upload"
      />
      <div
        className={cn(
          'flex items-center gap-3 rounded-2xl border border-dashed border-border bg-background/60 px-4 py-3.5 transition peer-hover:border-brand-600/50 peer-focus:border-brand-600',
          file && 'border-brand-600/40 bg-brand-50/50',
        )}
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-card text-brand-600 shadow-soft">
          <Upload className="h-4 w-4" />
        </span>
        <span className="min-w-0 flex-1">
          {file ? (
            <span className="block truncate text-sm font-semibold text-ink">{file.name}</span>
          ) : (
            <span className="block text-sm text-ink-muted">Click to choose a file…</span>
          )}
          {file && (
            <span className="block text-xs text-ink-muted">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          )}
        </span>
        {file && (
          <button
            type="button"
            onClick={onClear}
            className="relative z-20 grid h-7 w-7 place-items-center rounded-full text-ink-muted transition hover:bg-red-50 hover:text-red-600"
            aria-label="Remove selected file"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
});

function IconButton({
  label,
  children,
  onClick,
  disabled,
  tone = 'default',
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  tone?: 'default' | 'danger';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        'grid h-9 w-9 place-items-center rounded-xl border border-border bg-card text-ink-muted transition disabled:cursor-not-allowed disabled:opacity-50',
        tone === 'danger'
          ? 'hover:border-red-200 hover:bg-red-50 hover:text-red-600'
          : 'hover:border-brand-600/30 hover:bg-brand-50 hover:text-brand-700',
      )}
    >
      {children}
    </button>
  );
}
