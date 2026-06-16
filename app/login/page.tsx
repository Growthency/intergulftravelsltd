import type { Metadata } from 'next';
import { AuthShell } from '@/components/auth/AuthShell';
import { AuthForm } from '@/components/auth/AuthForm';

export const metadata: Metadata = {
  title: 'Sign In',
  description:
    'Sign in to your Inter Gulf Travels account to manage your Hajj & Umrah bookings, documents and departures.',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Sign in to your account"
      subtitle="Access your bookings, documents and departures in one place."
      variant="customer"
    >
      <AuthForm mode="signin" />
    </AuthShell>
  );
}
