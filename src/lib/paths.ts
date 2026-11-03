// src/lib/paths.ts

/**
 * Normalize a pathname to its clean form: a leading slash, no trailing slash,
 * and no `/index.html` or `.html` suffix. Root stays '/'.
 */
export function normalizePath(pathname: string): string {
  let p = (pathname || '').trim();
  if (!p.startsWith('/')) p = '/' + p;
  p = p.replace(/index\.html$/i, '').replace(/\.html$/i, '');
  if (p.length > 1) p = p.replace(/\/+$/, ''); // strip trailing slash(es), keep root '/'
  return p === '' ? '/' : p;
}
