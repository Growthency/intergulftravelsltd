import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/server';
import { requireStaff } from '@/lib/management/guard';
import { logActivity } from '@/lib/management/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Header menu builder payload. Each row references its parent by the row INDEX
 * within this same array (`parent_index`), or null for a top-level item. The
 * client guarantees parents appear before their children, but we resolve ids
 * after insert so ordering of the request is not relied upon.
 */
const itemSchema = z.object({
  label: z.string().trim().min(1).max(120),
  href: z.string().trim().min(1).max(300),
  parent_index: z.number().int().min(0).nullable().optional().default(null),
});

const bodySchema = z.object({
  items: z.array(itemSchema).max(200),
});

export async function POST(request: Request) {
  const guard = await requireStaff();
  if (!guard.ok) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: guard.status });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Each item needs a label and a link.' },
      { status: 400 },
    );
  }

  const items = parsed.data.items;

  // Sanity-check parent references and that a child is not itself a parent
  // (enforce the two-level limit at the API boundary too).
  for (let i = 0; i < items.length; i += 1) {
    const p = items[i].parent_index;
    if (p == null) continue;
    if (p < 0 || p >= items.length || p === i) {
      return NextResponse.json({ ok: false, error: 'Invalid menu nesting.' }, { status: 400 });
    }
    if (items[p].parent_index != null) {
      return NextResponse.json(
        { ok: false, error: 'Menus support two levels only.' },
        { status: 400 },
      );
    }
  }

  try {
    const supabase = createAdminClient();

    // Replace the whole header menu.
    const { error: delError } = await supabase
      .from('menu_items')
      .delete()
      .eq('location', 'header');
    if (delError) {
      console.error('[admin/menus] delete failed:', delError.message);
      return NextResponse.json({ ok: false, error: 'Could not update the menu.' }, { status: 500 });
    }

    if (items.length === 0) {
      await logActivity({
        user_id: guard.user.id,
        user_email: guard.user.email,
        action: 'menu.replace',
        entity: 'menu_items',
        detail: { count: 0 },
      });
      revalidateTag('header-menu');
      return NextResponse.json({ ok: true });
    }

    // Insert top-level items first so we can resolve their generated ids,
    // then insert children pointing at the right parent_id.
    const topIndexes: number[] = [];
    items.forEach((it, i) => {
      if (it.parent_index == null) topIndexes.push(i);
    });

    const topRows = topIndexes.map((i, order) => ({
      label: items[i].label,
      href: items[i].href,
      parent_id: null as string | null,
      sort_order: (order + 1) * 10,
      location: 'header',
    }));

    const { data: insertedTop, error: topError } = await supabase
      .from('menu_items')
      .insert(topRows)
      .select('id');
    if (topError || !insertedTop) {
      console.error('[admin/menus] top insert failed:', topError?.message);
      return NextResponse.json({ ok: false, error: 'Could not save the menu.' }, { status: 500 });
    }

    // Map each original top-level item index → its new uuid.
    const indexToId = new Map<number, string>();
    topIndexes.forEach((origIndex, k) => {
      const row = insertedTop[k] as { id: string } | undefined;
      if (row?.id) indexToId.set(origIndex, row.id);
    });

    // Build child rows, keeping per-parent ordering by source position.
    const childCounters = new Map<number, number>();
    const childRows = items
      .filter((it) => it.parent_index != null)
      .map((it) => {
        const parentIndex = it.parent_index as number;
        const order = (childCounters.get(parentIndex) ?? 0) + 1;
        childCounters.set(parentIndex, order);
        return {
          label: it.label,
          href: it.href,
          parent_id: indexToId.get(parentIndex) ?? null,
          sort_order: order * 10,
          location: 'header',
        };
      })
      .filter((row) => row.parent_id != null);

    if (childRows.length > 0) {
      const { error: childError } = await supabase.from('menu_items').insert(childRows);
      if (childError) {
        console.error('[admin/menus] child insert failed:', childError.message);
        return NextResponse.json({ ok: false, error: 'Could not save sub-items.' }, { status: 500 });
      }
    }

    await logActivity({
      user_id: guard.user.id,
      user_email: guard.user.email,
      action: 'menu.replace',
      entity: 'menu_items',
      detail: { top: topRows.length, children: childRows.length },
    });

    revalidateTag('header-menu');
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/menus] unexpected error:', err);
    return NextResponse.json({ ok: false, error: 'Unexpected error.' }, { status: 500 });
  }
}
