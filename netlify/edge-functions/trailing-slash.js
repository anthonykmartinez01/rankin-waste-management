// netlify/edge-functions/trailing-slash.js
//
// Strip trailing slashes from non-root URLs to align the served URL
// with the canonical form (Astro trailingSlash: 'never'). Resolves
// ROUTE-2 (P3) from post-migration-improvements.md; deployed 2026-05-04.
//
// Without this Edge Function, Netlify's directory-format default
// behavior is to 301-redirect /foo to /foo/ (auto-add trailing slash),
// which conflicts with our <link rel="canonical"> tags pointing to the
// no-slash form. The Edge Function runs at the CDN edge before
// Netlify's default redirect logic, so we can intercept and reverse it.
//
// Behavior matrix after this Edge Function ships:
//   /              → 200 (root unchanged)
//   /contact-us    → rewrite to /contact-us/index.html internally; 200
//   /contact-us/   → 301 to /contact-us
//   /sitemap.xml   → context.next() falls through to default; 200
//
// The rewrite for the no-slash case is what prevents Netlify from
// adding the trailing slash. context.rewrite() does an internal path
// rewrite that doesn't trigger Netlify's auto-redirect logic. The
// user's URL bar stays at the canonical no-slash form.

export default async (request, context) => {
  const url = new URL(request.url);

  // Root path: pass through, no redirect needed
  if (url.pathname === '/') {
    return context.next();
  }

  // Trailing slash on non-root path: 301 redirect to no-slash form
  if (url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
    return Response.redirect(url.toString(), 301);
  }

  // Skip rewrite for paths that look like static files (have a dot in
  // the last path segment — e.g., /sitemap.xml, /robots.txt, /favicon.svg,
  // /_astro/foo.css, /images/foo.webp, /fonts/lato-400.woff2). Let
  // Netlify serve these directly.
  const lastSegment = url.pathname.split('/').pop();
  if (lastSegment && lastSegment.includes('.')) {
    return context.next();
  }

  // No-slash path that's a "page route": rewrite internally to the
  // directory's index.html. This serves the page content without
  // Netlify's auto-add-slash 301.
  return context.rewrite(url.pathname + '/index.html');
};

export const config = {
  path: '/*',
};
