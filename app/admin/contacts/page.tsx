import { createAdminClient } from '@/lib/supabase/server';
import { PageHeader } from '@/components/admin/ui';
import { ContactsTable, type ContactRow } from '@/components/admin/ContactsTable';
import { getLocale } from '@/lib/i18n-server';
import { getDict } from '@/lib/dictionaries/areas/adminwebsite';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Contact Requests' };

async function loadContacts(): Promise<ContactRow[]> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('contact_requests')
      .select('id, name, email, phone, subject, message, handled, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[admin/contacts] load failed:', error.message);
      return [];
    }
    return (data ?? []) as ContactRow[];
  } catch (err) {
    console.error('[admin/contacts] unexpected error:', err);
    return [];
  }
}

export default async function ContactsPage() {
  const rows = await loadContacts();
  const t = getDict(getLocale());

  return (
    <>
      <PageHeader title={t.contacts.title} description={t.contacts.description} />
      <ContactsTable rows={rows} />
    </>
  );
}
