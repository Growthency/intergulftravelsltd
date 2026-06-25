/**
 * Admin allowlist. Emails listed here (or in ADMIN_EMAILS, comma separated)
 * get access to /dashboard/admin and the staff portal.
 *
 * The default login details we will create later should use one of these
 * emails so the account is treated as an administrator.
 */
const DEFAULT_ADMINS = ['hellointergulftravelsltd@gmail.com'];

export function getAdminEmails(): string[] {
  const fromEnv = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return Array.from(new Set([...DEFAULT_ADMINS.map((e) => e.toLowerCase()), ...fromEnv]));
}

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}
