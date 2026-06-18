import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { requireStaff } from '@/lib/management/guard';
import { chargeParty, logActivity } from '@/lib/management/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const emptyToNull = (v: unknown) => (typeof v === 'string' && v.trim() === '' ? null : v);

const patchSchema = z.object({
  // Profile edits (any subset).
  name: z.string().trim().min(1).max(160).optional(),
  name_bn: z.preprocess(emptyToNull, z.string().trim().max(160).nullable().optional()),
  passport_no: z.preprocess(emptyToNull, z.string().trim().max(40).nullable().optional()),
  passport_issue: z.preprocess(emptyToNull, z.string().trim().nullable().optional()),
  passport_expiry: z.preprocess(emptyToNull, z.string().trim().nullable().optional()),
  dob: z.preprocess(emptyToNull, z.string().trim().nullable().optional()),
  phone: z.preprocess(emptyToNull, z.string().trim().max(40).nullable().optional()),
  address: z.preprocess(emptyToNull, z.string().trim().max(400).nullable().optional()),
  photo_url: z.preprocess(emptyToNull, z.string().trim().url().nullable().optional()),
  note: z.preprocess(emptyToNull, z.string().trim().max(1000).nullable().optional()),
  // Status change.
  status: z.enum(['active', 'cancelled', 'completed']).optional(),
  // Package assignment.
  package_id: z.preprocess(emptyToNull, z.string().uuid().nullable().optional()),
});

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const guard = await requireStaff();
  if (!guard.ok) {
    return NextResponse.json(
      { ok: false, error: guard.status === 401 ? 'Not signed in.' : 'Staff access required.' },
      { status: guard.status },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check the details.' },
      { status: 400 },
    );
  }
  const d = parsed.data;

  try {
    const supabase = createAdminClient();

    const { data: existing, error: loadErr } = await supabase
      .from('umrah_passengers')
      .select('id, account_head_id, branch, package_id')
      .eq('id', params.id)
      .maybeSingle();

    if (loadErr || !existing) {
      return NextResponse.json({ ok: false, error: 'Passenger not found.' }, { status: 404 });
    }

    // Build the update payload from whichever editable fields were supplied.
    const update: Record<string, unknown> = {};
    for (const key of [
      'name', 'name_bn', 'passport_no', 'passport_issue', 'passport_expiry',
      'dob', 'phone', 'address', 'photo_url', 'note', 'status',
    ] as const) {
      if (d[key] !== undefined) update[key] = d[key];
    }

    const assigningPackage =
      d.package_id !== undefined && d.package_id !== null && d.package_id !== existing.package_id;

    if (d.package_id !== undefined) update.package_id = d.package_id;

    if (Object.keys(update).length > 0) {
      const { error: upErr } = await supabase
        .from('umrah_passengers')
        .update(update)
        .eq('id', params.id);
      if (upErr) {
        console.error('[admin/umrah/:id] update failed:', upErr.message);
        return NextResponse.json({ ok: false, error: 'Could not update the passenger.' }, { status: 500 });
      }
    }

    // Charge the package price exactly once. Guard against a double charge by
    // checking for an existing journal transaction tagged with this passenger.
    if (assigningPackage && existing.account_head_id && d.package_id) {
      try {
        const { data: pkg } = await supabase
          .from('mgmt_packages')
          .select('id, price, name')
          .eq('id', d.package_id)
          .maybeSingle();

        const { data: alreadyCharged } = await supabase
          .from('transactions')
          .select('id')
          .eq('ref_table', 'umrah_passengers')
          .eq('ref_id', params.id)
          .eq('type', 'journal')
          .limit(1);

        if (pkg && Number(pkg.price) > 0 && (!alreadyCharged || alreadyCharged.length === 0)) {
          await chargeParty({
            customer_head_id: existing.account_head_id,
            packageType: 'umrah',
            amount: Number(pkg.price),
            branch: existing.branch,
            narration: `Umrah package charge — ${pkg.name}`,
            ref_table: 'umrah_passengers',
            ref_id: params.id,
            created_by: guard.user.id,
          });
        }
      } catch (err) {
        console.error('[admin/umrah/:id] package charge failed:', err);
        return NextResponse.json(
          { ok: false, error: 'Package assigned but the charge could not be posted.' },
          { status: 500 },
        );
      }
    }

    await logActivity({
      user_id: guard.user.id,
      user_email: guard.user.email,
      action: assigningPackage
        ? 'umrah.passenger.assign'
        : d.status
        ? 'umrah.passenger.status'
        : 'umrah.passenger.update',
      entity: 'umrah_passengers',
      entity_id: params.id,
      detail: { ...update },
      branch: existing.branch,
    });

    return NextResponse.json({ ok: true, id: params.id });
  } catch (err) {
    console.error('[admin/umrah/:id] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}
