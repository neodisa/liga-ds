/**
 * Basic Auth gate for the Vercel-hosted playground.
 *
 * Set BASIC_AUTH_USER and BASIC_AUTH_PASSWORD in the Vercel project
 * (Settings → Environment Variables → Production + Preview), then redeploy.
 *
 * Fail-open by design: if either variable is unset the site stays public
 * (same as before this gate existed), so a forgotten env var can never lock
 * everyone out. Protection switches on automatically once both vars exist.
 *
 * This is Vercel Routing Middleware — a framework-agnostic root `middleware.ts`
 * whose default export receives a `Request` and may return a `Response` to
 * short-circuit. Returning `undefined` lets the request continue to the static
 * asset. https://vercel.com/docs/routing-middleware
 */
export const config = {
  // Protect every path. Browsers resend Basic credentials for same-origin
  // subresources, so JS/CSS are covered once the user authenticates once.
  matcher: '/:path*',
};

export default function middleware(request: Request): Response | undefined {
  const user = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASSWORD;

  // Not configured → leave the site open.
  if (!user || !password) return undefined;

  const header = request.headers.get('authorization');
  if (header?.startsWith('Basic ')) {
    let decoded = '';
    try {
      decoded = atob(header.slice(6));
    } catch {
      decoded = '';
    }
    const sep = decoded.indexOf(':');
    if (sep !== -1) {
      const u = decoded.slice(0, sep);
      const p = decoded.slice(sep + 1);
      if (u === user && p === password) return undefined; // authorized → continue
    }
  }

  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Liga DS Playground", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
