import type { Metadata } from 'next';
import { AuthShell } from '@/components/auth/AuthShell';
import { AuthForm } from '@/components/auth/AuthForm';

export const metadata: Metadata = {
  title: 'Create Account',
  description:
    'Create your Inter Gulf Travels account to plan and track your Hajj & Umrah journey with a trusted, government-licensed agency.',
  robots: { index: false, follow: false },
};

export default function SignUpPage() {
  return (
    <AuthShell
      eyebrow="Get started"
      title="Create your account"
      subtitle="Join thousands of pilgrims who travel with confidence and care."
      variant="customer"
    >
      <AuthForm mode="signup" />
    </AuthShell>
  );
}
