'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, type LucideIcon } from 'lucide-react';
import { signIn, type AuthState } from '@/app/auth/actions';

const initialState: AuthState = { ok: false };

const fieldShell =
  'flex items-center gap-2.5 rounded-2xl border border-border bg-background/60 px-3.5 transition focus-within:border-brand-600 focus-within:bg-card focus-within:ring-2 focus-within:ring-brand-600/15';
const inputBase =
  'w-full bg-transparent py-3 text-[0.95rem] text-ink outline-none placeholder:text-ink-muted/70';

/** Staff / admin sign-in. Email + password only; success redirects to /admin. */
export function AuthForm({ portal = true }: { portal?: boolean }) {
  const [state, formAction] = useFormState(signIn, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const lastError = useRef<string | undefined>();

  // Surface server-action errors as a toast (in addition to the inline message).
  useEffect(() => {
    if (state.error && state.error !== lastError.current) {
      toast.error(state.error);
    }
    lastError.current = state.error;
  }, [state.error]);

  return (
    <form action={formAction} noValidate className="space-y-4">
      <Field
        icon={Mail}
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        defaultValue={state.email}
        required
      />

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-ink">
          Password
        </label>
        <div className={fieldShell}>
          <Lock className="h-[1.15rem] w-[1.15rem] shrink-0 text-ink-muted" />
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Enter your password"
            required
            className={inputBase}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            aria-pressed={showPassword}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-ink-muted transition hover:bg-brand-50 hover:text-brand-700"
          >
            {showPassword ? <EyeOff className="h-[1.1rem] w-[1.1rem]" /> : <Eye className="h-[1.1rem] w-[1.1rem]" />}
          </button>
        </div>
      </div>

      {state.error && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm font-medium text-red-600"
        >
          <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-red-500 text-[0.65rem] font-bold text-white">
            !
          </span>
          {state.error}
        </p>
      )}

      <SubmitButton portal={portal} />

      {portal && (
        <p className="flex items-center justify-center gap-1.5 pt-1 text-center text-xs text-ink-muted">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
          This is a restricted area for authorised staff only.
        </p>
      )}
    </form>
  );
}

/* ------------------------------ sub-components ----------------------------- */

function SubmitButton({ portal }: { portal: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-brand-600 px-7 font-semibold text-white shadow-emerald transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative inline-flex items-center gap-2">
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
          </>
        ) : (
          <>
            {portal ? 'Sign in to admin' : 'Sign in'}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </span>
    </button>
  );
}

function Field({
  icon: Icon,
  label,
  name,
  type,
  autoComplete,
  placeholder,
  defaultValue,
  required,
}: {
  icon: LucideIcon;
  label: string;
  name: string;
  type: string;
  autoComplete: string;
  placeholder: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <div className={fieldShell}>
        <Icon className="h-[1.15rem] w-[1.15rem] shrink-0 text-ink-muted" />
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          defaultValue={defaultValue}
          required={required}
          className={inputBase}
        />
      </div>
    </div>
  );
}
