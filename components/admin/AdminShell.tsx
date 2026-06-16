'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Images,
  GalleryHorizontalEnd,
  Inbox,
  Calculator,
  ShieldCheck,
  Menu as MenuIcon,
  PanelsTopLeft,
  Settings,
  Users,
  ExternalLink,
  LogOut,
  X,
  type LucideIcon,
} from 'lucide-react';
import { LogoMark } from '@/components/brand/Logo';
import { cn } from '@/lib/utils';

type NavLink = { label: string; href: string; icon: LucideIcon };

const NAV: { group: string; items: NavLink[] }[] = [
  {
    group: 'Overview',
    items: [{ label: 'Dashboard', href: '/admin', icon: LayoutDashboard }],
  },
  {
    group: 'Content',
    items: [
      { label: 'Blog Posts', href: '/admin/posts', icon: FileText },
      { label: 'Media Library', href: '/admin/media', icon: Images },
      { label: 'Gallery', href: '/admin/gallery', icon: GalleryHorizontalEnd },
    ],
  },
  {
    group: 'Enquiries',
    items: [
      { label: 'Contact Requests', href: '/admin/contacts', icon: Inbox },
      { label: 'Estimate Requests', href: '/admin/estimates', icon: Calculator },
      { label: 'Document Vault', href: '/admin/vault', icon: ShieldCheck },
    ],
  },
  {
    group: 'Configuration',
    items: [
      { label: 'Navigation', href: '/admin/menus', icon: MenuIcon },
      { label: 'Footer', href: '/admin/footer', icon: PanelsTopLeft },
      { label: 'Site Settings', href: '/admin/settings', icon: Settings },
      { label: 'Users', href: '/admin/users', icon: Users },
    ],
  },
];

export function AdminShell({
  user,
  signOutAction,
  children,
}: {
  user: { email: string; name: string | null; avatarUrl: string | null };
  signOutAction: () => void;
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-sand-soft text-ink">
      {/* ---------- Desktop sidebar ---------- */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col bg-brand-900 text-white lg:flex">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* ---------- Mobile drawer ---------- */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[82%] flex-col bg-brand-900 text-white shadow-2xl">
            <button
              aria-label="Close navigation"
              onClick={() => setDrawerOpen(false)}
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent pathname={pathname} onNavigate={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      {/* ---------- Main column ---------- */}
      <div className="lg:pl-72">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/90 px-4 backdrop-blur sm:px-6">
          <button
            aria-label="Open navigation"
            onClick={() => setDrawerOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-border text-ink-muted transition hover:bg-muted lg:hidden"
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          <div className="hidden text-sm font-medium text-ink-muted sm:block">
            Administration console
          </div>

          <div className="ml-auto flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm font-medium text-ink-muted transition hover:border-brand-600/40 hover:text-brand-700"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="hidden sm:inline">View site</span>
            </Link>

            <div className="hidden items-center gap-2.5 border-l border-border pl-3 sm:flex">
              <Avatar name={user.name} email={user.email} avatarUrl={user.avatarUrl} />
              <div className="leading-tight">
                <p className="max-w-[12rem] truncate text-sm font-semibold text-ink">
                  {user.name || 'Administrator'}
                </p>
                <p className="max-w-[12rem] truncate text-xs text-ink-muted">{user.email}</p>
              </div>
            </div>

            <form action={signOutAction}>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-800"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </form>
          </div>
        </header>

        {/* Page content */}
        <main className="px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
        <LogoMark className="h-9 w-9" />
        <div className="leading-none">
          <p className="font-display text-lg font-semibold tracking-tight">Inter Gulf</p>
          <p className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-gold-300">
            Admin Panel
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {NAV.map((section) => (
          <div key={section.group}>
            <p className="px-3 pb-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/40">
              {section.group}
            </p>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const active = isActive(pathname, item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                        active
                          ? 'bg-white/10 text-white shadow-[inset_3px_0_0_0_theme(colors.gold.400)]'
                          : 'text-white/65 hover:bg-white/5 hover:text-white',
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-[18px] w-[18px] shrink-0 transition',
                          active ? 'text-gold-300' : 'text-white/55 group-hover:text-white',
                        )}
                      />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-5 py-4">
        <p className="text-[0.7rem] leading-relaxed text-white/40">
          Inter Gulf Travels Ltd · Hajj &amp; Umrah
          <br />
          Government Licensed — since 2002
        </p>
      </div>
    </>
  );
}

function Avatar({
  name,
  email,
  avatarUrl,
}: {
  name: string | null;
  email: string;
  avatarUrl: string | null;
}) {
  const initials = (name || email || 'A')
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('');

  if (avatarUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={avatarUrl}
        alt=""
        className="h-9 w-9 rounded-full object-cover ring-2 ring-brand-600/20"
      />
    );
  }

  return (
    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">
      {initials || 'A'}
    </span>
  );
}

function isActive(pathname: string, href: string) {
  if (href === '/admin') return pathname === '/admin';
  return pathname === href || pathname.startsWith(`${href}/`);
}
