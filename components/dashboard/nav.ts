import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  CalendarCheck,
  Bookmark,
  ShieldCheck,
  Settings,
} from 'lucide-react';

export type DashboardProfile = {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: string | null;
  created_at?: string | null;
};

export type DashboardUser = {
  id: string;
  email: string | null;
  createdAt: string | null;
};

export type NavLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Match the path exactly rather than as a prefix (used for the index route). */
  exact?: boolean;
};

export const dashboardNav: NavLink[] = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard, exact: true },
  { label: 'My Bookings', href: '/dashboard/bookings', icon: CalendarCheck },
  { label: 'Saved Articles', href: '/dashboard/saved', icon: Bookmark },
  { label: 'Document Vault', href: '/dashboard/vault', icon: ShieldCheck },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

/** Best-effort display name from profile / email. */
export function displayName(
  profile: { full_name?: string | null } | null,
  email?: string | null,
): string {
  const name = profile?.full_name?.trim();
  if (name) return name;
  if (email) return email.split('@')[0];
  return 'Pilgrim';
}

/** Two-letter initials for the avatar fallback. */
export function initials(name: string): string {
  const parts = name.replace(/[^\p{L}\p{N}\s]/gu, ' ').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'IG';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
