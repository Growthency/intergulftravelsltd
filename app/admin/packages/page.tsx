import { PageHeader } from '@/components/manage/ui';
import { SitePackagesEditor } from '@/components/admin/SitePackagesEditor';
import { loadSitePackagesDoc } from '@/lib/site-packages';
import { getLocale } from '@/lib/i18n-server';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Packages' };

export default async function SitePackagesPage() {
  const locale = getLocale();
  const doc = await loadSitePackagesDoc();
  const t =
    locale === 'bn'
      ? {
          title: 'ওয়েবসাইট প্যাকেজ',
          sub: 'ওয়েবসাইটে দেখানো হজ ও উমরাহ প্যাকেজ কার্ডগুলো এখানে সম্পাদনা করুন — নাম, মূল্য ও সুবিধা পরিবর্তন করুন বা নতুন যোগ করুন।',
        }
      : {
          title: 'Website Packages',
          sub: 'Edit the Hajj & Umrah package cards shown on the public website — change the name, price and features, or add new ones.',
        };

  return (
    <>
      <PageHeader title={t.title} subtitle={t.sub} />
      <SitePackagesEditor initial={doc} />
    </>
  );
}
