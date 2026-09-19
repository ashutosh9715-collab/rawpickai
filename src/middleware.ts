import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * IndexNow key verification middleware.
 *
 * IndexNow requires hosting a verification file at /<key>.txt that returns the key
 * as plain text. To keep the key out of this public git repo, we serve it dynamically
 * from the INDEXNOW_KEY environment variable.
 *
 * SETUP:
 *   In Vercel → Project Settings → Environment Variables, add:
 *     Name:  INDEXNOW_KEY
 *     Value: <your 8-128 char alphanumeric key>
 *     Environments: Production, Preview, Development
 *   Redeploy. Then https://rawpickai.com/<your-key>.txt returns the key.
 *
 * This middleware does NOT interfere with:
 *   - Existing static files like /robots.txt, /llms.txt, /llms-full.txt
 *     (because those filenames don't match the random key)
 *   - Any other route in the app
 *     (because the matcher only fires on root-level .txt requests)
 */

export function middleware(req: NextRequest) {
  const indexnowKey = process.env.INDEXNOW_KEY;
  if (!indexnowKey) return NextResponse.next();

  const { pathname } = req.nextUrl;
  if (pathname !== `/${indexnowKey}.txt`) return NextResponse.next();

  return new NextResponse(indexnowKey, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

// Only run middleware on root-level .txt requests. Existing files in public/
// (robots.txt, llms.txt, llms-full.txt) are served by Next's static file
// handler before middleware runs, so they're untouched.
export const config = {
  matcher: '/:filename(.+\\.txt)',
};
