'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, LogOut, ChevronRight, ShieldCheck, ExternalLink, Settings } from 'lucide-react';
import { Logo, LogoMark } from '@/components/brand/Logo';
import { cn } from '@/lib/utils';
import { signOut } from '@/components/dashboard/actions';
import {
  dashboardNav,
  displayName,
  initials,
  type DashboardProfile,
  type DashboardUser,
  type NavLink,
} from '@/components/dashboard/nav';

function isActive(pathname: string, link: NavLink) {
  if (link.exact) return pathname === link.href;
  return pathname === link.href || pathname.startsWith(`${link.href}/`);
}

function currentTitle(pathname: string): string {
  const match = [...dashboardNav]
    .sort((a, b) => b.href.length - a.href.length)
    .find((l) => isActive(pathname, l));
  return match?.label ?? 'Dashboard';
}

export function DashboardShell({
  user,
  profile,
  isAdmin,
  children,
}: {
  user: DashboardUser;
  profile: DashboardProfile;
  isAdmin: boolean;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const name = displayName(profile, user.email);
  const title = currentTitle(pathname);

  const navContent = (
    <SidebarNav
      pathname={pathname}
      isAdmin={isAdmin}
      onNavigate={() => setDrawerOpen(false)}
    />
  );

  return (
    <div className="min-h-screen bg-sand-soft text-ink">
      {/* ---------------- Desktop sidebar ---------------- */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col bg-brand-900 text-white lg:flex">
        <SidebarInner profile={profile} name={name} email={user.email}>
          {navContent}
        </SidebarInner>
      </aside>

      {/* ---------------- Mobile drawer ---------------- */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              aria-hidden
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 flex w-[17.5rem] max-w-[82%] flex-col bg-brand-900 text-white lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 36 }}
            >
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="absolute right-4 top-5 grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20"
              >
                <X className="h-4.5 w-4.5" />
              </button>
              <SidebarInner profile={profile} name={name} email={user.email}>
                {navContent}
              </SidebarInner>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ---------------- Main column ---------------- */}
      <div className="flex min-h-screen flex-col lg:pl-72">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-border bg-sand-soft/85 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-card text-ink transition hover:bg-brand-50 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="min-w-0 flex-1">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-brand-600/80">
                Member Area
              </p>
              <h1 className="-mt-0.5 truncate font-display text-lg font-semibold text-ink sm:text-xl">
                {title}
              </h1>
            </div>

            <UserMenu name={name} email={user.email} avatarUrl={profile.avatar_url} />
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Sidebar
 * ------------------------------------------------------------------ */
function SidebarInner({
  profile,
  name,
  email,
  children,
}: {
  profile: DashboardProfile;
  name: string;
  email: string | null;
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-6 pb-5 pt-6">
        <Link href="/" aria-label="Inter Gulf Travels — home" className="inline-flex items-center gap-2.5">
          <LogoMark glow className="h-9 w-9" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.15rem] font-semibold tracking-tight text-white">
              Inter <span className="text-gold-300">Gulf</span>
            </span>
            <span className="mt-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.32em] text-gold-300/80">
              Travels Ltd
            </span>
          </span>
        </Link>
      </div>

      <div className="mx-6 mb-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      {/* Profile chip */}
      <div className="mx-4 mb-5 flex items-center gap-3 rounded-2xl bg-white/[0.06] px-3 py-3 ring-1 ring-inset ring-white/10">
        <Avatar name={name} avatarUrl={profile.avatar_url} className="h-10 w-10" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{name}</p>
          <p className="truncate text-xs text-white/55">{email ?? 'Signed in'}</p>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1">{children}</div>

      {/* Footer / sign out */}
      <div className="mt-auto space-y-3 px-4 pb-6 pt-4">
        <div className="rounded-2xl bg-white/[0.05] p-4 ring-1 ring-inset ring-white/10">
          <p className="text-xs font-semibold text-gold-300">Need a hand?</p>
          <p className="mt-1 text-xs leading-relaxed text-white/60">
            Our advisors are here Saturday–Thursday, 10 AM–8 PM.
          </p>
          <Link
            href="/contact"
            className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-white transition hover:text-gold-300"
          >
            Contact support <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <form action={signOut}>
          <button
            type="submit"
            className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4.5 w-4.5" />
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}

function SidebarNav({
  pathname,
  isAdmin,
  onNavigate,
}: {
  pathname: string;
  isAdmin: boolean;
  onNavigate: () => void;
}) {
  return (
    <nav className="space-y-1 px-4">
      {dashboardNav.map((link) => {
        const active = isActive(pathname, link);
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition',
              active
                ? 'bg-white/[0.12] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]'
                : 'text-white/65 hover:bg-white/[0.07] hover:text-white',
            )}
          >
            {active && (
              <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-gold-400" />
            )}
            <Icon
              className={cn(
                'h-4.5 w-4.5 shrink-0 transition',
                active ? 'text-gold-300' : 'text-white/55 group-hover:text-white',
              )}
            />
            {link.label}
          </Link>
        );
      })}

      {isAdmin && (
        <>
          <div className="my-3 px-3.5">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-white/35">
              Staff
            </p>
          </div>
          <Link
            href="/admin"
            onClick={onNavigate}
            className="group flex items-center gap-3 rounded-xl border border-gold-400/25 bg-gold-400/[0.08] px-3.5 py-2.5 text-sm font-semibold text-gold-200 transition hover:bg-gold-400/[0.15]"
          >
            <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-gold-300" />
            Admin Panel
            <ExternalLink className="ml-auto h-3.5 w-3.5 text-gold-300/70" />
          </Link>
        </>
      )}
    </nav>
  );
}

/* ------------------------------------------------------------------ *
 *  Avatar + user menu (topbar)
 * ------------------------------------------------------------------ */
export function Avatar({
  name,
  avatarUrl,
  className,
}: {
  name: string;
  avatarUrl: string | null;
  className?: string;
}) {
  if (avatarUrl) {
    return (
      <span
        className={cn(
          'relative inline-block overflow-hidden rounded-full ring-2 ring-white/20',
          className,
        )}
      >
        <Image
          src={avatarUrl}
          alt={name}
          fill
          sizes="48px"
          className="object-cover"
          unoptimized
        />
      </span>
    );
  }
  return (
    <span
      className={cn(
        'grid place-items-center rounded-full bg-gold-gradient text-sm font-bold text-brand-900 ring-2 ring-white/20',
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}

function UserMenu({
  name,
  email,
  avatarUrl,
}: {
  name: string;
  email: string | null;
  avatarUrl: string | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-2.5 transition hover:border-brand-600/40 hover:shadow-soft"
      >
        <Avatar name={name} avatarUrl={avatarUrl} className="h-8 w-8 ring-brand-600/10" />
        <span className="hidden max-w-[8rem] truncate text-sm font-semibold text-ink sm:block">
          {name.split(' ')[0]}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className="absolute right-0 mt-2 w-60 overflow-hidden rounded-2xl border border-border bg-card shadow-glow"
          >
            <div className="border-b border-border px-4 py-3">
              <p className="truncate text-sm font-semibold text-ink">{name}</p>
              <p className="truncate text-xs text-ink-muted">{email ?? 'Signed in'}</p>
            </div>
            <div className="p-1.5">
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-ink transition hover:bg-brand-50"
                role="menuitem"
              >
                <Settings className="h-4 w-4 text-ink-muted" />
                Account settings
              </Link>
              <form action={signOut}>
                <button
                  type="submit"
                  role="menuitem"
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
