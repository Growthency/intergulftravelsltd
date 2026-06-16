import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

/**
 * - Custom staff login URL: rootdomain/<STAFF_LOGIN_SLUG> (default "taslima")
 *   is rewritten to the internal /portal login page. Change the slug in
 *   .env.local — the public URL changes, the page stays the same.
 * - Refreshes the Supabase auth session cookie on every request so Server
 *   Components always see a valid session.
 */
const STAFF_SLUG = process.env.NEXT_PUBLIC_STAFF_LOGIN_SLUG || 'taslima';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Custom staff/admin login slug → internal /portal
  if (pathname === `/${STAFF_SLUG}` || pathname === `/${STAFF_SLUG}/`) {
    const url = request.nextUrl.clone();
    url.pathname = '/portal';
    return NextResponse.rewrite(url);
  }

  // Refresh Supabase session
  let response = NextResponse.next({ request: { headers: request.headers } });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && key) {
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request: { headers: request.headers } });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    });
    await supabase.auth.getUser();
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.svg|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico)$).*)'],
};
