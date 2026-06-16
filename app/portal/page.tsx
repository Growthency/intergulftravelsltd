import type { Metadata } from 'next';
import { AuthShell } from '@/components/auth/AuthShell';
import { AuthForm } from '@/components/auth/AuthForm';

export const metadata: Metadata = {
  title: 'Staff Portal',
  description: 'Restricted staff and administrator access for Inter Gulf Travels Ltd.',
  robots: { index: false, follow: false, nocache: true },
};

export default function PortalPage() {
  return (
    <AuthShell
      eyebrow="Staff Portal"
      title="Staff Portal — Inter Gulf Travels"
      subtitle="Sign in with your authorised staff credentials to continue."
      variant="staff"
    >
      <AuthForm mode="signin" portal />
    </AuthShell>
  );
}
