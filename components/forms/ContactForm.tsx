'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const subjects = [
  'Hajj enquiry',
  'Umrah enquiry',
  'Visa service',
  'Air ticket',
  'Hotel booking',
  'Tour package',
  'General question',
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldBase =
  'w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-[0.95rem] text-ink outline-none transition focus:border-brand-600 focus:bg-card focus:ring-2 focus:ring-brand-600/15 dark:text-white';

export function ContactForm() {
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
        toast.error(data?.error ?? 'Something went wrong. Please try again or call us directly.');
        return;
      }

      toast.success('Thank you! Your message has reached us — we will be in touch shortly, insha’Allah.');
      reset();
    } catch {
      toast.error('Network error. Please check your connection and try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message}>
          <input
            type="text"
            autoComplete="name"
            placeholder="e.g. Md. Abdur Rahman"
            className={cn(fieldBase, errors.name && 'border-red-400 focus:ring-red-400/15')}
            {...register('name', {
              required: 'Please enter your full name.',
              minLength: { value: 2, message: 'Please enter your full name.' },
            })}
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="01XXX XXXXXX"
            className={cn(fieldBase, errors.phone && 'border-red-400 focus:ring-red-400/15')}
            {...register('phone', {
              required: 'Please enter your phone number.',
              minLength: { value: 6, message: 'Please enter a valid phone number.' },
            })}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={cn(fieldBase, errors.email && 'border-red-400 focus:ring-red-400/15')}
            {...register('email', {
              required: 'Please enter your email address.',
              pattern: { value: emailPattern, message: 'Please enter a valid email address.' },
            })}
          />
        </Field>
        <Field label="Subject" error={errors.subject?.message}>
          <select
            className={cn(fieldBase, errors.subject && 'border-red-400 focus:ring-red-400/15')}
            {...register('subject', { required: 'Please choose a subject.' })}
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" error={errors.message?.message}>
        <textarea
          rows={5}
          placeholder="Tell us about your plans — dates, number of travellers, budget or any questions you have."
          className={cn(fieldBase, 'resize-y', errors.message && 'border-red-400 focus:ring-red-400/15')}
          {...register('message', {
            required: 'Please write a short message.',
            minLength: { value: 10, message: 'Please tell us a little more (min. 10 characters).' },
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
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send message <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>

      <p className="text-xs text-ink-muted">
        We respect your privacy. Your details are used only to respond to your enquiry — see our{' '}
        <a href="/privacy" className="font-medium text-brand-700 underline underline-offset-2 dark:text-brand-300">
          Privacy Policy
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
