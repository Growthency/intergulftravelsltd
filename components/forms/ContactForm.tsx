'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocale } from '@/components/providers/LocaleProvider';
import { getDict } from '@/lib/dictionaries/areas/contact';
import { localizedPath } from '@/lib/i18n';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldBase =
  'w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-brand-600 focus:bg-card focus:ring-2 focus:ring-brand-600/15 dark:text-white';

export function ContactForm() {
  const locale = useLocale();
  const t = getDict(locale);
  const f = t.formFields;
  const subjects = f.subjects;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: { name: '', email: '', phone: '', subject: subjects[0], message: '' },
  });

  async function onSubmit(values: FormValues) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        toast.error(data?.error ?? f.toast.genericError);
        return;
      }

      toast.success(f.toast.success);
      reset();
    } catch {
      toast.error(f.toast.networkError);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={f.labels.name} error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            placeholder={f.placeholders.name}
            className={cn(fieldBase, errors.name && 'border-red-400 focus:ring-red-400/15')}
            {...register('name', {
              required: f.errors.nameRequired,
              minLength: { value: 2, message: f.errors.nameRequired },
            })}
          />
        </Field>
        <Field label={f.labels.phone} error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            placeholder={f.placeholders.phone}
            className={cn(fieldBase, errors.phone && 'border-red-400 focus:ring-red-400/15')}
            {...register('phone', {
              required: f.errors.phoneRequired,
              minLength: { value: 6, message: f.errors.phoneInvalid },
            })}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={f.labels.email} error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            placeholder={f.placeholders.email}
            className={cn(fieldBase, errors.email && 'border-red-400 focus:ring-red-400/15')}
            {...register('email', {
              required: f.errors.emailRequired,
              pattern: { value: emailPattern, message: f.errors.emailInvalid },
            })}
          />
        </Field>
        <Field label={f.labels.subject} error={errors.subject?.message}>
          <select
            className={cn(fieldBase, errors.subject && 'border-red-400 focus:ring-red-400/15')}
            {...register('subject', { required: f.errors.subjectRequired })}
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label={f.labels.message} error={errors.message?.message}>
        <textarea
          rows={5}
          placeholder={f.placeholders.message}
          className={cn(fieldBase, 'resize-y', errors.message && 'border-red-400 focus:ring-red-400/15')}
          {...register('message', {
            required: f.errors.messageRequired,
            minLength: { value: 10, message: f.errors.messageMin },
          })}
        />
      </Field>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-600 px-7 font-semibold text-white shadow-emerald transition-all duration-300 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> {f.submitting}
          </>
        ) : (
          <>
            {f.submit} <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      <p className="text-xs text-ink-muted">
        {f.privacyA}
        <a href={localizedPath(locale, '/privacy')} className="font-medium text-brand-700 underline underline-offset-2 dark:text-brand-300">
          {f.privacyLink}
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink dark:text-white">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-xs font-medium text-red-500">{error}</span>}
    </label>
  );
}
