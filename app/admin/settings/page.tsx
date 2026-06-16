import { createAdminClient } from '@/lib/supabase/server';
import { contact as defaultContact, social as defaultSocial } from '@/lib/site';
import { PageHeader } from '@/components/admin/ui';
import {
  SettingsForm,
  type ContactSettings,
  type SocialLink,
  type ThemeSettings,
} from '@/components/admin/SettingsForm';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Site Settings' };

const DEFAULT_CONTACT: ContactSettings = {
  phones: [...defaultContact.phones],
  emails: [...defaultContact.emails],
  whatsapp: defaultContact.whatsapp,
  whatsappDisplay: defaultContact.whatsappDisplay,
  address: {
    line1: defaultContact.address.line1,
    line2: defaultContact.address.line2,
    country: defaultContact.address.country,
  },
  hours: defaultContact.hours,
};

const DEFAULT_SOCIAL: SocialLink[] = defaultSocial.map((s) => ({ label: s.label, href: s.href }));

const DEFAULT_THEME: ThemeSettings = { primary: '#0e7c5a', accent: '#c9a24b' };

async function loadSettings() {
  let contact = DEFAULT_CONTACT;
  let social = DEFAULT_SOCIAL;
  let theme = DEFAULT_THEME;

  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from('site_settings')
      .select('key, value')
      .in('key', ['contact', 'social', 'theme']);

    (data ?? []).forEach((row: any) => {
      if (row.key === 'contact' && row.value) {
        contact = { ...DEFAULT_CONTACT, ...row.value, address: { ...DEFAULT_CONTACT.address, ...(row.value.address ?? {}) } };
      }
      if (row.key === 'social' && Array.isArray(row.value)) {
        social = row.value;
      }
      if (row.key === 'theme' && row.value) {
        theme = { ...DEFAULT_THEME, ...row.value };
      }
    });
  } catch (err) {
    console.error('[admin/settings] load failed:', err);
  }

  return { contact, social, theme };
}

export default async function SettingsPage() {
  const { contact, social, theme } = await loadSettings();

  return (
    <>
      <PageHeader
        title="Site Settings"
        description="Update the contact information, social links and theme colours used across the public site."
      />
      <SettingsForm contact={contact} social={social} theme={theme} />
    </>
  );
}
