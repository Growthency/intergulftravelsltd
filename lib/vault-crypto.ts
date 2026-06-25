import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'node:crypto';

/**
 * AES-256-GCM encryption for the Secure Vault. Secrets are encrypted at rest
 * and only ever decrypted server-side for an authenticated administrator.
 *
 * The key is derived from VAULT_ENCRYPTION_KEY when set, otherwise from the
 * service-role key (already a server-only secret) so the vault works without
 * any extra configuration. Set VAULT_ENCRYPTION_KEY on every environment if you
 * want a dedicated, rotatable key.
 */
const SECRET =
  process.env.VAULT_ENCRYPTION_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || 'inter-gulf-local-dev-key';
const KEY = scryptSync(SECRET, 'inter-gulf-vault-salt-v1', 32);

/** Returns `iv:tag:ciphertext`, each base64. */
export function encryptSecret(plain: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', KEY, iv);
  const ct = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString('base64')}:${tag.toString('base64')}:${ct.toString('base64')}`;
}

export function decryptSecret(payload: string | null | undefined): string {
  if (!payload) return '';
  try {
    const [ivB64, tagB64, ctB64] = payload.split(':');
    if (!ivB64 || !tagB64 || !ctB64) return '';
    const decipher = createDecipheriv('aes-256-gcm', KEY, Buffer.from(ivB64, 'base64'));
    decipher.setAuthTag(Buffer.from(tagB64, 'base64'));
    const pt = Buffer.concat([decipher.update(Buffer.from(ctB64, 'base64')), decipher.final()]);
    return pt.toString('utf8');
  } catch {
    return '';
  }
}
