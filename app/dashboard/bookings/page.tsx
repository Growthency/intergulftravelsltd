import { CalendarCheck, Users, CalendarDays, MessageSquareText, Phone } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import { Card, StatusBadge, EmptyState } from '@/components/dashboard/ui';

export const dynamic = 'force-dynamic';

type EstimateRow = {
  id?: string | number;
  name: string | null;
  email: string | null;
  phone: string | null;
  service: string | null;
  package: string | null;
  travel_date: string | null;
  pax: number | null;
  message: string | null;
  status: string | null;
  created_at: string | null;
};

export default async function BookingsPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let requests: EstimateRow[] = [];

  if (user?.email) {
    try {
      const { data } = await supabase
        .from('estimate_requests')
        .select('id, name, email, phone, service, package, travel_date, pax, message, status, created_at')
        .eq('email', user.email)
        .order('created_at', { ascending: false });
      requests = (data as EstimateRow[]) ?? [];
    } catch {
      requests = [];
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-semibold text-ink">My Bookings &amp; Enquiries</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Every estimate and booking request you have made with {`Inter Gulf Travels`}, matched to your
          account email. Our advisors update the status as your journey is arranged.
        </p>
      </div>

      {requests.length === 0 ? (
        <EmptyState
          icon={CalendarCheck}
          title="No bookings yet"
          description="You haven't made any requests with this email address. Request a free estimate to begin planning your journey."
          action={{ label: 'Request an estimate', href: '/estimate' }}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {requests.map((r, i) => (
            <Card key={r.id ?? i} className="flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-display text-base font-semibold text-ink">
                    {r.service ?? 'Travel enquiry'}
                  </p>
                  {r.package && <p className="mt-0.5 text-sm text-ink-muted">{r.package}</p>}
                </div>
                <StatusBadge status={r.status} />
              </div>

              <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <Detail icon={Users} label="Travellers">
                  {r.pax ? `${r.pax} ${r.pax > 1 ? 'people' : 'person'}` : '—'}
                </Detail>
                <Detail icon={CalendarDays} label="Travel date">
                  {r.travel_date ? formatDate(r.travel_date) : 'Flexible'}
                </Detail>
                {r.phone && (
                  <Detail icon={Phone} label="Contact">
                    {r.phone}
                  </Detail>
                )}
                <Detail icon={CalendarCheck} label="Requested">
                  {r.created_at ? formatDate(r.created_at) : '—'}
                </Detail>
              </dl>

              {r.message && (
                <div className="mt-4 rounded-2xl bg-sand p-3.5">
                  <p className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
                    <MessageSquareText className="h-3.5 w-3.5" /> Your note
                  </p>
                  <p className="mt-1 line-clamp-4 text-sm text-ink/90">{r.message}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof Users;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
        <Icon className="h-3.5 w-3.5" /> {label}
      </dt>
      <dd className="mt-0.5 text-sm font-semibold text-ink">{children}</dd>
    </div>
  );
}
