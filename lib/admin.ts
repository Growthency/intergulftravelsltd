/**
 * Admin allowlist. Emails listed here (or in ADMIN_EMAILS, comma separated)
 * are treated as administrators and can sign in to the console at /admin.
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
